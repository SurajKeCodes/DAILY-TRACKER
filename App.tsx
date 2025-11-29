import React, { useState, useEffect } from 'react';
import { Rocket, LayoutDashboard, ListTodo, Lightbulb, Medal, CheckCircle2, Calendar as CalendarIcon, ChevronLeft, ChevronRight, Star, Moon, Sun } from 'lucide-react';
import { SCHEDULE_DATA, DAILY_ROUTINE, TOPPER_TIPS, DAILY_ADDONS } from './data';
import { ProgressBar } from './components/ProgressBar';
import { DailyRoutine } from './components/DailyRoutine';
import { ScheduleList } from './components/ScheduleList';
import { ScheduleDay } from './types';

const App: React.FC = () => {
  // --- State ---
  const [activeTab, setActiveTab] = useState<'tracker' | 'routine' | 'tips'>('routine');
  
  // Theme State
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('gate_tracker_theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Virtual Date State (Defaults to Start Date of Plan: Nov 29, 2025)
  const [currentDateStr, setCurrentDateStr] = useState<string>(() => {
    const saved = localStorage.getItem('gate_tracker_date');
    return saved || '2025-11-29';
  });

  const [completedTopicIds, setCompletedTopicIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('gate_tracker_topics');
    return saved ? JSON.parse(saved) : [];
  });

  const [completedRoutineIds, setCompletedRoutineIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('gate_tracker_routine');
    return saved ? JSON.parse(saved) : [];
  });

  const [completedAddOnIds, setCompletedAddOnIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('gate_tracker_addons');
    return saved ? JSON.parse(saved) : [];
  });

  // --- Effects ---
  useEffect(() => {
    localStorage.setItem('gate_tracker_date', currentDateStr);
  }, [currentDateStr]);

  useEffect(() => {
    localStorage.setItem('gate_tracker_topics', JSON.stringify(completedTopicIds));
  }, [completedTopicIds]);

  useEffect(() => {
    localStorage.setItem('gate_tracker_routine', JSON.stringify(completedRoutineIds));
  }, [completedRoutineIds]);

  useEffect(() => {
    localStorage.setItem('gate_tracker_addons', JSON.stringify(completedAddOnIds));
  }, [completedAddOnIds]);

  // Theme Effect
  useEffect(() => {
    const html = document.documentElement;
    if (isDarkMode) {
      html.classList.add('dark');
      localStorage.setItem('gate_tracker_theme', 'dark');
    } else {
      html.classList.remove('dark');
      localStorage.setItem('gate_tracker_theme', 'light');
    }
  }, [isDarkMode]);

  // --- Helpers ---
  const getActiveSchedule = (dateStr: string): ScheduleDay | null => {
    const date = new Date(dateStr);
    
    const parseRangeDate = (dayMonthStr: string): Date => {
       const [day, month] = dayMonthStr.split(' ');
       const monthMap: {[key: string]: number} = { 'Nov': 10, 'Dec': 11, 'Jan': 0, 'Feb': 1 };
       const mIndex = monthMap[month];
       const y = (mIndex === 10 || mIndex === 11) ? 2025 : 2026;
       return new Date(y, mIndex, parseInt(day));
    };

    return SCHEDULE_DATA.find(schedule => {
      const parts = schedule.dateRange.split(' - ');
      if (parts.length !== 2) return false;
      const start = parseRangeDate(parts[0]);
      const end = parseRangeDate(parts[1]);
      start.setHours(0,0,0,0);
      end.setHours(23,59,59,999);
      const current = new Date(dateStr);
      current.setHours(12,0,0,0);
      return current >= start && current <= end;
    }) || null;
  };

  const activeSchedule = getActiveSchedule(currentDateStr);

  const changeDate = (days: number) => {
    const date = new Date(currentDateStr);
    date.setDate(date.getDate() + days);
    setCurrentDateStr(date.toISOString().split('T')[0]);
  };

  const toggleTopic = (taskId: string) => {
    setCompletedTopicIds(prev => prev.includes(taskId) ? prev.filter(i => i !== taskId) : [...prev, taskId]);
  };

  const toggleRoutineItem = (id: string) => {
    setCompletedRoutineIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const toggleAddOnItem = (id: string) => {
    setCompletedAddOnIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const resetRoutine = () => {
    if(confirm("Start a new day? This will uncheck all daily tasks and add-ons.")) {
      setCompletedRoutineIds([]);
      setCompletedAddOnIds([]);
    }
  };

  // --- Derived Stats ---
  const totalTopics = SCHEDULE_DATA.reduce((acc, curr) => acc + curr.tasks.length, 0);
  const completedTopicsCount = completedTopicIds.length;
  const progressPercent = Math.round((completedTopicsCount / totalTopics) * 100);

  const totalDailyTasks = DAILY_ROUTINE.length + DAILY_ADDONS.length;
  const completedDailyTasks = completedRoutineIds.length + completedAddOnIds.length;
  const dailyTasksLeft = totalDailyTasks - completedDailyTasks;

  const formatDateReadable = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
  };

  // --- Views ---

  const renderHeader = () => (
    <header className="bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 dark:from-slate-900 dark:via-indigo-950 dark:to-slate-900 text-white pb-32 pt-10 px-6 relative overflow-hidden animate-gradient-x shadow-2xl transition-colors duration-500">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none animate-float">
        <Rocket size={300} />
      </div>
      <div className="absolute top-20 left-20 w-32 h-32 bg-pink-500 rounded-full blur-3xl opacity-20 animate-pulse-slow"></div>
      <div className="absolute bottom-10 right-1/3 w-64 h-64 bg-emerald-400 rounded-full blur-3xl opacity-10 animate-pulse"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex justify-between items-start mb-6">
           {/* Top Bar with Theme Toggle */}
           <div className="flex-1"></div>
           <button 
             onClick={() => setIsDarkMode(!isDarkMode)}
             className="bg-white/10 hover:bg-white/20 backdrop-blur-md p-2 rounded-full transition-all hover:rotate-12 hover:scale-110 shadow-lg border border-white/10"
             aria-label="Toggle Theme"
           >
             {isDarkMode ? <Sun className="text-amber-300" size={24} /> : <Moon className="text-indigo-200" size={24} />}
           </button>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="bg-white/20 backdrop-blur-sm border border-white/20 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1">
                 <Star size={12} className="fill-yellow-400 text-yellow-400" /> Target 2026
              </span>
              <span className="text-indigo-100 text-xs font-bold tracking-wide bg-indigo-800/30 px-2 py-1 rounded-md border border-indigo-400/30">
                29 NOV → 8 FEB
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-2 drop-shadow-md">
              GATE CSE <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-cyan-300">Master Plan</span>
            </h1>
            <p className="text-indigo-100 text-lg max-w-xl font-medium leading-relaxed">
              Your 70-day blueprint to glory. <span className="text-white font-bold bg-white/10 px-1 rounded">70-80+ Marks</span> locked.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 min-w-[220px] shadow-xl hover:bg-white/20 transition-colors group">
            <div className="flex items-center gap-2 mb-2 text-emerald-300">
              <Medal size={24} className="filter drop-shadow-lg" />
              <span className="font-bold text-sm uppercase tracking-wide">AIR 1 Potential</span>
            </div>
            <div className="text-5xl font-black text-white mb-1 tracking-tight group-hover:scale-105 transition-transform">{progressPercent}%</div>
            <div className="w-full bg-black/20 h-1.5 rounded-full overflow-hidden mt-2">
               <div className="bg-emerald-400 h-full rounded-full" style={{ width: `${progressPercent}%` }}></div>
            </div>
            <div className="text-xs text-indigo-200 mt-2 font-medium">Syllabus Completion</div>
          </div>
        </div>

        {/* Date Navigator & Status Bar */}
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-2 flex flex-col md:flex-row items-center justify-between shadow-2xl border border-white/20 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
          
          <div className="flex items-center justify-between w-full md:w-auto bg-black/20 rounded-xl p-1 md:mr-4 relative z-10">
             <button onClick={() => changeDate(-1)} className="p-3 hover:bg-white/10 rounded-xl transition-colors text-white hover:text-emerald-300">
               <ChevronLeft size={24} />
             </button>
             
             <div className="px-6 text-center">
               <div className="text-[10px] text-indigo-200 uppercase font-bold tracking-widest mb-0.5">Focus Date</div>
               <div className="text-white font-bold text-xl flex items-center justify-center gap-2">
                 {formatDateReadable(currentDateStr)}
               </div>
               
               {/* Hidden Date Input */}
               <input 
                 type="date" 
                 value={currentDateStr} 
                 onChange={(e) => setCurrentDateStr(e.target.value)}
                 className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
               />
             </div>

             <button onClick={() => changeDate(1)} className="p-3 hover:bg-white/10 rounded-xl transition-colors text-white hover:text-emerald-300">
               <ChevronRight size={24} />
             </button>
          </div>

          <div className="flex-1 flex items-center justify-between md:justify-end gap-8 px-6 py-3 w-full md:w-auto z-10">
            <div className="text-right">
               <div className="text-xs text-indigo-200 uppercase font-bold mb-1">Subject</div>
               <div className="text-white font-black text-xl leading-none tracking-tight">
                 {activeSchedule ? activeSchedule.subject : "Rest / Buffer"}
               </div>
            </div>
            
            <div className="h-10 w-px bg-white/20 hidden md:block"></div>

            <div className="text-right">
               <div className="text-xs text-indigo-200 uppercase font-bold mb-1">Pending</div>
               <div className="text-emerald-300 font-black text-xl leading-none tracking-tight">
                 {dailyTasksLeft === 0 ? "All Done! 🎉" : `${dailyTasksLeft} Tasks`}
               </div>
            </div>
          </div>
        </div>

      </div>
    </header>
  );

  const renderTabs = () => (
    <div className="max-w-4xl mx-auto px-4 -mt-12 relative z-20 mb-12">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 p-2 flex overflow-x-auto transition-colors duration-300">
        <button
          onClick={() => setActiveTab('routine')}
          className={`flex-1 flex items-center justify-center gap-2 py-4 px-4 rounded-xl text-sm font-bold transition-all whitespace-nowrap transform duration-200
            ${activeTab === 'routine' 
              ? 'bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-500 dark:to-indigo-500 text-white shadow-lg scale-105' 
              : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-slate-700 dark:hover:text-slate-200'}`}
        >
          <ListTodo size={20} /> Daily Routine
        </button>
        <button
          onClick={() => setActiveTab('tracker')}
          className={`flex-1 flex items-center justify-center gap-2 py-4 px-4 rounded-xl text-sm font-bold transition-all whitespace-nowrap transform duration-200
            ${activeTab === 'tracker' 
              ? 'bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-500 dark:to-cyan-500 text-white shadow-lg scale-105' 
              : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-slate-700 dark:hover:text-slate-200'}`}
        >
          <LayoutDashboard size={20} /> Full Schedule
        </button>
        <button
          onClick={() => setActiveTab('tips')}
          className={`flex-1 flex items-center justify-center gap-2 py-4 px-4 rounded-xl text-sm font-bold transition-all whitespace-nowrap transform duration-200
            ${activeTab === 'tips' 
              ? 'bg-gradient-to-r from-emerald-500 to-teal-500 dark:from-emerald-600 dark:to-teal-600 text-white shadow-lg scale-105' 
              : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-slate-700 dark:hover:text-slate-200'}`}
        >
          <Lightbulb size={20} /> Topper Tips
        </button>
      </div>
    </div>
  );

  const renderContent = () => {
    if (activeTab === 'tracker') {
      return (
        <div className="max-w-6xl mx-auto px-4 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <ScheduleList 
                schedule={SCHEDULE_DATA} 
                completedTasks={completedTopicIds} 
                toggleTask={toggleTopic} 
              />
            </div>
            <div className="space-y-6">
              <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-xl sticky top-6 transition-colors">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
                <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-6 flex items-center gap-2 text-lg mt-2">
                  <div className="bg-indigo-100 dark:bg-indigo-900/50 p-2 rounded-lg text-indigo-600 dark:text-indigo-400"><Medal size={20} /></div> Current Status
                </h3>
                <ProgressBar current={completedTopicsCount} total={totalTopics} label="Total Syllabus" />
                
                <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-700">
                  <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-4">Quick Stats</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl text-center border border-slate-100 dark:border-slate-700 hover:shadow-md transition-shadow">
                      <div className="text-3xl font-black text-indigo-600 dark:text-indigo-400">{completedTopicsCount}</div>
                      <div className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 mt-1">Topics Done</div>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl text-center border border-slate-100 dark:border-slate-700 hover:shadow-md transition-shadow">
                      <div className="text-3xl font-black text-slate-400 dark:text-slate-600">{totalTopics - completedTopicsCount}</div>
                      <div className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 mt-1">Topics Left</div>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                   <div className="text-xs text-indigo-900 dark:text-indigo-200 bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-2xl border border-indigo-100 dark:border-indigo-800/50 leading-relaxed font-medium">
                     <span className="block font-bold mb-1 text-indigo-600 dark:text-indigo-400">Weekly Rule:</span>
                     Every <strong>Sunday</strong> is Test Day (20-25 Qs). Don't skip analysis.
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (activeTab === 'routine') {
      return (
        <div className="max-w-6xl mx-auto px-4 pb-12">
           <DailyRoutine 
            routine={DAILY_ROUTINE} 
            completedIds={completedRoutineIds} 
            toggleRoutine={toggleRoutineItem}
            resetRoutine={resetRoutine}
            addOns={DAILY_ADDONS}
            completedAddOnIds={completedAddOnIds}
            toggleAddOn={toggleAddOnItem}
            activeSchedule={activeSchedule}
            completedTopicIds={completedTopicIds}
            onToggleTopic={toggleTopic}
            currentDateStr={formatDateReadable(currentDateStr)}
            currentDateRaw={currentDateStr}
            onDateChange={setCurrentDateStr}
           />
        </div>
      );
    }

    if (activeTab === 'tips') {
      return (
        <div className="max-w-4xl mx-auto px-4 pb-12 animate-slide-up">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TOPPER_TIPS.map((tip, idx) => (
              <div 
                key={idx} 
                className={`
                  group relative overflow-hidden p-8 rounded-3xl border-2 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl cursor-default
                  ${tip.highlight 
                    ? 'bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-900/20 dark:to-slate-800 border-emerald-100 dark:border-emerald-800 shadow-xl shadow-emerald-100/50 dark:shadow-none' 
                    : 'bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 hover:border-indigo-100 dark:hover:border-indigo-800'
                  }
                `}
              >
                {/* Background decorative blob for hover effect */}
                <div className={`absolute -right-10 -top-10 w-40 h-40 rounded-full blur-3xl transition-opacity duration-500 opacity-0 group-hover:opacity-20 ${tip.highlight ? 'bg-emerald-500' : 'bg-indigo-500'}`}></div>

                <div className="relative z-10">
                  <h3 className={`text-xl font-black mb-4 flex items-start gap-4 ${tip.highlight ? 'text-emerald-900 dark:text-emerald-300' : 'text-slate-800 dark:text-slate-100'}`}>
                    <span className={`
                      flex items-center justify-center w-10 h-10 rounded-xl text-lg font-bold shrink-0 transition-all duration-300 shadow-md
                      ${tip.highlight 
                        ? 'bg-emerald-500 text-white shadow-emerald-200 dark:shadow-none group-hover:scale-110 group-hover:rotate-3' 
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 group-hover:bg-slate-800 dark:group-hover:bg-slate-600 group-hover:text-white group-hover:scale-110'
                      }
                    `}>
                        {idx + 1}
                    </span>
                    {tip.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-medium pl-14">
                    {tip.content}
                  </p>
                </div>

                {tip.highlight && (
                   <div className="absolute bottom-4 right-4 text-emerald-100 dark:text-emerald-900/50 transform rotate-12 opacity-50 pointer-events-none group-hover:scale-110 transition-transform">
                      <Medal size={100} />
                   </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-12 bg-slate-900 dark:bg-black text-white p-10 rounded-[2rem] shadow-2xl relative overflow-hidden text-center group ring-4 ring-slate-100 dark:ring-slate-800">
             <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 z-0"></div>
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-50 animate-pulse"></div>
             
             {/* Floating Particles */}
             <div className="absolute top-10 left-10 w-3 h-3 bg-emerald-400 rounded-full animate-ping z-10"></div>
             <div className="absolute bottom-10 right-10 w-4 h-4 bg-purple-400 rounded-full animate-ping delay-700 z-10"></div>
             <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 dark:from-black dark:to-slate-900 z-0"></div>

             <div className="relative z-10">
               <h3 className="text-4xl md:text-5xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400">
                 "Trust The Process"
               </h3>
               <p className="text-slate-300 max-w-3xl mx-auto mb-10 text-xl leading-relaxed font-medium">
                 Marks grow slowly. <br className="md:hidden"/>
                 <span className="text-emerald-400 font-bold bg-emerald-400/10 px-2 rounded-lg mx-1">Day 15 → 35 marks</span> 
                 <span className="text-slate-500 mx-2">→</span>
                 <span className="text-emerald-400 font-bold bg-emerald-400/10 px-2 rounded-lg mx-1">Day 50 → 55 marks</span>
                 <br/>
                 Mock phase → 65-70+. Exam → 70-80+.
               </p>
               
               <div className="inline-block relative group/btn">
                  <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full blur opacity-75 group-hover/btn:opacity-100 transition duration-200 animate-pulse"></div>
                  <button className="relative bg-slate-900 dark:bg-slate-950 text-white text-lg font-bold px-10 py-4 rounded-full border border-emerald-500/30 flex items-center gap-3 hover:bg-slate-800 transition-colors">
                     <Rocket size={24} className="text-emerald-400 animate-bounce" />
                     YOU CAN DO THIS
                  </button>
               </div>
             </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen pb-12 font-sans selection:bg-emerald-300 selection:text-emerald-900">
      {renderHeader()}
      {renderTabs()}
      {renderContent()}
    </div>
  );
};

export default App;