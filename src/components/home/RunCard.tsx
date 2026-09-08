import Link from 'next/link';
import { Wind } from 'lucide-react';

interface RunCardProps {
  distanceKm?: number | null;
  paceMinPerKm?: string | null; // e.g. "5:30"
}

export function RunCard({ distanceKm, paceMinPerKm }: RunCardProps) {
  const isEmpty = !distanceKm;

  return (
    <div
      className="glass-card animate-fade-slide-up animate-stagger-3"
      style={{ padding: '20px', marginBottom: '12px' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: '10px',
            background: 'rgba(245, 166, 35, 0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Wind size={18} color="var(--accent-warning)" strokeWidth={1.5} />
        </div>
        <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--fg-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          Run
        </span>
      </div>

      {isEmpty ? (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '14px', color: 'var(--fg-muted)' }}>No run logged today</span>
          <Link
            id="run-card-log-btn"
            href="/run"
            style={{
              fontSize: '13px',
              fontWeight: 600,
              color: 'var(--accent-warning)',
              textDecoration: 'none',
              padding: '8px 14px',
              borderRadius: '8px',
              background: 'rgba(245, 166, 35, 0.12)',
              border: '1px solid rgba(245, 166, 35, 0.3)',
              whiteSpace: 'nowrap',
            }}
          >
            Log run
          </Link>
        </div>
      ) : (
        <div style={{ display: 'flex', gap: '24px' }}>
          <div>
            <span style={{ fontSize: '28px', fontWeight: 700, color: 'var(--fg-primary)', lineHeight: 1 }}>
              {distanceKm?.toFixed(2)}
            </span>
            <span style={{ fontSize: '14px', color: 'var(--fg-secondary)', marginLeft: '4px' }}>km</span>
          </div>
          {paceMinPerKm && (
            <div>
              <span style={{ fontSize: '28px', fontWeight: 700, color: 'var(--fg-primary)', lineHeight: 1 }}>
                {paceMinPerKm}
              </span>
              <span style={{ fontSize: '14px', color: 'var(--fg-secondary)', marginLeft: '4px' }}>min/km</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
