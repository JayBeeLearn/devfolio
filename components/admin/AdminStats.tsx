import React from 'react';

interface AdminStatsProps {
  visitCount: Record<string, number>;
}

const AdminStats: React.FC<AdminStatsProps> = ({ visitCount }) => {
  const totalVisits = (Object.values(visitCount) as number[]).reduce((a: number, b: number) => a + b, 0);
  const dailyHistory = Object.entries(visitCount).slice(-7);

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-lg text-center">
        <h4 className="text-zinc-500 uppercase text-xs font-bold tracking-widest mb-2">Total Visits</h4>
        <p className="text-5xl font-black">{totalVisits}</p>
      </div>
      <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-lg lg:col-span-3">
        <h4 className="text-zinc-500 uppercase text-xs font-bold tracking-widest mb-6">Daily Visitors (Last 7 Days)</h4>
        <div className="flex items-end justify-between h-40 gap-2">
          {dailyHistory.map(([date, count]) => (
            <div key={date} className="flex-1 flex flex-col items-center gap-2">
              <div 
                className="w-full bg-blue-500 rounded-t-lg transition-all" 
                style={{ height: `${Math.min(100, ((count as number) / 20) * 100)}%` }} 
              />
              <span className="text-[10px] font-mono text-zinc-500 rotate-45 mt-4">
                {date.split('-').slice(1).join('/')}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminStats;
