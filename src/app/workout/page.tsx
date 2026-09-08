import { Shell } from '@/components/layout/Shell';
import { getWorkoutPlans, getWorkoutLogs } from '@/lib/actions/workout';
import { WorkoutLogger } from '@/components/workout/WorkoutLogger';
import { today } from '@/lib/utils/dates';

export default async function WorkoutPage() {
  const dateStr = today();
  
  // Need to fetch plans and today's logs for any plan
  const plans = await getWorkoutPlans();
  
  // Note: For simplicity, we'll fetch logs across all plans for today, 
  // or just fetch logs for the currently selected plan inside the client. 
  // Wait, `getWorkoutLogs` requires a `planId`. Let's fetch all logs for today instead of by planId.
  // I will adjust the server action logic or fetch directly here.
  // Actually, let's just fetch all workout_logs for today directly here, 
  // because the PRD says "see the planned exercise list" and log them.
  
  // We'll import `createClient` and do it here since it's a Server Component
  const { createClient } = await import('@/lib/supabase/server');
  const supabase = await createClient() as any;
  const { data: userData } = await supabase.auth.getUser();
  
  let todayLogs: { id: string, exercise: string, sets: number[], weight_used_kg: number, workout_plan_id: string }[] = [];
  if (userData.user) {
    const { data } = await (supabase as any)
      .from('workout_logs')
      .select('id, exercise, sets, weight_used_kg, workout_plan_id')
      .eq('user_id', userData.user.id)
      .eq('date', dateStr)
      .order('created_at');
    todayLogs = data || [];
  }

  return (
    <Shell title="Workout">
      <div style={{ paddingTop: '20px' }}>
        <WorkoutLogger plans={plans} todayLogs={todayLogs} dateStr={dateStr} />
      </div>
    </Shell>
  );
}
