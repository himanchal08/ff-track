import { Dumbbell } from 'lucide-react';
import { EmptyRow } from './WeightCard';

interface WorkoutCardProps {
  todayPlan?: string | null;
  exerciseCount?: number | null;
  completed?: boolean;
}

export function WorkoutCard({ todayPlan, exerciseCount, completed }: WorkoutCardProps) {
  return (
    <div className="glass-card accent-violet animate-fade-slide-up animate-stagger-2" style={{ padding: '16px', marginBottom: '8px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
        <div className="icon-pill" style={{ width: 30, height: 30, background: 'rgba(139,92,246,0.12)', border: '1px solid rgba(139,92,246,0.2)' }}>
          <Dumbbell size={14} color="#a78bfa" strokeWidth={1.5} />
        </div>
        <span style={{ fontSize: '11px', fontWeight: 600, color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Workout</span>
        {completed && (
          <span style={{ marginLeft: 'auto', fontSize: '10px', fontWeight: 600, color: '#10b981', background: 'rgba(16,185,129,0.12)', padding: '2px 8px', borderRadius: '4px', border: '1px solid rgba(16,185,129,0.2)' }}>
            Done ✓
          </span>
        )}
      </div>
      {!todayPlan ? (
        <EmptyRow label="No workout logged today" action="Start workout" href="/workout" id="workout-card-start-btn" color="#a78bfa" bg="rgba(139,92,246,0.12)" border="rgba(139,92,246,0.25)" />
      ) : (
        <div>
          <p style={{ fontSize: '18px', fontWeight: 700, color: '#ededed', margin: 0, letterSpacing: '-0.01em' }}>{todayPlan}</p>
          {exerciseCount && <p style={{ fontSize: '12px', color: '#52525b', margin: '4px 0 0' }}>{exerciseCount} exercises planned</p>}
        </div>
      )}
    </div>
  );
}
