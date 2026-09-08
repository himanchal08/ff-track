'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { today, startOfWeek } from '@/lib/utils/dates';
import { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/lib/supabase/types';

export type RunLog = {
  id: string;
  date: string;
  distance_km: number;
  time_seconds: number;
  continuous_run_seconds: number | null;
};

export async function logRun(
  dateStr: string,
  distanceKm: number,
  timeSeconds: number,
  continuousSeconds: number | null
) {
  const supabase = await createClient() as any;
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) throw new Error('Not authenticated');

  const { error } = await supabase
    .from('running_logs')
    .upsert({
      user_id: userData.user.id,
      date: dateStr,
      distance_km: distanceKm,
      time_seconds: timeSeconds,
      continuous_run_seconds: continuousSeconds,
    }, { onConflict: 'user_id, date' });

  if (error) throw error;
  
  revalidatePath('/run');
  revalidatePath('/');
}

// Fetch logs for the current week to show weekly progression
export async function getWeeklyRunLogs(currentDateStr: string = today()) {
  const supabase = await createClient() as any;
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return [];

  const weekStart = startOfWeek(currentDateStr); // e.g. Monday's date

  const { data, error } = await supabase
    .from('running_logs')
    .select('id, date, distance_km, time_seconds, continuous_run_seconds')
    .eq('user_id', userData.user.id)
    .gte('date', weekStart)
    .order('date', { ascending: true });

  if (error || !data) return [];
  return data as RunLog[];
}

export async function getTodayRunSummary() {
  const supabase = await createClient() as any;
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return null;

  const { data, error } = await supabase
    .from('running_logs')
    .select('distance_km, time_seconds')
    .eq('user_id', userData.user.id)
    .eq('date', today())
    .single();

  if (error || !data) return null;

  const paceSecondsPerKm = data.time_seconds / data.distance_km;
  const paceMins = Math.floor(paceSecondsPerKm / 60);
  const paceSecs = Math.floor(paceSecondsPerKm % 60);
  const paceFormatted = `${paceMins}:${String(paceSecs).padStart(2, '0')}`;

  return {
    distance_km: Number(data.distance_km),
    pace: paceFormatted,
  };
}
