import { Shell } from '@/components/layout/Shell';
import { getWeightTrend } from '@/lib/actions/weight';
import { WeightChart } from '@/components/weight/WeightChart';
import { RunningTrendChart } from '@/components/dashboard/RunningTrendChart';
import { createClient } from '@/lib/supabase/server';
import { Activity, Dumbbell, Wind, Scale } from 'lucide-react';

export default async function ProgressDashboardPage() {
  const weightData = await getWeightTrend(30);
  
  const supabase = await createClient() as any;
  const { data: userData } = await supabase.auth.getUser();
  
  let runData = [];
  let workoutCount = 0;
  
  if (userData.user) {
    // Last 30 days calculation
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const dateStr = thirtyDaysAgo.toISOString().split('T')[0];

    // Fetch Runs
    const { data: runs } = await supabase
      .from('running_logs')
      .select('id, date, distance_km, time_seconds, continuous_run_seconds')
      .eq('user_id', userData.user.id)
      .gte('date', dateStr)
      .order('date', { ascending: true });
    
    runData = runs || [];

    // Fetch Workouts (distinct days worked out)
    const { data: workouts } = await supabase
      .from('workout_logs')
      .select('date')
      .eq('user_id', userData.user.id)
      .gte('date', dateStr);
      
    if (workouts) {
      const uniqueDays = new Set(workouts.map((w: any) => w.date));
      workoutCount = uniqueDays.size;
    }
  }

  return (
    <Shell title="Progress Dash">
      <div style={{ paddingTop: '20px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* Summary Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div className="glass-card accent-indigo" style={{ padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Scale size={14} color="#818cf8" />
              <span style={{ fontSize: '11px', color: '#a1a1aa', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Weight Change</span>
            </div>
            <div style={{ fontSize: '20px', fontWeight: 700, color: '#ededed' }}>
              {weightData.length >= 2 
                ? `${(weightData[weightData.length - 1].weight_kg - weightData[0].weight_kg).toFixed(1)} kg`
                : '--'}
            </div>
          </div>

          <div className="glass-card accent-violet" style={{ padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Dumbbell size={14} color="#a78bfa" />
              <span style={{ fontSize: '11px', color: '#a1a1aa', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Workouts (30d)</span>
            </div>
            <div style={{ fontSize: '20px', fontWeight: 700, color: '#ededed' }}>
              {workoutCount} <span style={{ fontSize: '12px', color: '#71717a', fontWeight: 500 }}>days</span>
            </div>
          </div>
        </div>

        {/* Weight Trend */}
        <div className="glass-card" style={{ padding: '20px' }}>
          <h2 style={{ fontSize: '15px', fontWeight: 600, color: '#ededed', margin: '0 0 8px' }}>Weight (Last 30 Days)</h2>
          <WeightChart data={weightData} />
        </div>

        {/* Running Trend */}
        <div className="glass-card" style={{ padding: '20px' }}>
          <h2 style={{ fontSize: '15px', fontWeight: 600, color: '#ededed', margin: '0 0 8px' }}>Running Distance (Last 30 Days)</h2>
          <RunningTrendChart logs={runData} />
        </div>

      </div>
    </Shell>
  );
}
