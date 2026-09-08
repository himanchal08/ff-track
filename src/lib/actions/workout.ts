'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { today } from '@/lib/utils/dates';
import { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/lib/supabase/types';

export type WorkoutPlan = {
  id: string;
  day_label: string;
  exercises: string[];
};

export type WorkoutLog = {
  id: string;
  exercise: string;
  sets: number[]; // array of reps e.g. [12, 10, 8]
  weight_used_kg: number | null;
};

// 1. Fetch predefined plans (create defaults if none exist)
export async function getWorkoutPlans(): Promise<WorkoutPlan[]> {
  const supabase = await createClient() as any;
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return [];

  const { data, error } = await supabase
    .from('workout_plans')
    .select('id, day_label, exercises')
    .eq('user_id', userData.user.id)
    .order('sort_order');

  if (error) return [];

  // Seed defaults if empty
  if (data.length === 0) {
    const defaultPlans = [
      { user_id: userData.user.id, day_label: 'Push Day', exercises: ['Bench Press', 'Overhead Press', 'Triceps Pushdown'], sort_order: 1 },
      { user_id: userData.user.id, day_label: 'Pull Day', exercises: ['Pull-ups', 'Barbell Row', 'Biceps Curl'], sort_order: 2 },
      { user_id: userData.user.id, day_label: 'Leg Day',  exercises: ['Squat', 'Leg Press', 'Calf Raises'], sort_order: 3 },
    ];
    await supabase.from('workout_plans').insert(defaultPlans);
    
    const { data: newData } = await supabase
      .from('workout_plans')
      .select('id, day_label, exercises')
      .eq('user_id', userData.user.id)
      .order('sort_order');
      
    return (newData as WorkoutPlan[]) || [];
  }

  return data as WorkoutPlan[];
}

// 2. Fetch logs for a specific day and plan
export async function getWorkoutLogs(dateStr: string, planId: string): Promise<WorkoutLog[]> {
  const supabase = await createClient() as any;
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return [];

  const { data, error } = await supabase
    .from('workout_logs')
    .select('id, exercise, sets, weight_used_kg')
    .eq('user_id', userData.user.id)
    .eq('date', dateStr)
    .eq('workout_plan_id', planId)
    .order('created_at');

  if (error || !data) return [];
  return data as WorkoutLog[];
}

// 3. Log an exercise (and auto-update PRs)
export async function logExercise(
  dateStr: string,
  planId: string,
  exercise: string,
  sets: number[], // array of reps
  weightKg: number | null
) {
  const supabase = await createClient() as any;
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) throw new Error('Not authenticated');

  // Insert log
  const { error: insertError } = await supabase
    .from('workout_logs')
    .insert({
      user_id: userData.user.id,
      date: dateStr,
      workout_plan_id: planId,
      exercise: exercise,
      sets: sets,
      weight_used_kg: weightKg,
    });

  if (insertError) throw insertError;

  // PR Detection
  const maxReps = sets.length > 0 ? Math.max(...sets) : 0;
  
  const { data: existingPr } = await supabase
    .from('personal_records')
    .select('best_reps, best_weight_kg')
    .eq('user_id', userData.user.id)
    .eq('exercise', exercise)
    .single();

  let isNewPr = false;

  if (!existingPr) {
    isNewPr = true;
  } else {
    // A PR is either: heavier weight, OR same weight but more reps
    const oldWeight = Number(existingPr.best_weight_kg) || 0;
    const newWeight = weightKg || 0;
    const oldReps = existingPr.best_reps || 0;

    if (newWeight > oldWeight) {
      isNewPr = true;
    } else if (newWeight === oldWeight && maxReps > oldReps) {
      isNewPr = true;
    }
  }

  if (isNewPr) {
    await supabase.from('personal_records').upsert({
      user_id: userData.user.id,
      exercise: exercise,
      best_reps: maxReps,
      best_weight_kg: weightKg,
      achieved_at: dateStr,
    }, { onConflict: 'user_id, exercise' });
  }

  revalidatePath('/workout');
  revalidatePath('/');
  
  return { isNewPr };
}

// 4. Delete an exercise log
export async function deleteExerciseLog(logId: string) {
  const supabase = await createClient() as any;
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return;

  await supabase
    .from('workout_logs')
    .delete()
    .eq('id', logId)
    .eq('user_id', userData.user.id);

  revalidatePath('/workout');
}

// 5. Get today's plan name for home page
export async function getTodayWorkoutSummary() {
  const supabase = await createClient() as any;
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return null;

  const { data, error } = await supabase
    .from('workout_logs')
    .select('workout_plan_id, workout_plans(day_label)')
    .eq('user_id', userData.user.id)
    .eq('date', today())
    .limit(1);

  if (error || !data || data.length === 0) return null;

  const { count } = await supabase
    .from('workout_logs')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userData.user.id)
    .eq('date', today());

  return {
    // @ts-ignore
    day_label: data[0].workout_plans?.day_label || 'Workout',
    exercise_count: count || 0,
  };
}
