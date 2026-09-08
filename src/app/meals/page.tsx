import { Shell } from '@/components/layout/Shell';
import { getTodayLunch, getTomorrowLunch, getMealOptions } from '@/lib/actions/meals';
import { Droplets, Clock, Sunrise, Sun, Sunset, Moon } from 'lucide-react';

export default async function MealsPage() {
  const todayLunch = await getTodayLunch();
  const tomorrowLunch = await getTomorrowLunch();
  const options = await getMealOptions();

  return (
    <Shell title="Daily Meal Plan">
      <div style={{ paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* Overnight Soak (Actionable tonight) */}
        <div style={{ 
          background: 'rgba(56,189,248,0.1)', 
          border: '1px solid rgba(56,189,248,0.3)', 
          padding: '20px', 
          borderRadius: '12px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <Droplets size={22} color="#38bdf8" />
            <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#38bdf8', margin: 0 }}>Soak Tonight (For Tomorrow)</h2>
          </div>
          <p style={{ fontSize: '13px', color: '#a1a1aa', margin: '0 0 12px', lineHeight: 1.5 }}>
            Prepare these items tonight so they are ready for tomorrow:
          </p>
          <ul style={{ fontSize: '14px', color: '#ededed', margin: 0, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <li><strong>70 g dry chana</strong> <span style={{ color: '#71717a' }}>(Breakfast)</span></li>
            <li><strong>4 almonds</strong> <span style={{ color: '#71717a' }}>(Breakfast)</span></li>
            {tomorrowLunch && (
              <li><strong>{tomorrowLunch.ingredient}</strong> <span style={{ color: '#71717a' }}>(Lunch)</span></li>
            )}
          </ul>
        </div>

        {/* Breakfast */}
        <div className="glass-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <Sunrise size={18} color="#fbbf24" />
            <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#ededed', margin: 0 }}>Breakfast</h2>
          </div>
          
          <div style={{ marginBottom: '16px' }}>
            <h3 style={{ fontSize: '11px', color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Everyday Constants</h3>
            <ul style={{ fontSize: '14px', color: '#d4d4d8', margin: 0, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <li>70 g chana (soaked)</li>
              <li>30 g bhunja chana</li>
              <li>4 almonds (soaked)</li>
              <li>1-2 whole fruits</li>
            </ul>
          </div>

          <div>
            <h3 style={{ fontSize: '11px', color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Choose One</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {options.breakfast.map((opt, i) => (
                <div key={opt.id} style={{ fontSize: '13px', color: '#a1a1aa', padding: '8px 12px', background: '#0a0a0a', border: '1px solid #262626', borderRadius: '6px' }}>
                  {i + 1}. {opt.option_label}
                </div>
              ))}
            </div>
            <p style={{ fontSize: '12px', color: '#fb7185', marginTop: '10px', fontWeight: 500 }}>Total Protein: ~32-43 g</p>
          </div>
        </div>

        {/* Lunch */}
        <div className="glass-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <Sun size={18} color="#f97316" />
            <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#ededed', margin: 0 }}>Lunch</h2>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <h3 style={{ fontSize: '11px', color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Today's Rotation</h3>
            <div style={{ fontSize: '15px', fontWeight: 600, color: '#38bdf8', padding: '12px', background: 'rgba(56,189,248,0.1)', border: '1px solid rgba(56,189,248,0.2)', borderRadius: '8px' }}>
              {todayLunch?.ingredient || 'Not set'}
            </div>
          </div>

          <div>
            <h3 style={{ fontSize: '11px', color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Everyday Constants</h3>
            <ul style={{ fontSize: '14px', color: '#d4d4d8', margin: 0, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <li>2 rotis</li>
              <li>200 g sabzi</li>
              <li>200 g plain curd</li>
              <li>150-200 g cucumber + beetroot salad</li>
              <li>Lemon</li>
            </ul>
            <p style={{ fontSize: '12px', color: '#fb7185', marginTop: '10px', fontWeight: 500 }}>Total Protein: ~42-58 g</p>
          </div>
        </div>

        {/* Snack */}
        <div className="glass-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sunset size={18} color="#a855f7" />
              <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#ededed', margin: 0 }}>Snack</h2>
            </div>
            <span style={{ fontSize: '12px', color: '#71717a', fontWeight: 600 }}>4:30 – 5:00 PM</span>
          </div>

          <div>
            <h3 style={{ fontSize: '11px', color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Choose One</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {options.snack.map((opt, i) => (
                <div key={opt.id} style={{ fontSize: '13px', color: '#a1a1aa', padding: '8px 12px', background: '#0a0a0a', border: '1px solid #262626', borderRadius: '6px' }}>
                  {i + 1}. {opt.option_label}
                </div>
              ))}
            </div>
            <p style={{ fontSize: '12px', color: '#fb7185', marginTop: '10px', fontWeight: 500 }}>Total Protein: ~10-15 g</p>
          </div>
        </div>

        {/* Dinner & Night */}
        <div className="glass-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Moon size={18} color="#6366f1" />
              <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#ededed', margin: 0 }}>Dinner & Night</h2>
            </div>
            <span style={{ fontSize: '12px', color: '#71717a', fontWeight: 600 }}>8:00 – 8:30 PM</span>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '11px', color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Choose One (Dinner)</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {options.dinner.map((opt, i) => {
                if (opt.option_label.includes('NIGHT:')) return null;
                return (
                  <div key={opt.id} style={{ fontSize: '13px', color: '#a1a1aa', padding: '8px 12px', background: '#0a0a0a', border: '1px solid #262626', borderRadius: '6px' }}>
                    {i + 1}. {opt.option_label}
                  </div>
                );
              })}
            </div>
            <p style={{ fontSize: '12px', color: '#fb7185', marginTop: '10px', fontWeight: 500 }}>Total Protein: ~25-35 g</p>
          </div>

          <div style={{ paddingTop: '16px', borderTop: '1px solid #262626' }}>
            <h3 style={{ fontSize: '11px', color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Night</h3>
            <div style={{ fontSize: '14px', color: '#d4d4d8', padding: '8px 12px', background: '#0a0a0a', border: '1px solid #262626', borderRadius: '6px' }}>
              350 g buffalo milk
            </div>
            <p style={{ fontSize: '12px', color: '#fb7185', marginTop: '10px', fontWeight: 500 }}>Total Protein: ~14 g</p>
          </div>
        </div>

      </div>
    </Shell>
  );
}
