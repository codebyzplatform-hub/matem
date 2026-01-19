
import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, ReferenceDot } from 'recharts';
import { f, findCriticalPoints } from '../services/mathUtils';

const FunctionChart: React.FC = () => {
  const isDark = document.documentElement.classList.contains('dark');
  
  const data = useMemo(() => {
    const points = [];
    for (let x = -6; x <= 6; x += 0.1) {
      points.push({
        x: Number(x.toFixed(2)),
        y: Number(f(x).toFixed(4))
      });
    }
    return points;
  }, []);

  const criticalPoints = useMemo(() => findCriticalPoints([-6, 6]), []);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-slate-800 p-2 border border-slate-200 dark:border-slate-700 rounded-lg shadow-xl text-xs md:text-sm">
          <p className="font-bold text-slate-600 dark:text-slate-300">x: {payload[0].payload.x}</p>
          <p className="text-indigo-600 dark:text-indigo-400 font-bold">f(x): {payload[0].payload.y}</p>
        </div>
      );
    }
    return null;
  };

  const axisColor = isDark ? '#475569' : '#94a3b8';
  const gridColor = isDark ? '#1e293b' : '#e2e8f0';

  return (
    <div className="h-[300px] md:h-[400px] w-full bg-white dark:bg-slate-900/50 rounded-2xl py-2 md:p-4 shadow-inner border border-slate-100 dark:border-slate-800">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
          <XAxis 
            dataKey="x" 
            type="number" 
            domain={[-6, 6]} 
            ticks={[-6, -4, -2, 0, 2, 4, 6]} 
            stroke={axisColor}
            fontSize={10}
            tick={{ fill: axisColor }}
          />
          <YAxis stroke={axisColor} fontSize={10} tick={{ fill: axisColor }} />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine y={1} stroke={axisColor} strokeDasharray="5 5" />
          <ReferenceLine x={0} stroke={gridColor} strokeWidth={1} />
          <ReferenceLine y={0} stroke={gridColor} strokeWidth={1} />
          
          <Line 
            type="monotone" 
            dataKey="y" 
            stroke="#6366f1" 
            strokeWidth={3} 
            dot={false} 
            activeDot={{ r: 6, fill: '#6366f1', stroke: isDark ? '#000' : '#fff' }} 
          />

          {criticalPoints.map((pt, i) => (
            <ReferenceDot 
              key={i}
              x={pt.x} 
              y={pt.value} 
              r={5} 
              fill={pt.type === 'max' ? '#ef4444' : '#22c55e'} 
              stroke={isDark ? '#000' : '#fff'} 
              strokeWidth={2}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FunctionChart;
