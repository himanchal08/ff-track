import Link from 'next/link';
import { BarChart2 } from 'lucide-react';

interface ProgressCardProps {
  hasData?: boolean;
  weightDelta?: number | null;
  strengthUp?: boolean | null;
  runningUp?: boolean | null;
}

export function ProgressCard({ hasData, weightDelta, strengthUp, runningUp }: ProgressCardProps) {
  return (
    <div className="glass-card animate-fade-slide-up animate-stagger-4" style={{ padding: '18px', marginBottom: '10px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div className="icon-pill" style={{ width: 34, height: 34, background: 'var(--accent-emerald-dim)', border: '1px solid rgba(52,211,153,0.2)' }}>
            <BarChart2 size={16} color="var(--accent-emerald)" strokeWidth={1.5} />
          </div>
          <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--fg-secondary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Progress
          </span>
        </div>
        <Link id="progress-card-view-btn" href="/progress" style={{
          fontSize: '12px', color: 'var(--accent-primary)', textDecoration: 'none',
          fontWeight: 500, opacity: 0.8,
        }}>
          View all →
        </Link>
      </div>

      {!hasData ? (
        <p style={{ fontSize: '13px', color: 'var(--fg-muted)', margin: 0 }}>
          Start logging to see your progress
        </p>
      ) : (
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {weightDelta !== null && weightDelta !== undefined && (
            <Chip label="Weight" value={`${weightDelta > 0 ? '+' : ''}${weightDelta.toFixed(1)} kg`} positive={weightDelta <= 0} />
          )}
          {strengthUp !== null && strengthUp !== undefined && (
            <Chip label="Strength" value={strengthUp ? '↑' : '↓'} positive={!!strengthUp} />
          )}
          {runningUp !== null && runningUp !== undefined && (
            <Chip label="Running" value={runningUp ? '↑' : '↓'} positive={!!runningUp} />
          )}
        </div>
      )}
    </div>
  );
}

function Chip({ label, value, positive }: { label: string; value: string; positive: boolean }) {
  const color = positive ? 'var(--accent-emerald)' : 'var(--accent-rose)';
  const bg    = positive ? 'var(--accent-emerald-dim)' : 'var(--accent-rose-dim)';
  const border = positive ? 'rgba(52,211,153,0.2)' : 'rgba(251,113,133,0.2)';
  return (
    <div style={{ padding: '8px 12px', borderRadius: '8px', background: bg, border: `1px solid ${border}` }}>
      <p style={{ margin: 0, fontSize: '10px', color: 'var(--fg-muted)', fontWeight: 500, marginBottom: '2px' }}>{label}</p>
      <p style={{ margin: 0, fontSize: '16px', fontWeight: 800, color, letterSpacing: '-0.01em' }}>{value}</p>
    </div>
  );
}
