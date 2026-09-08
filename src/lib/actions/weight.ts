'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { today } from '@/lib/utils/dates';
import { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/lib/supabase/types';

export async function logWeight(weightKg: number, dateStr: string = today()) {
  const supabase = await createClient() as SupabaseClient<Database>;
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData.user) throw new Error('Not authenticated');

  const { error } = await supabase
    .from('weight_logs')
    .upsert({
      user_id: userData.user.id,
      date: dateStr,
      weight_kg: weightKg,
    }, { onConflict: 'user_id, date' });

  if (error) throw error;
  
  revalidatePath('/weight');
  revalidatePath('/');
}

export async function getWeightTrend(days: number = 30) {
  const supabase = await createClient() as SupabaseClient<Database>;
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return [];

  // Get N days of history, ordered by date descending so we can calculate rolling average
  const { data, error } = await supabase
    .from('weight_logs')
    .select('date, weight_kg')
    .eq('user_id', userData.user.id)
    .order('date', { ascending: false })
    .limit(days + 7); // fetch extra for the 7-day average of the oldest visible items

  if (error || !data) return [];

  // We want to return data chronological for charting (ascending)
  // And we want to attach a 7-day rolling average to each point.
  const chronological = [...data].reverse();
  
  const result = chronological.map((log, index) => {
    // For 7-day average, we look at this point and up to 6 previous points
    let sum = 0;
    let count = 0;
    
    for (let i = Math.max(0, index - 6); i <= index; i++) {
      sum += Number(chronological[i].weight_kg);
      count++;
    }
    
    return {
      date: log.date,
      weight_kg: Number(log.weight_kg),
      avg_7d: count > 0 ? Number((sum / count).toFixed(1)) : null,
    };
  });

  // Now just return the most recent `days` days
  return result.slice(-days);
}

export async function getTodayWeight() {
  const supabase = await createClient() as SupabaseClient<Database>;
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return null;

  const { data, error } = await supabase
    .from('weight_logs')
    .select('weight_kg')
    .eq('user_id', userData.user.id)
    .eq('date', today())
    .single();

  if (error || !data) return null;
  return Number(data.weight_kg);
}
