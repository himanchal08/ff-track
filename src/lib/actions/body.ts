'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { today } from '@/lib/utils/dates';

export type BodyProgressLog = {
  id: string;
  date: string;
  weight_kg: number | null;
  waist_cm: number | null;
  chest_cm: number | null;
  front_photo_url: string | null;
  side_photo_url: string | null;
};

export async function logBodyProgress(
  dateStr: string,
  weightKg: number | null,
  waistCm: number | null,
  chestCm: number | null,
  frontPhotoUrl: string | null = null,
  sidePhotoUrl: string | null = null
) {
  const supabase = await createClient() as any;
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) throw new Error('Not authenticated');

  const { error } = await supabase
    .from('body_progress')
    .upsert({
      user_id: userData.user.id,
      date: dateStr,
      weight_kg: weightKg,
      waist_cm: waistCm,
      chest_cm: chestCm,
      front_photo_url: frontPhotoUrl,
      side_photo_url: sidePhotoUrl,
    }, { onConflict: 'user_id, date' });

  if (error) throw error;
  
  revalidatePath('/progress');
  revalidatePath('/');
}

// Fetch history
export async function getBodyProgressHistory(limit: number = 30): Promise<BodyProgressLog[]> {
  const supabase = await createClient() as any;
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return [];

  const { data, error } = await supabase
    .from('body_progress')
    .select('id, date, weight_kg, waist_cm, chest_cm, front_photo_url, side_photo_url')
    .eq('user_id', userData.user.id)
    .order('date', { ascending: false })
    .limit(limit);

  if (error || !data) return [];
  return data;
}

export async function getTodayBodyProgress() {
  const supabase = await createClient() as any;
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return null;

  const { data, error } = await supabase
    .from('body_progress')
    .select('*')
    .eq('user_id', userData.user.id)
    .eq('date', today())
    .single();

  if (error || !data) return null;
  return data as BodyProgressLog;
}
