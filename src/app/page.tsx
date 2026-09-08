import { Shell } from '@/components/layout/Shell';
import { WeightCard } from '@/components/home/WeightCard';
import { WorkoutCard } from '@/components/home/WorkoutCard';
import { RunCard } from '@/components/home/RunCard';
import { ProgressCard } from '@/components/home/ProgressCard';
import { MealsPreview } from '@/components/home/MealsPreview';
import { today } from '@/lib/utils/dates';

export default function HomePage() {
  const dayName  = new Date().toLocaleDateString('en-IN', { weekday: 'long' });
  const dateLabel = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });

  return (
    <Shell subtitle={`${dayName}, ${dateLabel}`}>
      {/* Greeting */}
      <div style={{ padding: '20px 0 14px' }}>
        <h2 style={{
          fontSize: '20px', fontWeight: 800, margin: '0 0 3px',
          color: 'var(--fg-primary)', letterSpacing: '-0.02em',
        }}>
          Good {getTimeOfDay()} 👋
        </h2>
        <p style={{ fontSize: '13px', color: 'var(--fg-muted)', margin: 0 }}>
          Here&apos;s your overview for today
        </p>
      </div>

      <WeightCard />
      <WorkoutCard />
      <RunCard />
      <ProgressCard />
      <MealsPreview />
    </Shell>
  );
}

function getTimeOfDay(): string {
  const h = new Date().getHours();
  if (h < 12) return 'morning';
  if (h < 17) return 'afternoon';
  return 'evening';
}
