'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import type { RunLog } from '@/lib/actions/run';
import { displayDate } from '@/lib/utils/dates';

interface RunningTrendChartProps {
  logs: RunLog[];
}

export function RunningTrendChart({ logs }: RunningTrendChartProps) {
  if (!logs || logs.length === 0) {
    return (
      <div style={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#52525b', fontSize: '13px' }}>
        No running data available.
      </div>
    );
  }

  // Aggregate by week or just plot daily if < 30 days. Let's do daily.
  return (
    <div style={{ width: '100%', height: 240, marginTop: '20px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={logs} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#262626" />
          <XAxis 
            dataKey="date" 
            tickFormatter={(dateStr) => {
              const d = new Date(dateStr);
              return `${d.getDate()}/${d.getMonth() + 1}`;
            }}
            stroke="#52525b"
            fontSize={10}
            tickMargin={8}
            axisLine={false}
            tickLine={false}
          />
          <YAxis 
            stroke="#52525b"
            fontSize={10}
            axisLine={false}
            tickLine={false}
            tickCount={5}
          />
          <Tooltip 
            cursor={{ fill: 'rgba(56,189,248,0.1)' }}
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload as RunLog;
                return (
                  <div style={{ 
                    background: '#111111', 
                    border: '1px solid #262626',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
                  }}>
                    <p style={{ margin: 0, fontSize: '10px', color: '#a1a1aa', marginBottom: '4px' }}>
                      {displayDate(data.date)}
                    </p>
                    <p style={{ margin: 0, fontSize: '14px', fontWeight: 600, color: '#38bdf8' }}>
                      {data.distance_km} km
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Bar dataKey="distance_km" fill="#38bdf8" radius={[4, 4, 0, 0]} maxBarSize={30} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
