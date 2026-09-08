import { Shell } from '@/components/layout/Shell';
import { getTodayLunch, getTomorrowLunch, getMealOptions } from '@/lib/actions/meals';
import { Droplets, Info } from 'lucide-react';

export default async function MealsPage() {
  const todayLunch = await getTodayLunch();
  const tomorrowLunch = await getTomorrowLunch();
  const options = await getMealOptions();

  // Highlight if tomorrow's lunch requires an overnight soak
  const needsSoak = tomorrowLunch?.requires_overnight_soak;

  return (
    <Shell title="Meals & Soak">
      <div style={{ paddingTop: '20px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* Soak Reminder Banner */}
        {needsSoak && (
          <div style={{ 
            background: 'rgba(56,189,248,0.1)', 
            border: '1px solid rgba(56,189,248,0.3)', 
            padding: '16px', 
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px'
          }}>
            <Droplets size={20} color="#38bdf8" style={{ marginTop: '2px', flexShrink: 0 }} />
            <div>
              <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#38bdf8', margin: '0 0 4px' }}>Overnight Soak Required</h3>
              <p style={{ fontSize: '13px', color: '#a1a1aa', margin: 0, lineHeight: 1.5 }}>
                Tomorrow&apos;s lunch is <strong>{tomorrowLunch?.ingredient}</strong>. Don&apos;t forget to soak it tonight!
              </p>
            </div>
          </div>
        )}

        {/* Lunch Rotation */}
        <div className="glass-card" style={{ padding: '20px' }}>
          <h2 style={{ fontSize: '15px', fontWeight: 600, color: '#ededed', margin: '0 0 16px' }}>Lunch Rotation</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div style={{ padding: '12px', background: '#0a0a0a', border: '1px solid #262626', borderRadius: '8px' }}>
              <span style={{ fontSize: '11px', color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Today</span>
              <div style={{ fontSize: '15px', fontWeight: 600, color: '#ededed', marginTop: '4px' }}>
                {todayLunch?.ingredient || 'Not set'}
              </div>
            </div>
            <div style={{ padding: '12px', background: '#0a0a0a', border: '1px solid #262626', borderRadius: '8px' }}>
              <span style={{ fontSize: '11px', color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Tomorrow</span>
              <div style={{ fontSize: '15px', fontWeight: 600, color: '#ededed', marginTop: '4px' }}>
                {tomorrowLunch?.ingredient || 'Not set'}
              </div>
            </div>
          </div>
        </div>

        {/* Meal Options */}
        <div className="glass-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '15px', fontWeight: 600, color: '#ededed', margin: 0 }}>Reference Options</h2>
            <Info size={14} color="#52525b" />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Breakfast */}
            <div>
              <h3 style={{ fontSize: '12px', color: '#a1a1aa', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Breakfast</h3>
              {options.breakfast.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {options.breakfast.map(opt => (
                    <div key={opt.id} style={{ fontSize: '14px', color: '#d4d4d8', padding: '8px 12px', background: '#111111', borderRadius: '6px' }}>
                      {opt.option_label}
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ fontSize: '13px', color: '#52525b' }}>No breakfast options configured.</div>
              )}
            </div>

            {/* Snack */}
            <div>
              <h3 style={{ fontSize: '12px', color: '#a1a1aa', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Snack</h3>
              {options.snack.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {options.snack.map(opt => (
                    <div key={opt.id} style={{ fontSize: '14px', color: '#d4d4d8', padding: '8px 12px', background: '#111111', borderRadius: '6px' }}>
                      {opt.option_label}
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ fontSize: '13px', color: '#52525b' }}>No snack options configured.</div>
              )}
            </div>

            {/* Dinner */}
            <div>
              <h3 style={{ fontSize: '12px', color: '#a1a1aa', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Dinner</h3>
              {options.dinner.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {options.dinner.map(opt => (
                    <div key={opt.id} style={{ fontSize: '14px', color: '#d4d4d8', padding: '8px 12px', background: '#111111', borderRadius: '6px' }}>
                      {opt.option_label}
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ fontSize: '13px', color: '#52525b' }}>No dinner options configured.</div>
              )}
            </div>

          </div>
        </div>

      </div>
    </Shell>
  );
}
