import React from 'react';
import { DailyRoutineItem, DailyAddOn, ScheduleDay } from '../types';
import { CheckCircle2, Circle, Clock, Flame, ShieldCheck, Target, ArrowRight, BrainCircuit, Calendar, ChevronDown, Zap } from 'lucide-react';

interface DailyRoutineProps {
  routine: DailyRoutineItem[];
  completedIds: string[];
  toggleRoutine: (id: string) => void;
  resetRoutine: () => void;
  addOns: DailyAddOn[];
  completedAddOnIds: string[];
  toggleAddOn: (id: string) => void;
  activeSchedule: ScheduleDay | null;
  completedTopicIds: string[];
  onToggleTopic: (taskId: string) => void;
  currentDateStr: string;
  currentDateRaw: string;
  onDateChange: (date: string) => void;
}

export const DailyRoutine: React.FC<DailyRoutineProps> = ({ 
  routine, 
  completedIds, 
  toggleRoutine, 
  resetRoutine,
  addOns,
  completedAddOnIds,
  toggleAddOn,
  activeSchedule,
  completedTopicIds,
  onToggleTopic,
  currentDateStr,
  currentDateRaw,
  onDateChange
}) => {
  const categories: Array<'Morning' | 'Mid-Day' | 'Evening' | 'Night'> = ['Morning', 'Mid-Day', 'Evening', 'Night'];

  // Calculate hours
  const totalHours = routine.reduce((acc, curr) => acc + curr.duration, 0);
  const completedHours = routine
    .filter(r => completedIds.includes(r.id))
    .reduce((acc, curr) => acc + curr.duration, 0);
  
  const percentage = Math.round((completedHours / totalHours) * 100);
  const tasksLeft = routine.length - completedIds.length;

  // Helper to dynamically rename generic tasks based on schedule
  const getDynamicTaskName = (item: DailyRoutineItem) => {
    if (item.id === 'dr-3') {
       return activeSchedule ? `${activeSchedule.subject} (Core Study)` : "Study Session (General)";
    }
    if (item.id === 'dr-5') {
       return activeSchedule ? `${activeSchedule.subject} Revision + PYQs` : "General Revision + PYQs";
    }
    if (item.task.includes("Main Subject")) {
      return activeSchedule ? item.task.replace("Main Subject", activeSchedule.subject) : item.task.replace("Main Subject", "Study Session");
    }
    return item.task;
  };

  return (
    <div className="space-y-8 animate-slide-up">
      
      {/* Top Dashboard Card */}
      <div className="relative overflow-hidden rounded-3xl shadow-2xl group transition-all duration-500 hover:shadow-emerald-500/20 dark:hover:shadow-emerald-500/10 border border-slate-200/50 dark:border-slate-800">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-black z-0"></div>
        <div className="absolute inset-0 opacity-30 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-0 mix-blend-overlay"></div>
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-emerald-500/30 rounded-full blur-3xl animate-pulse z-0"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-indigo-500/30 rounded-full blur-3xl animate-pulse delay-1000 z-0"></div>

        <div className="relative z-10 p-8 text-white">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            
            {/* Left: Date & Title */}
            <div className="text-center md:text-left w-full md:w-auto">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-emerald-300 mb-3 border border-emerald-500/30 shadow-lg shadow-emerald-500/10">
                 <Zap size={12} className="fill-emerald-300" /> DAILY EXECUTION MODE
              </div>
              
              {/* Interactive Date Picker Display */}
              <div className="relative inline-block group mt-1">
                <div className="flex items-center gap-3 bg-white/5 hover:bg-white/10 px-5 py-3 rounded-2xl cursor-pointer transition-all border border-white/10 hover:border-emerald-400/50 hover:scale-[1.02]">
                  <div className="bg-gradient-to-br from-emerald-400 to-teal-600 p-2 rounded-lg text-white shadow-lg">
                    <Calendar size={20} />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Plan Date</div>
                    <div className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                       {currentDateStr}
                       <ChevronDown size={16} className="text-emerald-400 group-hover:translate-y-1 transition-transform" />
                    </div>
                  </div>
                </div>
                <input 
                  type="date" 
                  value={currentDateRaw} 
                  onChange={(e) => onDateChange(e.target.value)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                />
              </div>
            </div>

            {/* Center: Stats */}
            <div className="flex items-center gap-8 bg-white/5 rounded-2xl p-4 border border-white/5 backdrop-blur-sm">
              <div className="text-center">
                <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-b from-emerald-300 to-emerald-600 filter drop-shadow-sm">
                  {completedHours.toFixed(1)}<span className="text-lg text-slate-400 font-medium">h</span>
                </div>
                <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mt-1">Banked</div>
              </div>
              
              <div className="w-px h-12 bg-gradient-to-b from-transparent via-slate-600 to-transparent"></div>

              <div className="text-center">
                <div className="text-4xl font-black text-white filter drop-shadow-sm">{tasksLeft}</div>
                <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mt-1">Left</div>
              </div>
            </div>

            {/* Right: Radial Progress */}
            <div className="relative w-24 h-24 group-hover:scale-105 transition-transform duration-500">
               <svg className="w-full h-full transform -rotate-90 filter drop-shadow-[0_0_10px_rgba(16,185,129,0.3)]">
                <circle cx="48" cy="48" r="40" stroke="#1e293b" strokeWidth="8" fill="transparent" />
                <circle
                  cx="48" cy="48" r="40" stroke="url(#gradient)" strokeWidth="8" fill="transparent"
                  strokeDasharray={251} strokeDashoffset={251 - (251 * percentage) / 100}
                  strokeLinecap="round" className="transition-all duration-1000 ease-out"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#34d399" />
                    <stop offset="100%" stopColor="#10b981" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <span className="text-xl font-bold text-white">{percentage}%</span>
              </div>
            </div>
          </div>

          <button 
            onClick={resetRoutine}
            className="absolute top-4 right-4 text-[10px] bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 px-3 py-1 rounded-full transition-colors border border-red-500/20 backdrop-blur-sm"
          >
            Reset Day
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Schedule Targets */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Today's Specific Targets (Granular) */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-white dark:border-slate-800 shadow-lg dark:shadow-slate-900/50 overflow-hidden transition-all hover:shadow-xl hover:border-blue-200 dark:hover:border-blue-800">
             <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-800 px-6 py-4 border-b border-blue-100/50 dark:border-slate-700 flex justify-between items-center">
               <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                 <div className="bg-blue-500 text-white p-1.5 rounded-lg shadow-blue-500/30 shadow-md">
                   <Target size={18} />
                 </div>
                 Today's Targets
               </h3>
               {activeSchedule ? (
                 <span className="text-xs font-bold text-blue-600 dark:text-blue-300 bg-white dark:bg-slate-700 px-3 py-1 rounded-full shadow-sm border border-blue-100 dark:border-slate-600">
                   {activeSchedule.subject}
                 </span>
               ) : (
                 <span className="text-xs font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">Buffer Day</span>
               )}
             </div>
             
             <div className="p-6">
               {!activeSchedule ? (
                 <div className="text-center py-8 text-slate-400 bg-slate-50/50 dark:bg-slate-800/50 rounded-xl border border-dashed border-slate-200 dark:border-slate-700">
                   <Calendar size={48} className="mx-auto mb-3 opacity-20 text-slate-500" />
                   <p className="font-medium text-slate-500">No specific subject scheduled.</p>
                 </div>
               ) : (
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                   {activeSchedule.tasks.map((task, idx) => {
                     const taskId = `${activeSchedule.id}-task-${idx}`;
                     const isDone = completedTopicIds.includes(taskId);
                     
                     return (
                       <div 
                         key={taskId}
                         onClick={() => onToggleTopic(taskId)}
                         className={`
                           group flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer select-none relative overflow-hidden
                           ${isDone 
                             ? 'bg-blue-50/80 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800 shadow-inner' 
                             : 'bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-lg hover:-translate-y-0.5'
                           }
                         `}
                       >
                         {/* Progress bar effect on background when done */}
                         {isDone && <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500"></div>}
                         
                         <div className={`mt-0.5 transition-colors z-10 ${isDone ? 'text-blue-500 dark:text-blue-400 scale-110' : 'text-slate-300 dark:text-slate-600 group-hover:text-blue-400'}`}>
                           {isDone ? <CheckCircle2 size={20} className="fill-blue-100 dark:fill-blue-900/50" /> : <Circle size={20} />}
                         </div>
                         <span className={`text-sm font-medium z-10 transition-all ${isDone ? 'text-blue-800 dark:text-blue-200 line-through opacity-60' : 'text-slate-700 dark:text-slate-200'}`}>
                           {task}
                         </span>
                       </div>
                     )
                   })}
                 </div>
               )}
             </div>
          </div>

          {/* Timeline */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-8 rounded-2xl border border-white dark:border-slate-800 shadow-lg dark:shadow-slate-900/50">
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-8 flex items-center gap-3">
              <div className="bg-emerald-500 text-white p-1.5 rounded-lg shadow-emerald-500/30 shadow-md">
                 <Clock size={18} />
              </div>
              Timeline & Routine
            </h3>
            
            {categories.map((cat, idx) => {
               const items = routine.filter(r => r.category === cat);
               if (items.length === 0) return null;

               return (
                 <div key={cat} className="relative pl-8 mb-10 last:mb-0">
                   {/* Timeline Line */}
                   <div className="absolute left-[11px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-slate-200 to-slate-100 dark:from-slate-700 dark:to-slate-800 last:bottom-auto"></div>
                   
                   {/* Category Header */}
                   <div className="absolute left-0 top-0 w-6 h-6 rounded-full bg-white dark:bg-slate-800 border-4 border-slate-100 dark:border-slate-700 shadow-sm z-10 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-500"></div>
                   </div>
                   
                   <h3 className="text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-500 to-slate-400 dark:from-slate-400 dark:to-slate-500 uppercase tracking-widest mb-6 mt-1 pl-2">{cat}</h3>
                   
                   <div className="space-y-4">
                     {items.map((item, i) => {
                       const isDone = completedIds.includes(item.id);
                       const dynamicTask = getDynamicTaskName(item);
                       const isMainSubject = item.id === 'dr-3' && activeSchedule;
                       
                       return (
                         <div 
                           key={item.id}
                           onClick={() => toggleRoutine(item.id)}
                           className={`
                             group relative flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 overflow-hidden
                             ${isDone 
                               ? 'bg-emerald-50/50 dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-900/50 shadow-sm' 
                               : isMainSubject
                                 ? 'bg-gradient-to-r from-blue-50/30 to-white dark:from-blue-900/10 dark:to-slate-800 border-blue-200 dark:border-blue-800 hover:border-blue-400 hover:shadow-blue-100 dark:hover:shadow-blue-900/30 hover:shadow-xl hover:-translate-y-1'
                                 : 'bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 hover:border-emerald-300 dark:hover:border-emerald-600 hover:shadow-xl hover:-translate-y-1'
                             }
                           `}
                           style={{ animationDelay: `${i * 100}ms` }}
                         >
                           {/* Decorative Glow for Main Subject */}
                           {isMainSubject && !isDone && (
                             <div className="absolute -right-10 -top-10 w-20 h-20 bg-blue-400/20 dark:bg-blue-500/10 blur-2xl rounded-full group-hover:bg-blue-400/30 transition-all"></div>
                           )}

                           <div className={`transition-all duration-300 shrink-0 transform ${isDone ? 'text-emerald-500 dark:text-emerald-400 scale-110' : isMainSubject ? 'text-blue-400 dark:text-blue-400 group-hover:text-blue-600 dark:group-hover:text-blue-300 group-hover:scale-110' : 'text-slate-200 dark:text-slate-600 group-hover:text-emerald-400 group-hover:scale-110'}`}>
                             {isDone ? <CheckCircle2 size={26} className="fill-emerald-100 dark:fill-emerald-900/50" /> : <Circle size={26} />}
                           </div>
                           
                           <div className="flex-1 min-w-0 relative z-10">
                             <div className="flex flex-wrap gap-2 items-baseline mb-1">
                               <span className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded-full border ${isDone ? 'bg-emerald-100 dark:bg-emerald-900/30 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300' : isMainSubject ? 'bg-blue-100 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300' : 'bg-slate-100 dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-500 dark:text-slate-400'}`}>
                                 {item.time}
                               </span>
                               <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 flex items-center gap-1">
                                 {item.duration}h
                               </span>
                             </div>
                             <h4 className={`font-bold text-base md:text-lg transition-all ${isDone ? 'text-slate-400 dark:text-slate-500 line-through' : 'text-slate-800 dark:text-slate-100 group-hover:text-black dark:group-hover:text-white'}`}>
                               {dynamicTask}
                             </h4>
                             {item.details && (
                               <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 truncate group-hover:text-slate-600 dark:group-hover:text-slate-300">
                                 {item.details}
                               </p>
                             )}
                           </div>
                         </div>
                       );
                     })}
                   </div>
                 </div>
               );
            })}
          </div>
        </div>

        {/* Right Sidebar: Add-ons & Discipline */}
        <div className="space-y-6">
          <div className="bg-gradient-to-b from-indigo-50 to-white dark:from-slate-800 dark:to-slate-900 rounded-2xl p-6 border border-indigo-100 dark:border-slate-700 sticky top-6 shadow-xl shadow-indigo-100/50 dark:shadow-none">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-indigo-900 dark:text-indigo-300 flex items-center gap-2">
                <ShieldCheck className="text-indigo-600 dark:text-indigo-400" size={20} />
                Non-Negotiables
              </h3>
            </div>
            
            <div className="space-y-3">
              {addOns.map((addon, i) => {
                const isDone = completedAddOnIds.includes(addon.id);
                return (
                  <button
                    key={addon.id}
                    onClick={() => toggleAddOn(addon.id)}
                    className={`
                      w-full flex items-center justify-between p-3 rounded-xl border transition-all duration-300 group
                      ${isDone 
                        ? 'bg-indigo-100 dark:bg-indigo-900/30 border-indigo-200 dark:border-indigo-800 text-indigo-800 dark:text-indigo-300 shadow-inner' 
                        : 'bg-white dark:bg-slate-800 border-indigo-50 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-indigo-300 dark:hover:border-indigo-500 hover:shadow-lg hover:-translate-y-1'
                      }
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl filter drop-shadow-sm transform group-hover:scale-110 transition-transform">{addon.icon}</span>
                      <span className={`text-sm font-bold ${isDone ? 'line-through opacity-70' : ''}`}>{addon.label}</span>
                    </div>
                    {isDone && <CheckCircle2 size={18} className="text-indigo-600 dark:text-indigo-400" />}
                  </button>
                )
              })}
            </div>
            
            <div className="mt-8 pt-6 border-t border-indigo-200/50 dark:border-slate-700">
              <h4 className="text-xs font-bold text-indigo-900 dark:text-indigo-300 uppercase tracking-wider mb-3 flex items-center gap-2">
                <BrainCircuit size={14} /> Mistake Notebook
              </h4>
              <div className="bg-amber-50 dark:bg-amber-900/20 p-5 rounded-xl border border-amber-200 dark:border-amber-800/50 shadow-sm relative overflow-hidden group hover:shadow-amber-100 dark:hover:shadow-none hover:shadow-md transition-shadow">
                 <div className="absolute top-0 left-0 w-1 h-full bg-amber-400"></div>
                 <p className="text-xs text-slate-700 dark:text-slate-300 mb-3 italic font-medium">"Why did I make this mistake? Concept? Calculation?"</p>
                 <div className="flex items-center gap-2 text-[10px] font-bold text-amber-700 dark:text-amber-300 bg-white/50 dark:bg-black/30 w-fit px-3 py-1 rounded-full border border-amber-200 dark:border-amber-800">
                   Review before sleep
                 </div>
                 <div className="absolute -bottom-4 -right-4 text-amber-500 opacity-10">
                   <BrainCircuit size={80} />
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};