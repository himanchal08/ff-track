import { Shell } from '@/components/layout/Shell';
import { logWeight, getWeightTrend } from '@/lib/actions/weight';
import { WeightChart } from '@/components/weight/WeightChart';
import { Scale } from 'lucide-react';

export default async function WeightPage() {
  const trendData = await getWeightTrend(30);
  
  // Find today's weight if it exists
  const todayWeight = trendData.length > 0 && trendData[trendData.length - 1].date === new Date().toLocaleDateString('en-CA') 
    ? trendData[trendData.length - 1].weight_kg 
    : null;

  async function handleLogWeight(formData: FormData) {
    'use server';
    const weight = Number(formData.get('weight'));
    if (weight > 0) {
      await logWeight(weight);
    }
  }

  return (
    <Shell title="Weight">
      <div style={{ paddingTop: '20px' }}>
        
        {/* Quick Entry Form */}
        <div className="glass-card accent-indigo" style={{ padding: '20px', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <div className="icon-pill" style={{ width: 34, height: 34, background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.2)' }}>
              <Scale size={16} color="#818cf8" strokeWidth={1.5} />
            </div>
            <h2 style={{ fontSize: '15px', fontWeight: 600, color: '#ededed', margin: 0 }}>Log Today&apos;s Weight</h2>
          </div>
          
          <form action={handleLogWeight} style={{ display: 'flex', gap: '12px' }}>
            <div style={{ flex: 1, position: 'relative' }}>
              <input 
                type="number" 
                name="weight" 
                step="0.1" 
                min="30" 
                max="300" 
                required 
                defaultValue={todayWeight || ''}
                placeholder="0.0"
                className="input-field"
                style={{ fontSize: '20px', fontWeight: 600, paddingRight: '40px' }}
              />
              <span style={{ 
                position: 'absolute', 
                right: '16px', 
                top: '50%', 
                transform: 'translateY(-50%)',
                color: '#71717a',
                fontSize: '14px',
                fontWeight: 500,
                pointerEvents: 'none'
              }}>
                kg
              </span>
            </div>
            <button 
              type="submit" 
              className="btn-premium"
              style={{ padding: '0 24px', flexShrink: 0 }}
            >
              Save
            </button>
          </form>
        </div>

        {/* Trend Graph */}
        <div className="glass-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '8px' }}>
            <h2 style={{ fontSize: '15px', fontWeight: 600, color: '#ededed', margin: 0 }}>30-Day Trend</h2>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#3f3f46' }} />
                <span style={{ fontSize: '10px', color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Daily</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: 12, height: 3, borderRadius: '2px', background: '#818cf8' }} />
                <span style={{ fontSize: '10px', color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.05em' }}>7d Avg</span>
              </div>
            </div>
          </div>
          
          <WeightChart data={trendData} />
        </div>

      </div>
    </Shell>
  );
}
