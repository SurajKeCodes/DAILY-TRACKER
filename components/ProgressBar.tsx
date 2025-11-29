import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
  label?: string;
  colorClass?: string; // e.g. "bg-emerald-500"
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ current, total, label, colorClass = "bg-gradient-to-r from-violet-500 to-fuchsia-500" }) => {
  const percentage = Math.round((current / total) * 100) || 0;

  return (
    <div className="w-full group">
      <div className="flex justify-between mb-2">
        {label && <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{label}</span>}
        <span className="text-sm font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-pink-600 dark:from-violet-400 dark:to-pink-400">{percentage}%</span>
      </div>
      <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-3 shadow-inner overflow-hidden border border-slate-200 dark:border-slate-600">
        <div 
          className={`h-full rounded-full transition-all duration-1000 ease-out relative overflow-hidden ${colorClass}`}
          style={{ width: `${percentage}%` }}
        >
           {/* Shimmer Effect */}
           <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
        </div>
      </div>
      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};