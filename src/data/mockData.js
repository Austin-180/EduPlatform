export const CHAPTERS = [
  {
    id: 'c1', title: 'Foundation & Core Concepts', icon: '📌',
    lessons: [
      { id: 'l1', title: 'Introduction to Core Concepts', time: '12 min', status: 'active' },
      { id: 'l2', title: 'Setting Up Your Environment',   time: '15 min', status: 'done' },
      { id: 'l3', title: 'Understanding the Basics',      time: '18 min', status: 'pending' },
      { id: 'l4', title: 'First Practical Exercise',      time: '20 min', status: 'pending' },
      { id: 'l5', title: 'Variables and Data Types',      time: '16 min', status: 'pending' },
      { id: 'l6', title: 'Control Flow and Logic',        time: '22 min', status: 'pending' },
    ],
  },
  {
    id: 'c2', title: 'Practical Application', icon: '🔧',
    lessons: [
      { id: 'l7', title: 'Functions and Modules',   time: '25 min', status: 'pending' },
      { id: 'l8', title: 'Object-Oriented Basics',  time: '30 min', status: 'pending' },
      { id: 'l9', title: 'Error Handling Patterns', time: '20 min', status: 'pending' },
    ],
  },
  {
    id: 'c3', title: 'Advanced Topics', icon: '🚀',
    lessons: [
      { id: 'l10', title: 'Algorithms & Data Structures', time: '35 min', status: 'pending' },
      { id: 'l11', title: 'Testing & Debugging',          time: '28 min', status: 'pending' },
      { id: 'l12', title: 'Final Project',                time: '60 min', status: 'pending' },
    ],
  },
]

export const ROADMAP_NODES = [
  { id: 'r1', title: 'Foundation Concepts', desc: 'Variables, data types, basic syntax',           icon: '📌', status: 'done',   tags: ['Completed', '3 lessons'] },
  { id: 'r2', title: 'Control Flow',        desc: 'Conditionals, loops, iteration patterns',        icon: '🔀', status: 'done',   tags: ['Completed', '4 lessons'] },
  { id: 'r3', title: 'Functions & Modules', desc: 'Defining functions, scope, reusability',         icon: '🧩', status: 'active', tags: ['In Progress', '5 lessons'] },
  { id: 'r4', title: 'OOP Fundamentals',    desc: 'Classes, objects, inheritance, encapsulation',   icon: '📦', status: 'locked', tags: ['Unlocks next', '6 lessons'] },
  { id: 'r5', title: 'Data Structures',     desc: 'Lists, dicts, trees, graphs',                   icon: '🗂️', status: 'locked', tags: ['Locked', '5 lessons'] },
  { id: 'r6', title: 'Final Capstone',      desc: 'Build a real project from scratch',             icon: '🏆', status: 'locked', tags: ['Locked', '1 project'] },
]

export const PLAN_WEEKS = [
  { week: 1, title: 'Foundations', tasks: [
    { label: 'Introduction to Core Concepts', time: '12 min', status: 'done' },
    { label: 'Setting Up Environment',         time: '15 min', status: 'done' },
    { label: 'Variables Practice',             time: '20 min', status: 'done' },
  ]},
  { week: 2, title: 'Control Flow', tasks: [
    { label: 'If/Else Statements', time: '18 min', status: 'active' },
    { label: 'Loops & Iteration',  time: '22 min', status: 'pending' },
    { label: 'Practice Exercise',  time: '25 min', status: 'pending' },
  ]},
  { week: 3, title: 'Functions', tasks: [
    { label: 'Defining Functions', time: '20 min', status: 'pending' },
    { label: 'Recursion Basics',   time: '25 min', status: 'pending' },
    { label: 'Lambda & Closures',  time: '18 min', status: 'pending' },
  ]},
]

export const COURSE_CATALOG = [
  { id: 'fundamentals', title: 'Cybersecurity Fundamentals', icon: '🛡️', level: 'Beginner',     lessons: 12, duration: '4h 30m', progress: 20 },
  { id: 'network',      title: 'Network Security',           icon: '🌐', level: 'Beginner',     lessons: 15, duration: '5h 15m', progress: 0  },
  { id: 'web',          title: 'Web Application Security',    icon: '🕸️', level: 'Intermediate', lessons: 18, duration: '6h 45m', progress: 0  },
  { id: 'redblue',      title: 'Red vs Blue Team',           icon: '🎯', level: 'Advanced',     lessons: 20, duration: '8h 00m', progress: 0  },
  { id: 'crypto',       title: 'Cryptography Essentials',    icon: '🔐', level: 'Intermediate', lessons: 16, duration: '6h 00m', progress: 0  },
  { id: 'social',       title: 'Social Engineering',         icon: '🎭', level: 'Beginner',     lessons: 10, duration: '3h 30m', progress: 0  },
]

export const AI_WELCOME = "Welcome to programming! I'm your AI tutor. I'm here to help you understand concepts, answer questions, and guide you through practice exercises. What would you like to explore today?"

export const AI_REPLIES = [
  "Great question! A function is a reusable block of code that performs a specific task. Think of it like a recipe — define it once, call it many times. This keeps code DRY and easy to debug.",
  "Recursion is when a function calls itself. The key is always having a base case — a stopping condition. Without it you'd get infinite recursion and a stack overflow. Classic: `factorial(n) = n × factorial(n-1)`.",
  "Variables are named containers for values. In Python, types are inferred: `x = 5` creates an integer, `name = 'Alice'` creates a string. No explicit declaration needed!",
  "For loops, think about three things: (1) starting value, (2) stopping condition, (3) how it changes each step. Getting any wrong leads to infinite loops. Try: `for i in range(10): print(i)`",
  "OOP organizes code into objects combining data (attributes) and behavior (methods). The four pillars: Encapsulation, Abstraction, Inheritance, and Polymorphism.",
]
