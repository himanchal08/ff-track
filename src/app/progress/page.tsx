import { Shell } from '@/components/layout/Shell';
import { getTodayBodyProgress, getBodyProgressHistory } from '@/lib/actions/body';
import { MeasurementForm } from '@/components/progress/MeasurementForm';
import { today, displayDate } from '@/lib/utils/dates';

export default async function BodyProgressPage() {
  const dateStr = today();
  const initialData = await getTodayBodyProgress();
  const history = await getBodyProgressHistory(10); // fetch last 10 entries

  return (
    <Shell title="Body Progress">
      <div style={{ paddingTop: '20px' }}>
        
        <MeasurementForm dateStr={dateStr} initialData={initialData} />

        <div className="glass-card" style={{ padding: '20px' }}>
          <h2 style={{ fontSize: '15px', fontWeight: 600, color: '#ededed', margin: '0 0 16px' }}>Recent Logs</h2>
          
          {history.length === 0 ? (
            <div style={{ padding: '20px', textAlign: 'center', color: '#52525b', fontSize: '13px' }}>
              No measurements logged yet.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {history.map(log => (
                <div key={log.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', background: '#0a0a0a', border: '1px solid #262626', borderRadius: '12px' }}>
                  <div style={{ fontSize: '14px', fontWeight: 500, color: '#ededed' }}>
                    {displayDate(log.date)}
                  </div>
                  <div style={{ display: 'flex', gap: '16px', fontSize: '13px', color: '#a1a1aa' }}>
                    {log.weight_kg && <span><strong style={{ color: '#fb7185' }}>{log.weight_kg}</strong> kg</span>}
                    {log.waist_cm && <span>W: <strong style={{ color: '#fb7185' }}>{log.waist_cm}</strong> cm</span>}
                    {log.chest_cm && <span>C: <strong style={{ color: '#fb7185' }}>{log.chest_cm}</strong> cm</span>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </Shell>
  );
}
