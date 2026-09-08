import Link from 'next/link';
import { Scale, TrendingDown, TrendingUp, Minus } from 'lucide-react';

interface WeightCardProps {
  todayWeight?: number | null;
  sevenDayAvg?: number | null;
  trend?: 'up' | 'down' | 'flat' | null;
}

export function WeightCard({ todayWeight, sevenDayAvg, trend }: WeightCardProps) {
  const isEmpty = !todayWeight;
  return (
    <div className="glass-card accent-indigo animate-fade-slide-up animate-stagger-1" style={{ padding: '16px', marginBottom: '8px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div className="icon-pill" style={{ width: 30, height: 30, background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.2)' }}>
            <Scale size={14} color="#818cf8" strokeWidth={1.5} />
          </div>
          <span style={{ fontSize: '11px', fontWeight: 600, color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Weight</span>
        </div>
        {!isEmpty && trend && <TrendIcon trend={trend} />}
      </div>
      {isEmpty ? (
        <EmptyRow label="No weight logged today" action="Log weight" href="/weight" id="weight-card-log-btn" color="#818cf8" bg="rgba(99,102,241,0.12)" border="rgba(99,102,241,0.25)" />
      ) : (
        <div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
            <span style={{ fontSize: '32px', fontWeight: 700, color: '#ededed', lineHeight: 1, letterSpacing: '-0.02em' }}>{todayWeight?.toFixed(1)}</span>
            <span style={{ fontSize: '14px', color: '#71717a' }}>kg</span>
          </div>
          {sevenDayAvg && <p style={{ fontSize: '12px', color: '#52525b', margin: '4px 0 0' }}>7-day avg: <span style={{ color: '#a1a1aa' }}>{sevenDayAvg.toFixed(1)} kg</span></p>}
        </div>
      )}
    </div>
  );
}

function TrendIcon({ trend }: { trend: 'up' | 'down' | 'flat' }) {
  if (trend === 'down') return <TrendingDown size={15} color="#10b981" />;
  if (trend === 'up')   return <TrendingUp   size={15} color="#ef4444" />;
  return <Minus size={15} color="#52525b" />;
}

export function EmptyRow({ label, action, href, id, color, bg, border }: {
  label: string; action: string; href: string; id: string;
  color: string; bg: string; border: string;
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
      <span style={{ fontSize: '13px', color: '#52525b' }}>{label}</span>
      <Link id={id} href={href} style={{
        fontSize: '12px', fontWeight: 600, color,
        textDecoration: 'none', padding: '6px 12px',
        borderRadius: '6px', background: bg,
        border: `1px solid ${border}`, whiteSpace: 'nowrap',
        transition: 'opacity 0.15s',
      }}>
        {action}
      </Link>
    </div>
  );
}
