import React from 'react';
import { ScheduleDay } from '../types';
import { CheckSquare, Square, Calendar, Trophy, Zap, BookOpen, CheckCircle2, Circle } from 'lucide-react';
import { ProgressBar } from './ProgressBar';

interface ScheduleListProps {
  schedule: ScheduleDay[];
  completedTasks: string[]; // This now contains granular IDs like "p1-c-lang-task-0"
  toggleTask: (id: string) => void;
}

export const ScheduleList: React.FC<ScheduleListProps> = ({ schedule, completedTasks, toggleTask }) => {
  
  const renderPhase = (phaseNum: number, title: string, gradientClass: string, icon: React.ReactNode, borderColor: string) => {
    const phaseItems = schedule.filter(s => s.phase === phaseNum);

    return (
      <div className="mb-12 animate-slide-up">
        {/* Phase Header */}
        <div className={`relative overflow-hidden flex items-center gap-4 mb-8 p-6 rounded-2xl ${gradientClass} shadow-lg text-white`}>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          
          <div className="bg-white/20 backdrop-blur-md p-3 rounded-xl shadow-inner border border-white/20">
            {icon}
          </div>
          <h3 className="text-2xl font-black tracking-tight relative z-10 text-shadow-sm">{title}</h3>
        </div>

        <div className="space-y-8">
          {phaseItems.map((item, index) => {
            // Calculate progress for this module
            const totalModuleTasks = item.tasks.length;
            const completedModuleTasks = item.tasks.filter((_, idx) => completedTasks.includes(`${item.id}-task-${idx}`)).length;
            const isModuleComplete = totalModuleTasks > 0 && totalModuleTasks === completedModuleTasks;
            const progress = totalModuleTasks > 0 ? Math.round((completedModuleTasks / totalModuleTasks) * 100) : 0;

            return (
              <div 
                key={item.id} 
                className={`
                  relative overflow-hidden rounded-2xl bg-white dark:bg-slate-800 transition-all duration-300 group
                  ${isModuleComplete ? 'border-2 border-emerald-100 dark:border-emerald-900/50 opacity-80' : `border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-xl hover:${borderColor} dark:hover:${borderColor} hover:-translate-y-1`}
                `}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Background Decoration */}
                <div className="absolute -right-20 -top-20 w-40 h-40 bg-gradient-to-br from-slate-100 to-transparent dark:from-slate-700 dark:to-transparent rounded-full blur-3xl group-hover:from-blue-50 dark:group-hover:from-blue-900/20 transition-colors"></div>

                <div className="p-8">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                         <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600">
                           <Calendar size={12} /> {item.dateRange}
                         </span>
                         {item.isTestDay && (
                           <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 animate-pulse-slow">
                             TEST DAY
                           </span>
                         )}
                      </div>
                      <h4 className={`text-2xl font-bold ${isModuleComplete ? 'text-slate-400 dark:text-slate-600 line-through' : 'text-slate-800 dark:text-slate-100'}`}>
                        {item.subject}
                      </h4>
                      <div className="inline-block mt-2">
                        <span className={`text-xs font-bold px-2 py-1 rounded border uppercase tracking-wider ${isModuleComplete ? 'bg-slate-100 dark:bg-slate-700 text-slate-400 dark:text-slate-500 border-slate-200 dark:border-slate-600' : 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 border-indigo-100 dark:border-indigo-800'}`}>
                          {item.focus}
                        </span>
                      </div>
                    </div>
                    
                    <div className="w-full md:w-32 text-right">
                       <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-800 to-slate-500 dark:from-slate-200 dark:to-slate-400 mb-1">
                         {progress}%
                       </div>
                    </div>
                  </div>

                  <ProgressBar current={completedModuleTasks} total={totalModuleTasks} colorClass={isModuleComplete ? "bg-emerald-500" : gradientClass.replace("text-white", "")} />

                  <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-700">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {item.tasks.map((task, idx) => {
                        const taskId = `${item.id}-task-${idx}`;
                        const isTaskDone = completedTasks.includes(taskId);
                        
                        return (
                          <div 
                            key={taskId}
                            onClick={() => toggleTask(taskId)}
                            className={`
                              flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200
                              ${isTaskDone 
                                ? 'bg-emerald-50 dark:bg-emerald-900/20 text-slate-400 dark:text-slate-500' 
                                : 'hover:bg-slate-50 dark:hover:bg-slate-700 hover:translate-x-1'
                              }
                            `}
                          >
                            <div className={`mt-0.5 transition-transform ${isTaskDone ? 'text-emerald-500 dark:text-emerald-400 scale-110' : 'text-slate-300 dark:text-slate-600'}`}>
                              {isTaskDone ? <CheckCircle2 size={18} /> : <Circle size={18} />}
                            </div>
                            <span className={`text-sm font-medium ${isTaskDone ? 'line-through' : 'text-slate-600 dark:text-slate-300'}`}>
                              {task}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto pb-20">
      {renderPhase(1, "Phase 1: Foundation", "bg-gradient-to-r from-cyan-500 to-blue-600", <BookOpen size={24} />, "border-cyan-300")}
      {renderPhase(2, "Phase 2: High Weightage", "bg-gradient-to-r from-amber-500 to-orange-600", <Zap size={24} />, "border-amber-300")}
      {renderPhase(3, "Phase 3: Mocks & Mastery", "bg-gradient-to-r from-fuchsia-600 to-pink-600", <Trophy size={24} />, "border-pink-300")}
    </div>
  );
};