import { Wind } from 'lucide-react';
import { EmptyRow } from './WeightCard';

interface RunCardProps {
  distanceKm?: number | null;
  paceMinPerKm?: string | null;
}

export function RunCard({ distanceKm, paceMinPerKm }: RunCardProps) {
  const isEmpty = !distanceKm;

  return (
    <div className="glass-card animate-fade-slide-up animate-stagger-3" style={{ padding: '18px', marginBottom: '10px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
        <div className="icon-pill" style={{ width: 34, height: 34, background: 'var(--accent-sky-dim)', border: '1px solid rgba(56,189,248,0.2)' }}>
          <Wind size={16} color="var(--accent-sky)" strokeWidth={1.5} />
        </div>
        <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--fg-secondary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Run
        </span>
      </div>

      {isEmpty ? (
        <EmptyRow
          label="No run logged today" action="Log run" href="/run"
          id="run-card-log-btn"
          color="var(--accent-sky)" dimColor="var(--accent-sky-dim)" borderColor="rgba(56,189,248,0.2)"
        />
      ) : (
        <div style={{ display: 'flex', gap: '28px', alignItems: 'flex-end' }}>
          <div>
            <span style={{ fontSize: '32px', fontWeight: 800, color: 'var(--fg-primary)', lineHeight: 1, letterSpacing: '-0.02em' }}>
              {distanceKm?.toFixed(2)}
            </span>
            <span style={{ fontSize: '13px', color: 'var(--fg-secondary)', marginLeft: '4px', fontWeight: 500 }}>km</span>
          </div>
          {paceMinPerKm && (
            <div>
              <span style={{ fontSize: '26px', fontWeight: 700, color: 'var(--fg-primary)', lineHeight: 1, letterSpacing: '-0.01em' }}>
                {paceMinPerKm}
              </span>
              <span style={{ fontSize: '12px', color: 'var(--fg-secondary)', marginLeft: '4px' }}>min/km</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
