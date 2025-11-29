export interface TaskItem {
  id: string;
  label: string;
}

export interface ScheduleDay {
  id: string;
  dateRange: string;
  subject: string;
  focus: string; // "High Focus", "Revision", etc.
  tasks: string[];
  isTestDay?: boolean;
  phase: number;
}

export interface DailyRoutineItem {
  id: string;
  time: string;
  task: string;
  category: 'Morning' | 'Mid-Day' | 'Evening' | 'Night';
  duration: number; // in hours
  details?: string;
}

export interface DailyAddOn {
  id: string;
  label: string;
  icon?: string;
}

export interface TopperTip {
  title: string;
  content: string;
  highlight?: boolean;
}