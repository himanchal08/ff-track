'use client';

import { useState, useTransition } from 'react';
import { logBodyProgress, type BodyProgressLog } from '@/lib/actions/body';
import { Ruler } from 'lucide-react';

interface MeasurementFormProps {
  dateStr: string;
  initialData?: BodyProgressLog | null;
}

export function MeasurementForm({ dateStr, initialData }: MeasurementFormProps) {
  const [weight, setWeight] = useState<string>(initialData?.weight_kg ? String(initialData.weight_kg) : '');
  const [waist, setWaist] = useState<string>(initialData?.waist_cm ? String(initialData.waist_cm) : '');
  const [chest, setChest] = useState<string>(initialData?.chest_cm ? String(initialData.chest_cm) : '');
  
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const w = weight ? Number(weight) : null;
    const wa = waist ? Number(waist) : null;
    const ch = chest ? Number(chest) : null;
    
    if (!w && !wa && !ch) return;

    startTransition(async () => {
      await logBodyProgress(dateStr, w, wa, ch);
      // Optional: show a toast/success message
    });
  };

  return (
    <div className="glass-card accent-rose" style={{ padding: '20px', marginBottom: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
        <div className="icon-pill" style={{ width: 34, height: 34, background: 'rgba(244,63,94,0.12)', border: '1px solid rgba(244,63,94,0.2)' }}>
          <Ruler size={16} color="#fb7185" strokeWidth={1.5} />
        </div>
        <h2 style={{ fontSize: '15px', fontWeight: 600, color: '#ededed', margin: 0 }}>Log Measurements</h2>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '11px', color: '#a1a1aa', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Weight (kg)
            </label>
            <input 
              type="number" step="0.1" min="30"
              className="input-field" placeholder="0.0"
              value={weight} onChange={e => setWeight(e.target.value)}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '11px', color: '#a1a1aa', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Waist (cm)
            </label>
            <input 
              type="number" step="0.1" min="20"
              className="input-field" placeholder="0.0"
              value={waist} onChange={e => setWaist(e.target.value)}
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '11px', color: '#a1a1aa', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Chest (cm)
            </label>
            <input 
              type="number" step="0.1" min="20"
              className="input-field" placeholder="0.0"
              value={chest} onChange={e => setChest(e.target.value)}
            />
          </div>
        </div>

        <button type="submit" disabled={isPending} className="btn-premium" style={{ marginTop: '8px' }}>
          {isPending ? 'Saving...' : 'Save Measurements'}
        </button>
      </form>
    </div>
  );
}
