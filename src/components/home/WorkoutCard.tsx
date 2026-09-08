import Link from 'next/link';
import { Dumbbell } from 'lucide-react';

interface WorkoutCardProps {
  todayPlan?: string | null;
  exerciseCount?: number | null;
  completed?: boolean;
}

export function WorkoutCard({ todayPlan, exerciseCount, completed }: WorkoutCardProps) {
  const isEmpty = !todayPlan;

  return (
    <div
      className="glass-card animate-fade-slide-up animate-stagger-2"
      style={{ padding: '20px', marginBottom: '12px' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: '10px',
            background: 'rgba(0, 217, 245, 0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Dumbbell size={18} color="var(--accent-secondary)" strokeWidth={1.5} />
        </div>
        <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--fg-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          Workout
        </span>
        {completed && (
          <span
            style={{
              marginLeft: 'auto',
              fontSize: '11px',
              fontWeight: 600,
              color: 'var(--accent-primary)',
              background: 'var(--accent-primary-dim)',
              padding: '2px 8px',
              borderRadius: '4px',
            }}
          >
            Done ✓
          </span>
        )}
      </div>

      {isEmpty ? (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '14px', color: 'var(--fg-muted)' }}>No workout logged today</span>
          <Link
            id="workout-card-start-btn"
            href="/workout"
            style={{
              fontSize: '13px',
              fontWeight: 600,
              color: 'var(--accent-secondary)',
              textDecoration: 'none',
              padding: '8px 14px',
              borderRadius: '8px',
              background: 'rgba(0, 217, 245, 0.12)',
              border: '1px solid rgba(0, 217, 245, 0.3)',
              whiteSpace: 'nowrap',
            }}
          >
            Start workout
          </Link>
        </div>
      ) : (
        <div>
          <p style={{ fontSize: '20px', fontWeight: 700, color: 'var(--fg-primary)', margin: 0 }}>
            {todayPlan}
          </p>
          {exerciseCount && (
            <p style={{ fontSize: '13px', color: 'var(--fg-muted)', marginTop: '4px' }}>
              {exerciseCount} exercises planned
            </p>
          )}
        </div>
      )}
    </div>
  );
}
