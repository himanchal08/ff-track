'use client';

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { displayDate } from '@/lib/utils/dates';

interface WeightDataPoint {
  date: string;
  weight_kg: number;
  avg_7d: number | null;
}

interface WeightChartProps {
  data: WeightDataPoint[];
}

export function WeightChart({ data }: WeightChartProps) {
  if (!data || data.length === 0) {
    return (
      <div style={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#52525b', fontSize: '13px' }}>
        No weight data yet.
      </div>
    );
  }

  // Calculate min and max for YAxis to make the chart look nice
  const weights = data.map(d => d.weight_kg);
  const minWeight = Math.floor(Math.min(...weights)) - 1;
  const maxWeight = Math.ceil(Math.max(...weights)) + 1;

  return (
    <div style={{ width: '100%', height: 240, marginTop: '20px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
            domain={[minWeight, maxWeight]} 
            stroke="#52525b"
            fontSize={10}
            axisLine={false}
            tickLine={false}
            tickCount={5}
          />
          <Tooltip 
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const point = payload[0].payload as WeightDataPoint;
                return (
                  <div style={{ 
                    background: '#111111', 
                    border: '1px solid #262626',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
                  }}>
                    <p style={{ margin: 0, fontSize: '10px', color: '#a1a1aa', marginBottom: '4px' }}>
                      {displayDate(point.date)}
                    </p>
                    <p style={{ margin: 0, fontSize: '14px', fontWeight: 600, color: '#ededed' }}>
                      {point.weight_kg.toFixed(1)} kg
                    </p>
                    {point.avg_7d && (
                      <p style={{ margin: 0, fontSize: '12px', color: '#818cf8', marginTop: '2px' }}>
                        Avg: {point.avg_7d.toFixed(1)} kg
                      </p>
                    )}
                  </div>
                );
              }
              return null;
            }}
          />
          {/* Daily points - muted */}
          <Line 
            type="monotone" 
            dataKey="weight_kg" 
            stroke="#3f3f46" 
            strokeWidth={1.5}
            dot={{ r: 3, fill: '#3f3f46', strokeWidth: 0 }}
            activeDot={false}
            isAnimationActive={false}
          />
          {/* 7-day average - emphasized */}
          <Line 
            type="monotone" 
            dataKey="avg_7d" 
            stroke="#818cf8" 
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 5, fill: '#818cf8', strokeWidth: 0 }}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
