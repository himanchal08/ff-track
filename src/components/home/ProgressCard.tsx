import Link from 'next/link';
import { BarChart2, TrendingUp, TrendingDown } from 'lucide-react';

interface ProgressCardProps {
  hasData?: boolean;
  weightDelta?: number | null;   // kg change this week
  strengthUp?: boolean | null;
  runningUp?: boolean | null;
}

export function ProgressCard({ hasData, weightDelta, strengthUp, runningUp }: ProgressCardProps) {
  return (
    <div
      className="glass-card animate-fade-slide-up animate-stagger-4"
      style={{ padding: '20px', marginBottom: '12px' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: '10px',
              background: 'rgba(168, 85, 247, 0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <BarChart2 size={18} color="#a855f7" strokeWidth={1.5} />
          </div>
          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--fg-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Progress
          </span>
        </div>
        <Link
          id="progress-card-view-btn"
          href="/progress"
          style={{ fontSize: '12px', color: 'var(--fg-muted)', textDecoration: 'none' }}
        >
          View all →
        </Link>
      </div>

      {!hasData ? (
        <p style={{ fontSize: '14px', color: 'var(--fg-muted)', margin: 0 }}>
          No data yet — start logging to see your progress
        </p>
      ) : (
        <div style={{ display: 'flex', gap: '16px' }}>
          {weightDelta !== null && weightDelta !== undefined && (
            <Chip
              label="Weight"
              value={`${weightDelta > 0 ? '+' : ''}${weightDelta.toFixed(1)} kg`}
              positive={weightDelta <= 0}
            />
          )}
          {strengthUp !== null && strengthUp !== undefined && (
            <Chip label="Strength" value={strengthUp ? '↑' : '↓'} positive={strengthUp} />
          )}
          {runningUp !== null && runningUp !== undefined && (
            <Chip label="Running" value={runningUp ? '↑' : '↓'} positive={runningUp} />
          )}
        </div>
      )}
    </div>
  );
}

function Chip({ label, value, positive }: { label: string; value: string; positive: boolean }) {
  return (
    <div
      style={{
        padding: '8px 12px',
        borderRadius: '8px',
        background: positive ? 'var(--accent-primary-dim)' : 'rgba(245, 66, 66, 0.1)',
        border: `1px solid ${positive ? 'var(--border-accent)' : 'rgba(245,66,66,0.2)'}`,
        display: 'flex',
        flexDirection: 'column',
        gap: '2px',
      }}
    >
      <span style={{ fontSize: '10px', color: 'var(--fg-muted)', fontWeight: 500 }}>{label}</span>
      <span style={{ fontSize: '16px', fontWeight: 700, color: positive ? 'var(--accent-primary)' : 'var(--accent-danger)' }}>
        {value}
      </span>
    </div>
  );
}
