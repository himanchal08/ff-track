'use client';

import { BarChart, Bar, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ComposedChart, CartesianGrid } from 'recharts';
import type { RunLog } from '@/lib/actions/run';

interface WeeklyProgressionProps {
  logs: RunLog[];
}

export function WeeklyProgression({ logs }: WeeklyProgressionProps) {
  if (!logs || logs.length === 0) {
    return (
      <div style={{ height: 160, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#52525b', fontSize: '13px' }}>
        No runs logged this week.
      </div>
    );
  }

  // Format data for chart
  const data = logs.map(log => {
    const paceSeconds = log.time_seconds / log.distance_km;
    const paceMins = Math.floor(paceSeconds / 60);
    const paceSecs = Math.floor(paceSeconds % 60);
    
    // Pace as a decimal number for charting (e.g. 5:30 -> 5.5)
    // Actually, charting pace is tricky because lower is better.
    // For simplicity, we just plot pace value.
    const paceDecimal = paceSeconds / 60;
    
    const d = new Date(log.date);
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    return {
      day: dayNames[d.getDay()],
      distance: Number(log.distance_km),
      pace: Number(paceDecimal.toFixed(2)),
      paceFormatted: `${paceMins}:${String(paceSecs).padStart(2, '0')}`,
    };
  });

  return (
    <div style={{ width: '100%', height: 200, marginTop: '16px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#262626" />
          <XAxis 
            dataKey="day" 
            stroke="#52525b"
            fontSize={10}
            tickMargin={8}
            axisLine={false}
            tickLine={false}
          />
          <YAxis 
            yAxisId="left"
            stroke="#52525b"
            fontSize={10}
            axisLine={false}
            tickLine={false}
            tickCount={4}
          />
          <YAxis 
            yAxisId="right"
            orientation="right"
            stroke="#52525b"
            fontSize={10}
            axisLine={false}
            tickLine={false}
            tickCount={4}
            reversed={true} // lower pace is higher on graph
            domain={['dataMin - 0.5', 'dataMax + 0.5']}
            hide // hide right axis text to keep it clean
          />
          <Tooltip 
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload;
                return (
                  <div style={{ 
                    background: '#111111', 
                    border: '1px solid #262626',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
                  }}>
                    <p style={{ margin: 0, fontSize: '10px', color: '#a1a1aa', marginBottom: '4px' }}>
                      {data.day}
                    </p>
                    <p style={{ margin: 0, fontSize: '14px', fontWeight: 600, color: '#38bdf8' }}>
                      {data.distance} km
                    </p>
                    <p style={{ margin: 0, fontSize: '12px', color: '#ededed', marginTop: '2px' }}>
                      Pace: {data.paceFormatted} /km
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Bar yAxisId="left" dataKey="distance" fill="rgba(56,189,248,0.2)" stroke="#38bdf8" strokeWidth={1} radius={[4, 4, 0, 0]} maxBarSize={40} />
          <Line yAxisId="right" type="monotone" dataKey="pace" stroke="#ededed" strokeWidth={2} dot={{ r: 4, fill: '#ededed', strokeWidth: 0 }} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
