'use client';

import { useState, useTransition } from 'react';
import { logRun } from '@/lib/actions/run';
import { Wind } from 'lucide-react';

interface RunLoggerProps {
  dateStr: string;
}

export function RunLogger({ dateStr }: RunLoggerProps) {
  const [distance, setDistance] = useState<string>('');
  const [mins, setMins] = useState<string>('');
  const [secs, setSecs] = useState<string>('');
  const [contMins, setContMins] = useState<string>('');
  
  const [isPending, startTransition] = useTransition();

  // Derived pace calculation for UI preview
  let paceFormatted = '--:--';
  const d = Number(distance);
  const totalSecs = (Number(mins) * 60) + Number(secs);
  
  if (d > 0 && totalSecs > 0) {
    const paceSecsPerKm = totalSecs / d;
    const pMins = Math.floor(paceSecsPerKm / 60);
    const pSecs = Math.floor(paceSecsPerKm % 60);
    paceFormatted = `${pMins}:${String(pSecs).padStart(2, '0')}`;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (d <= 0 || totalSecs <= 0) return;

    const continuousSecs = contMins ? Number(contMins) * 60 : null;

    startTransition(async () => {
      await logRun(dateStr, d, totalSecs, continuousSecs);
      setDistance('');
      setMins('');
      setSecs('');
      setContMins('');
    });
  };

  return (
    <div className="glass-card accent-sky" style={{ padding: '20px', marginBottom: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
        <div className="icon-pill" style={{ width: 34, height: 34, background: 'rgba(14,165,233,0.12)', border: '1px solid rgba(14,165,233,0.2)' }}>
          <Wind size={16} color="#38bdf8" strokeWidth={1.5} />
        </div>
        <h2 style={{ fontSize: '15px', fontWeight: 600, color: '#ededed', margin: 0 }}>Log Run</h2>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', gap: '12px' }}>
          {/* Distance */}
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontSize: '11px', color: '#a1a1aa', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Distance (km)
            </label>
            <input 
              type="number" step="0.01" min="0.1" required
              className="input-field" placeholder="0.00"
              value={distance} onChange={e => setDistance(e.target.value)}
              style={{ fontSize: '18px', fontWeight: 600 }}
            />
          </div>
          
          {/* Time */}
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontSize: '11px', color: '#a1a1aa', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Time
            </label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input 
                type="number" min="0" required
                className="input-field" placeholder="Min"
                value={mins} onChange={e => setMins(e.target.value)}
                style={{ fontSize: '16px', fontWeight: 600, padding: '0 8px', textAlign: 'center' }}
              />
              <span style={{ color: '#52525b', alignSelf: 'center', fontWeight: 600 }}>:</span>
              <input 
                type="number" min="0" max="59" required
                className="input-field" placeholder="Sec"
                value={secs} onChange={e => setSecs(e.target.value)}
                style={{ fontSize: '16px', fontWeight: 600, padding: '0 8px', textAlign: 'center' }}
              />
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-end' }}>
          {/* Continuous Mins */}
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontSize: '11px', color: '#a1a1aa', marginBottom: '6px' }}>
              Continuous Run (Mins) <span style={{ color: '#52525b', fontSize: '10px' }}>Optional</span>
            </label>
            <input 
              type="number" min="0"
              className="input-field" placeholder="0"
              value={contMins} onChange={e => setContMins(e.target.value)}
            />
          </div>

          {/* Derived Pace Preview */}
          <div style={{ flex: 1, paddingBottom: '10px', textAlign: 'right' }}>
            <span style={{ fontSize: '11px', color: '#71717a' }}>Pace: </span>
            <span style={{ fontSize: '20px', fontWeight: 700, color: '#38bdf8', letterSpacing: '-0.02em' }}>
              {paceFormatted}
            </span>
            <span style={{ fontSize: '10px', color: '#52525b', marginLeft: '4px' }}>/km</span>
          </div>
        </div>

        <button type="submit" disabled={isPending} className="btn-premium" style={{ marginTop: '8px' }}>
          {isPending ? 'Saving...' : 'Save Run'}
        </button>
      </form>
    </div>
  );
}
