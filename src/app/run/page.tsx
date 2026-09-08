import { Shell } from '@/components/layout/Shell';
import { getWeeklyRunLogs } from '@/lib/actions/run';
import { RunLogger } from '@/components/run/RunLogger';
import { WeeklyProgression } from '@/components/run/WeeklyProgression';
import { today } from '@/lib/utils/dates';

export default async function RunPage() {
  const dateStr = today();
  const weeklyLogs = await getWeeklyRunLogs(dateStr);

  return (
    <Shell title="Run">
      <div style={{ paddingTop: '20px' }}>
        
        <RunLogger dateStr={dateStr} />

        <div className="glass-card" style={{ padding: '20px' }}>
          <h2 style={{ fontSize: '15px', fontWeight: 600, color: '#ededed', margin: '0 0 16px' }}>This Week</h2>
          <WeeklyProgression logs={weeklyLogs} />
        </div>

      </div>
    </Shell>
  );
}
