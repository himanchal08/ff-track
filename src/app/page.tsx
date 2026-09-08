import { Shell } from '@/components/layout/Shell';
import { WeightCard } from '@/components/home/WeightCard';
import { WorkoutCard } from '@/components/home/WorkoutCard';
import { RunCard } from '@/components/home/RunCard';
import { ProgressCard } from '@/components/home/ProgressCard';
import { MealsPreview } from '@/components/home/MealsPreview';
import { today } from '@/lib/utils/dates';
import { getWeightTrend } from '@/lib/actions/weight';
import { getTodayWorkoutSummary } from '@/lib/actions/workout';
import { getTodayRunSummary } from '@/lib/actions/run';
import { getTodayLunch, getTomorrowLunch } from '@/lib/actions/meals';

export default async function HomePage() {
  const dayName  = new Date().toLocaleDateString('en-IN', { weekday: 'long' });
  const dateLabel = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });

  // Fetch data for cards
  const weightTrend = await getWeightTrend(7);
  const todayWeight = weightTrend.length > 0 && weightTrend[weightTrend.length - 1].date === new Date().toLocaleDateString('en-CA') 
    ? weightTrend[weightTrend.length - 1].weight_kg 
    : null;
  const sevenDayAvg = weightTrend.length > 0 ? weightTrend[weightTrend.length - 1].avg_7d : null;
  
  let trend: 'up' | 'down' | 'flat' | null = null;
  if (weightTrend.length >= 2) {
    const prev = weightTrend[weightTrend.length - 2].weight_kg;
    const curr = weightTrend[weightTrend.length - 1].weight_kg;
    if (curr < prev) trend = 'down';
    else if (curr > prev) trend = 'up';
    else trend = 'flat';
  }

  const workoutSummary = await getTodayWorkoutSummary();
  const runSummary = await getTodayRunSummary();
  
  const todayLunch = await getTodayLunch();
  const tomorrowLunch = await getTomorrowLunch();
  const soakCount = tomorrowLunch?.requires_overnight_soak ? 1 : 0;

  return (
    <Shell subtitle={`${dayName}, ${dateLabel}`}>
      {/* Greeting */}
      <div style={{ padding: '20px 0 14px' }}>
        <h2 style={{
          fontSize: '20px', fontWeight: 800, margin: '0 0 3px',
          color: 'var(--foreground)', letterSpacing: '-0.02em',
        }}>
          Good {getTimeOfDay()} 👋
        </h2>
        <p style={{ fontSize: '13px', color: '#71717a', margin: 0 }}>
          Here&apos;s your overview for today
        </p>
      </div>

      <WeightCard todayWeight={todayWeight} sevenDayAvg={sevenDayAvg} trend={trend} />
      <WorkoutCard 
        todayPlan={workoutSummary?.day_label} 
        exerciseCount={workoutSummary?.exercise_count} 
        completed={workoutSummary ? workoutSummary.exercise_count > 0 : false} 
      />
      <RunCard 
        distanceKm={runSummary?.distance_km}
        paceMinPerKm={runSummary?.pace}
      />
      <ProgressCard />
      <MealsPreview 
        lunchRotation={todayLunch?.ingredient}
        soakCount={soakCount}
      />
    </Shell>
  );
}

function getTimeOfDay(): string {
  const h = new Date().getHours();
  if (h < 12) return 'morning';
  if (h < 17) return 'afternoon';
  return 'evening';
}
