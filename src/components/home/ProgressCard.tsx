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
    <div className="glass-card accent-emerald animate-fade-slide-up animate-stagger-4" style={{ padding: '16px', marginBottom: '8px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div className="icon-pill" style={{ width: 30, height: 30, background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.2)' }}>
            <BarChart2 size={14} color="#10b981" strokeWidth={1.5} />
          </div>
          <span style={{ fontSize: '11px', fontWeight: 600, color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Progress</span>
        </div>
        <Link id="progress-card-view-btn" href="/progress" style={{ fontSize: '12px', color: '#52525b', textDecoration: 'none', fontWeight: 500 }}>
          View all →
        </Link>
      </div>
      {!hasData ? (
        <p style={{ fontSize: '13px', color: '#52525b', margin: 0 }}>Start logging to see your progress</p>
      ) : (
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
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
  const color  = positive ? '#10b981' : '#f87171';
  const bg     = positive ? 'rgba(16,185,129,0.12)' : 'rgba(239,68,68,0.12)';
  const border = positive ? 'rgba(16,185,129,0.2)'  : 'rgba(239,68,68,0.2)';
  return (
    <div style={{ padding: '7px 11px', borderRadius: '8px', background: bg, border: `1px solid ${border}` }}>
      <p style={{ margin: 0, fontSize: '10px', color: '#52525b', fontWeight: 500, marginBottom: '2px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</p>
      <p style={{ margin: 0, fontSize: '15px', fontWeight: 700, color, letterSpacing: '-0.01em' }}>{value}</p>
    </div>
  );
}
