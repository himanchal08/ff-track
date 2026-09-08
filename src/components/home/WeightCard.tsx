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
    <div
      className="glass-card animate-fade-slide-up animate-stagger-1"
      style={{ padding: '20px', marginBottom: '12px' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: '10px',
              background: 'var(--accent-primary-dim)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Scale size={18} color="var(--accent-primary)" strokeWidth={1.5} />
          </div>
          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--fg-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Weight
          </span>
        </div>
        {!isEmpty && trend && (
          <TrendIcon trend={trend} />
        )}
      </div>

      {isEmpty ? (
        <EmptyState
          message="No weight logged today"
          action="Log weight"
          href="/weight"
          id="weight-card-log-btn"
        />
      ) : (
        <div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
            <span style={{ fontSize: '36px', fontWeight: 700, color: 'var(--fg-primary)', lineHeight: 1 }}>
              {todayWeight?.toFixed(1)}
            </span>
            <span style={{ fontSize: '16px', color: 'var(--fg-secondary)' }}>kg</span>
          </div>
          {sevenDayAvg && (
            <p style={{ fontSize: '13px', color: 'var(--fg-muted)', marginTop: '4px' }}>
              7-day avg: <span style={{ color: 'var(--fg-secondary)' }}>{sevenDayAvg.toFixed(1)} kg</span>
            </p>
          )}
        </div>
      )}
    </div>
  );
}

function TrendIcon({ trend }: { trend: 'up' | 'down' | 'flat' }) {
  if (trend === 'down') return <TrendingDown size={18} color="var(--accent-primary)" />;
  if (trend === 'up') return <TrendingUp size={18} color="var(--accent-danger)" />;
  return <Minus size={18} color="var(--fg-muted)" />;
}

function EmptyState({
  message,
  action,
  href,
  id,
}: {
  message: string;
  action: string;
  href: string;
  id: string;
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <span style={{ fontSize: '14px', color: 'var(--fg-muted)' }}>{message}</span>
      <Link
        id={id}
        href={href}
        style={{
          fontSize: '13px',
          fontWeight: 600,
          color: 'var(--accent-primary)',
          textDecoration: 'none',
          padding: '8px 14px',
          borderRadius: '8px',
          background: 'var(--accent-primary-dim)',
          border: '1px solid var(--border-accent)',
          whiteSpace: 'nowrap',
          transition: 'all 0.2s ease',
        }}
      >
        {action}
      </Link>
    </div>
  );
}
