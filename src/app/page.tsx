import { Shell } from '@/components/layout/Shell';
import { WeightCard } from '@/components/home/WeightCard';
import { WorkoutCard } from '@/components/home/WorkoutCard';
import { RunCard } from '@/components/home/RunCard';
import { ProgressCard } from '@/components/home/ProgressCard';
import { MealsPreview } from '@/components/home/MealsPreview';
import { today } from '@/lib/utils/dates';

/**
 * Home page — Phase 0 shell with placeholder cards.
 * In future phases, cards will fetch real data from Supabase.
 */
export default function HomePage() {
  const dateStr = today();
  const dayName = new Date().toLocaleDateString('en-IN', { weekday: 'long' });
  const dateLabel = new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
  });

  return (
    <Shell subtitle={`${dayName}, ${dateLabel}`}>
      {/* Greeting */}
      <div style={{ paddingTop: '20px', paddingBottom: '16px' }}>
        <h2
          style={{
            fontSize: '22px',
            fontWeight: 700,
            color: 'var(--fg-primary)',
            margin: 0,
          }}
        >
          Good {getTimeOfDay()} 👋
        </h2>
        <p style={{ fontSize: '14px', color: 'var(--fg-muted)', marginTop: '4px' }}>
          Here&apos;s your overview for today
        </p>
      </div>

      {/* Cards */}
      <WeightCard />
      <WorkoutCard />
      <RunCard />
      <ProgressCard />
      <MealsPreview />
    </Shell>
  );
}

function getTimeOfDay(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'morning';
  if (hour < 17) return 'afternoon';
  return 'evening';
}
