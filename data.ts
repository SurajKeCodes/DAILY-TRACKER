import { ScheduleDay, DailyRoutineItem, TopperTip, DailyAddOn } from './types';

export const SCHEDULE_DATA: ScheduleDay[] = [
  // --- PHASE 1 ---
  {
    id: 'p1-c-lang',
    phase: 1,
    dateRange: '29 Nov - 2 Dec',
    subject: 'C Programming',
    focus: 'FULL (Fast Mode)',
    tasks: [
      'Pointers',
      'Arrays & Strings',
      'Functions',
      'Structures',
      'Storage Classes',
      'File Handling',
      'Daily: 3 hrs Lectures + 20 MCQs',
      '30 Nov: Small Test 1 (Basics + Pointers)'
    ]
  },
  {
    id: 'p1-dsa-1',
    phase: 1,
    dateRange: '3 Dec - 6 Dec',
    subject: 'DSA (Part 1)',
    focus: 'FULL',
    tasks: [
      '3 Dec: Complexity + Arrays',
      '4 Dec: Linked Lists',
      '5 Dec: Stack + Queue',
      '6 Dec: Trees',
      'Daily: 3-4 hrs DSA + 20-30 PYQs'
    ]
  },
  {
    id: 'p1-dsa-2',
    phase: 1,
    dateRange: '7 Dec - 10 Dec',
    subject: 'DSA (Part 2)',
    focus: 'FULL',
    tasks: [
      '7 Dec: BST + Heap + Small Test 2',
      '8 Dec: Graphs (BFS/DFS)',
      '9 Dec: Dijkstra + MST',
      '10 Dec: DP Basics + DSA Full Subject Test'
    ],
    isTestDay: true
  },
  {
    id: 'p1-apt-1',
    phase: 1,
    dateRange: '11 Dec - 15 Dec',
    subject: 'Aptitude (Part 1)',
    focus: 'FULL',
    tasks: [
      '11 Dec: Series',
      '12 Dec: Percentages',
      '13 Dec: Ratios',
      '14 Dec: SI/CI + Small Test 3',
      '15 Dec: Time Speed Distance'
    ]
  },
  {
    id: 'p1-apt-2',
    phase: 1,
    dateRange: '16 Dec - 20 Dec',
    subject: 'Aptitude (Part 2)',
    focus: 'FULL',
    tasks: [
      '16 Dec: Time & Work',
      '17 Dec: Data Interpretation',
      '18 Dec: Logical Reasoning',
      '19 Dec: Venn Diagrams',
      '20 Dec: Revision + PYQs + Aptitude Full Test'
    ],
    isTestDay: true
  },

  // --- PHASE 2 ---
  {
    id: 'p2-os',
    phase: 2,
    dateRange: '21 Dec - 27 Dec',
    subject: 'Operating Systems',
    focus: 'IMPORTANT TOPICS ONLY',
    tasks: [
      'CPU Scheduling',
      'Deadlocks',
      'Semaphores',
      'Paging & Virtual Memory',
      '21 Dec: Small Test 4 (Scheduling + Deadlock)',
      '27 Dec: OS Important Topics Test'
    ],
    isTestDay: true
  },
  {
    id: 'p2-cn',
    phase: 2,
    dateRange: '28 Dec - 3 Jan',
    subject: 'Computer Networks',
    focus: 'IMPORTANT TOPICS ONLY',
    tasks: [
      'IP & Subnetting',
      'TCP vs UDP',
      'Congestion Control',
      'CRC & ARQ (Stop & Wait, SR, GBN)',
      'Routing (DV, LS)',
      '28 Dec: Small Test 5 (IP + Subnetting)',
      '3 Jan: CN Important Topics Test'
    ],
    isTestDay: true
  },
  {
    id: 'p2-dbms',
    phase: 2,
    dateRange: '4 Jan - 7 Jan',
    subject: 'DBMS',
    focus: 'IMPORTANT TOPICS ONLY',
    tasks: [
      'FDs & Normalization',
      'Joins',
      'Transactions',
      'Indexing',
      '5 Jan: Small Test 6 (FD + BCNF)',
      '7 Jan: DBMS Test'
    ],
    isTestDay: true
  },
  {
    id: 'p2-toc',
    phase: 2,
    dateRange: '8 Jan - 12 Jan',
    subject: 'Theory of Computation',
    focus: 'IMPORTANT TOPICS ONLY',
    tasks: [
      'Regular Languages & DFA/NFA',
      'CFG',
      'PDA (Concept only)',
      'Pumping Lemma',
      '11 Jan: Small Test 7 (DFA + CFG)',
      '12 Jan: TOC Test'
    ],
    isTestDay: true
  },
  {
    id: 'p2-dl',
    phase: 2,
    dateRange: '13 Jan - 17 Jan',
    subject: 'Digital Logic',
    focus: 'IMPORTANT TOPICS ONLY',
    tasks: [
      'Boolean Algebra & K-Map',
      'Combinational Circuits',
      'Sequential Circuits',
      'Counters',
      '13 Jan: Small Test 8 (K-Map)',
      '17 Jan: DL Test'
    ],
    isTestDay: true
  },
  {
    id: 'p2-compiler',
    phase: 2,
    dateRange: '18 Jan - 20 Jan',
    subject: 'Compiler Design',
    focus: 'IMPORTANT TOPICS ONLY',
    tasks: [
      'Lexical Analysis',
      'Parsing',
      'TAC',
      'Runtime Environment',
      '19 Jan: Compiler Small Test',
      '20 Jan: Compiler Test'
    ],
    isTestDay: true
  },

  // --- PHASE 3 ---
  {
    id: 'p3-mock-1',
    phase: 3,
    dateRange: '21 Jan - 23 Jan',
    subject: 'Mock Phase Start',
    focus: 'MOCK TESTS',
    tasks: [
      '21 Jan: Full Mock 1',
      '22 Jan: Analysis (Deep Dive)',
      '23 Jan: Full Mock 2'
    ],
    isTestDay: true
  },
  {
    id: 'p3-mock-2',
    phase: 3,
    dateRange: '24 Jan - 27 Jan',
    subject: 'Mocks & Revision',
    focus: 'MOCK TESTS',
    tasks: [
      '24 Jan: Revision',
      '25 Jan: Full Mock 3',
      '26 Jan: Revision',
      '27 Jan: Full Mock 4'
    ],
    isTestDay: true
  },
  {
    id: 'p3-mock-3',
    phase: 3,
    dateRange: '28 Jan - 31 Jan',
    subject: 'Subject Revisions',
    focus: 'MOCK TESTS',
    tasks: [
      '28 Jan: DSA + OS + CN Revision',
      '29 Jan: Full Mock 5',
      '30 Jan: DBMS + TOC + DL Revision',
      '31 Jan: Full Mock 6'
    ],
    isTestDay: true
  },
  {
    id: 'p3-final',
    phase: 3,
    dateRange: '1 Feb - 8 Feb',
    subject: 'Final Stretch',
    focus: 'CONFIDENCE',
    tasks: [
      '1 Feb: Maths + Aptitude Revision',
      '2 Feb: Full Mock 7',
      '3 Feb: Light Revision',
      '4 Feb: Full Mock 8',
      '5 Feb: Formula Sheet Revision',
      '6 Feb: Very Light Revision',
      '7 Feb: Rest + Confidence',
      '8 Feb: GATE EXAM DAY (AIR 1 Incoming)'
    ],
    isTestDay: true
  }
];

export const DAILY_ROUTINE: DailyRoutineItem[] = [
  { 
    id: 'dr-1', 
    time: '5:00 - 5:20 AM', 
    task: 'Wake up, freshen up, walk', 
    category: 'Morning',
    duration: 0.3,
    details: 'Small walk to wake up body'
  },
  { 
    id: 'dr-2', 
    time: '5:20 - 5:30 AM', 
    task: 'Review previous mistakes', 
    category: 'Morning',
    duration: 0.2,
    details: '10 min review of mistake notebook'
  },
  { 
    id: 'dr-3', 
    time: '5:30 - 7:30 AM', 
    task: 'Main Subject (Core Study)', 
    category: 'Morning',
    duration: 2.0,
    details: 'Focus on toughest chapter of the day'
  },
  { 
    id: 'dr-4', 
    time: '7:45 - 9:15 AM', 
    task: 'Continue Main Subject + PYQs', 
    category: 'Morning',
    duration: 1.5,
    details: 'Solve at least 20 PYQs now'
  },
  { 
    id: 'dr-5', 
    time: '10:00 - 12:00 PM', 
    task: 'Topic Revision + PYQs', 
    category: 'Mid-Day',
    duration: 2.0,
    details: '20-25 Questions Target'
  },
  { 
    id: 'dr-6', 
    time: '12:00 - 1:00 PM', 
    task: 'DSA Revision', 
    category: 'Mid-Day',
    duration: 1.0,
    details: '10-20 Questions (Arrays/Linked Lists)'
  },
  { 
    id: 'dr-7', 
    time: '4:00 - 5:00 PM', 
    task: 'Engineering Maths', 
    category: 'Evening',
    duration: 1.0,
    details: '1 hour daily is mandatory'
  },
  { 
    id: 'dr-8', 
    time: '5:00 - 6:00 PM', 
    task: 'Aptitude Practice', 
    category: 'Evening',
    duration: 1.0,
    details: '20-30 mins practice + quizzes'
  },
  { 
    id: 'dr-9', 
    time: '6:00 - 7:00 PM', 
    task: 'Watch Important Topic Videos', 
    category: 'Evening',
    duration: 1.0,
    details: 'OS / CN / DBMS / DL / TOC'
  },
  { 
    id: 'dr-10', 
    time: '8:00 - 9:00 PM', 
    task: 'Revision: Formulas + Notes', 
    category: 'Night',
    duration: 1.0,
    details: 'Fast revision of short notes'
  },
  { 
    id: 'dr-11', 
    time: '9:00 - 10:00 PM', 
    task: 'Test Review / Mistake Log', 
    category: 'Night',
    duration: 1.0,
    details: 'Fix mistakes of the day'
  },
];

export const DAILY_ADDONS: DailyAddOn[] = [
  { id: 'da-1', label: '20 Minute Walk', icon: '🏃' },
  { id: 'da-2', label: 'Drink Water Every 1 Hr', icon: '💧' },
  { id: 'da-3', label: 'No Phone Until 10 PM', icon: '📵' },
  { id: 'da-4', label: 'Sleep 7 Hours', icon: '😴' },
  { id: 'da-5', label: 'Updated Mistake Notebook', icon: '📓' }
];

export const TOPPER_TIPS: TopperTip[] = [
  {
    title: "10 Hours ≠ Success",
    content: "Correct 10 Hours = Success. Follow the split: 4h Core, 2h DSA/PYQ, 1h Apt, 1h Math, 1h Analysis, 1h Revision.",
    highlight: true
  },
  {
    title: "The Golden Rule",
    content: "Do NOT watch all lectures. Full lectures only for C, DSA, Aptitude. Important topics only for others.",
  },
  {
    title: "Mistake Notebook",
    content: "Every wrong question goes here. 'Why did I make this mistake?' Revise this before every mock.",
  },
  {
    title: "Last 20 Days",
    content: "NO NEW TOPICS after Jan 30. Pure revision + mocks only.",
    highlight: true
  },
  {
    title: "Consistency",
    content: "Motivation fails after 3 days. Routine never fails. Just show up.",
  }
];