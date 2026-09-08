import { Wind } from 'lucide-react';
import { EmptyRow } from './WeightCard';

interface RunCardProps {
  distanceKm?: number | null;
  paceMinPerKm?: string | null;
}

export function RunCard({ distanceKm, paceMinPerKm }: RunCardProps) {
  return (
    <div className="glass-card accent-sky animate-fade-slide-up animate-stagger-3" style={{ padding: '16px', marginBottom: '8px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
        <div className="icon-pill" style={{ width: 30, height: 30, background: 'rgba(14,165,233,0.12)', border: '1px solid rgba(14,165,233,0.2)' }}>
          <Wind size={14} color="#38bdf8" strokeWidth={1.5} />
        </div>
        <span style={{ fontSize: '11px', fontWeight: 600, color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Run</span>
      </div>
      {!distanceKm ? (
        <EmptyRow label="No run logged today" action="Log run" href="/run" id="run-card-log-btn" color="#38bdf8" bg="rgba(14,165,233,0.12)" border="rgba(14,165,233,0.25)" />
      ) : (
        <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-end' }}>
          <div>
            <span style={{ fontSize: '30px', fontWeight: 700, color: '#ededed', lineHeight: 1, letterSpacing: '-0.02em' }}>{distanceKm?.toFixed(2)}</span>
            <span style={{ fontSize: '13px', color: '#71717a', marginLeft: '4px' }}>km</span>
          </div>
          {paceMinPerKm && (
            <div>
              <span style={{ fontSize: '24px', fontWeight: 700, color: '#ededed', lineHeight: 1, letterSpacing: '-0.01em' }}>{paceMinPerKm}</span>
              <span style={{ fontSize: '12px', color: '#71717a', marginLeft: '4px' }}>min/km</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
