'use server';

import { createClient } from '@/lib/supabase/server';

export type MealOption = {
  id: string;
  meal_type: 'breakfast' | 'snack' | 'dinner';
  option_label: string;
  ingredients: Array<{ name: string; requires_overnight_soak: boolean }>;
};

export type LunchRotation = {
  id: string;
  weekday: number;
  ingredient: string;
  requires_overnight_soak: boolean;
};

export async function getTodayLunch(): Promise<LunchRotation | null> {
  const supabase = await createClient() as any;
  const today = new Date();
  const weekday = today.getDay(); // 0 = Sunday, 1 = Monday, etc.

  const { data, error } = await supabase
    .from('meal_rotation')
    .select('*')
    .eq('weekday', weekday)
    .single();

  if (error || !data) return null;
  return data;
}

export async function getTomorrowLunch(): Promise<LunchRotation | null> {
  const supabase = await createClient() as any;
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const weekday = tomorrow.getDay();

  const { data, error } = await supabase
    .from('meal_rotation')
    .select('*')
    .eq('weekday', weekday)
    .single();

  if (error || !data) return null;
  return data;
}

export async function getMealOptions(): Promise<Record<string, MealOption[]>> {
  const supabase = await createClient() as any;
  const { data, error } = await supabase
    .from('meal_choices')
    .select('*');

  if (error || !data) return { breakfast: [], snack: [], dinner: [] };

  const options = data as MealOption[];
  
  return {
    breakfast: options.filter(o => o.meal_type === 'breakfast'),
    snack: options.filter(o => o.meal_type === 'snack'),
    dinner: options.filter(o => o.meal_type === 'dinner'),
  };
}
