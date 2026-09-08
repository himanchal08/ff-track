/**
 * Supabase Database Types
 *
 * These are placeholder types for Phase 0.
 * After setting up your Supabase project and running migrations,
 * regenerate with:
 *   npx supabase gen types typescript --project-id YOUR_PROJECT_ID > src/lib/supabase/types.ts
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      weight_logs: {
        Row: {
          id: string;
          user_id: string;
          date: string;
          weight_kg: number;
          notes: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          date: string;
          weight_kg: number;
          notes?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          date?: string;
          weight_kg?: number;
          notes?: string | null;
        };
      };
      workout_plans: {
        Row: {
          id: string;
          user_id: string;
          day_label: string;
          exercises: Json;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          day_label: string;
          exercises: Json;
          sort_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          day_label?: string;
          exercises?: Json;
          sort_order?: number;
        };
      };
      workout_logs: {
        Row: {
          id: string;
          user_id: string;
          date: string;
          workout_plan_id: string;
          exercise: string;
          sets: Json; // e.g. [12, 10, 9]
          weight_used_kg: number | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          date: string;
          workout_plan_id: string;
          exercise: string;
          sets: Json;
          weight_used_kg?: number | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          date?: string;
          workout_plan_id?: string;
          exercise?: string;
          sets?: Json;
          weight_used_kg?: number | null;
        };
      };
      personal_records: {
        Row: {
          id: string;
          user_id: string;
          exercise: string;
          best_reps: number | null;
          best_weight_kg: number | null;
          achieved_at: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          exercise: string;
          best_reps?: number | null;
          best_weight_kg?: number | null;
          achieved_at: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          exercise?: string;
          best_reps?: number | null;
          best_weight_kg?: number | null;
          achieved_at?: string;
        };
      };
      running_logs: {
        Row: {
          id: string;
          user_id: string;
          date: string;
          distance_km: number;
          time_seconds: number;
          continuous_run_seconds: number | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          date: string;
          distance_km: number;
          time_seconds: number;
          continuous_run_seconds?: number | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          date?: string;
          distance_km?: number;
          time_seconds?: number;
          continuous_run_seconds?: number | null;
        };
      };
      body_progress: {
        Row: {
          id: string;
          user_id: string;
          date: string;
          weight_kg: number | null;
          waist_cm: number | null;
          chest_cm: number | null;
          front_photo_url: string | null;
          side_photo_url: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          date: string;
          weight_kg?: number | null;
          waist_cm?: number | null;
          chest_cm?: number | null;
          front_photo_url?: string | null;
          side_photo_url?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          date?: string;
          weight_kg?: number | null;
          waist_cm?: number | null;
          chest_cm?: number | null;
          front_photo_url?: string | null;
          side_photo_url?: string | null;
        };
      };
      meal_constants: {
        Row: {
          id: string;
          item_name: string;
          requires_overnight_soak: boolean;
        };
        Insert: {
          id?: string;
          item_name: string;
          requires_overnight_soak?: boolean;
        };
        Update: {
          id?: string;
          item_name?: string;
          requires_overnight_soak?: boolean;
        };
      };
      meal_rotation: {
        Row: {
          id: string;
          weekday: number; // 0=Sun ... 6=Sat
          ingredient: string;
          requires_overnight_soak: boolean;
        };
        Insert: {
          id?: string;
          weekday: number;
          ingredient: string;
          requires_overnight_soak?: boolean;
        };
        Update: {
          id?: string;
          weekday?: number;
          ingredient?: string;
          requires_overnight_soak?: boolean;
        };
      };
      meal_choices: {
        Row: {
          id: string;
          meal_type: "breakfast" | "snack" | "dinner";
          option_label: string;
          ingredients: Json; // Array<{ name: string; requires_overnight_soak: boolean }>
        };
        Insert: {
          id?: string;
          meal_type: "breakfast" | "snack" | "dinner";
          option_label: string;
          ingredients: Json;
        };
        Update: {
          id?: string;
          meal_type?: "breakfast" | "snack" | "dinner";
          option_label?: string;
          ingredients?: Json;
        };
      };
      daily_meal_selection: {
        Row: {
          id: string;
          user_id: string;
          date: string;
          meal_type: "breakfast" | "snack" | "dinner";
          chosen_option_id: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          date: string;
          meal_type: "breakfast" | "snack" | "dinner";
          chosen_option_id: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          date?: string;
          meal_type?: "breakfast" | "snack" | "dinner";
          chosen_option_id?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}
