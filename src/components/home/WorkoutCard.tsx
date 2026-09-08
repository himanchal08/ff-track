import { Dumbbell } from 'lucide-react';
import { EmptyRow } from './WeightCard';

interface WorkoutCardProps {
  todayPlan?: string | null;
  exerciseCount?: number | null;
  completed?: boolean;
}

export function WorkoutCard({ todayPlan, exerciseCount, completed }: WorkoutCardProps) {
  const isEmpty = !todayPlan;

  return (
    <div className="glass-card animate-fade-slide-up animate-stagger-2" style={{ padding: '18px', marginBottom: '10px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
        <div className="icon-pill" style={{ width: 34, height: 34, background: 'var(--accent-violet-dim)', border: '1px solid rgba(167,139,250,0.2)' }}>
          <Dumbbell size={16} color="var(--accent-violet)" strokeWidth={1.5} />
        </div>
        <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--fg-secondary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Workout
        </span>
        {completed && (
          <span style={{
            marginLeft: 'auto', fontSize: '11px', fontWeight: 600,
            color: 'var(--accent-emerald)', background: 'var(--accent-emerald-dim)',
            padding: '2px 8px', borderRadius: '6px', border: '1px solid rgba(52,211,153,0.2)',
          }}>
            Done ✓
          </span>
        )}
      </div>

      {isEmpty ? (
        <EmptyRow
          label="No workout logged today" action="Start workout" href="/workout"
          id="workout-card-start-btn"
          color="var(--accent-violet)" dimColor="var(--accent-violet-dim)" borderColor="rgba(167,139,250,0.2)"
        />
      ) : (
        <div>
          <p style={{ fontSize: '20px', fontWeight: 700, color: 'var(--fg-primary)', margin: 0, letterSpacing: '-0.01em' }}>{todayPlan}</p>
          {exerciseCount && (
            <p style={{ fontSize: '12px', color: 'var(--fg-muted)', marginTop: '4px', margin: '4px 0 0' }}>{exerciseCount} exercises planned</p>
          )}
        </div>
      )}
    </div>
  );
}
