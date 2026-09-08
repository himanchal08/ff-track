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
    <div className="glass-card animate-fade-slide-up animate-stagger-1" style={{ padding: '18px', marginBottom: '10px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div className="icon-pill" style={{ width: 34, height: 34, background: 'var(--accent-primary-dim)', border: '1px solid var(--accent-primary-border)' }}>
            <Scale size={16} color="var(--accent-primary)" strokeWidth={1.5} />
          </div>
          <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--fg-secondary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Weight
          </span>
        </div>
        {!isEmpty && trend && <TrendIcon trend={trend} />}
      </div>

      {isEmpty ? (
        <EmptyRow label="No weight logged today" action="Log weight" href="/weight" id="weight-card-log-btn" color="var(--accent-primary)" dimColor="var(--accent-primary-dim)" borderColor="var(--accent-primary-border)" />
      ) : (
        <div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '5px' }}>
            <span style={{ fontSize: '34px', fontWeight: 800, color: 'var(--fg-primary)', lineHeight: 1, letterSpacing: '-0.02em' }}>
              {todayWeight?.toFixed(1)}
            </span>
            <span style={{ fontSize: '15px', color: 'var(--fg-secondary)', fontWeight: 500 }}>kg</span>
          </div>
          {sevenDayAvg && (
            <p style={{ fontSize: '12px', color: 'var(--fg-muted)', marginTop: '4px', margin: '4px 0 0' }}>
              7-day avg: <span style={{ color: 'var(--fg-secondary)' }}>{sevenDayAvg.toFixed(1)} kg</span>
            </p>
          )}
        </div>
      )}
    </div>
  );
}

function TrendIcon({ trend }: { trend: 'up' | 'down' | 'flat' }) {
  if (trend === 'down') return <TrendingDown size={16} color="var(--accent-emerald)" />;
  if (trend === 'up')   return <TrendingUp   size={16} color="var(--accent-rose)" />;
  return <Minus size={16} color="var(--fg-muted)" />;
}

export function EmptyRow({ label, action, href, id, color, dimColor, borderColor }: {
  label: string; action: string; href: string; id: string;
  color: string; dimColor: string; borderColor: string;
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
      <span style={{ fontSize: '13px', color: 'var(--fg-muted)' }}>{label}</span>
      <Link id={id} href={href} style={{
        fontSize: '12px', fontWeight: 600, color,
        textDecoration: 'none', padding: '7px 13px',
        borderRadius: '8px', background: dimColor,
        border: `1px solid ${borderColor}`, whiteSpace: 'nowrap',
        transition: 'opacity 0.2s',
      }}>
        {action}
      </Link>
    </div>
  );
}
