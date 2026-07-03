export const CHAPTERS = [
  {
    id: 'c1', title: 'Security Foundations', icon: '🛡️',
    lessons: [
      { id: 'l1', title: 'Introduction to Cybersecurity', time: '12 min', status: 'active' },
      { id: 'l2', title: 'The CIA Triad',                 time: '15 min', status: 'done' },
      { id: 'l3', title: 'Threats, Vulnerabilities & Risk', time: '18 min', status: 'pending' },
      { id: 'l4', title: 'Setting Up a Security Lab',     time: '20 min', status: 'pending' },
      { id: 'l5', title: 'Common Attack Types',           time: '16 min', status: 'pending' },
      { id: 'l6', title: 'Defense in Depth',              time: '22 min', status: 'pending' },
    ],
  },
  {
    id: 'c2', title: 'Networks & Web Security', icon: '🌐',
    lessons: [
      { id: 'l7', title: 'Network Protocols & Traffic', time: '25 min', status: 'pending' },
      { id: 'l8', title: 'Web Vulnerabilities (OWASP)', time: '30 min', status: 'pending' },
      { id: 'l9', title: 'Authentication & Access Control', time: '20 min', status: 'pending' },
    ],
  },
  {
    id: 'c3', title: 'Offense & Defense', icon: '🎯',
    lessons: [
      { id: 'l10', title: 'Penetration Testing Basics',    time: '35 min', status: 'pending' },
      { id: 'l11', title: 'Incident Response & Forensics', time: '28 min', status: 'pending' },
      { id: 'l12', title: 'Capstone Security Project',     time: '60 min', status: 'pending' },
    ],
  },
]

export const ROADMAP_NODES = [
  { id: 'r1', title: 'Security Foundations',   desc: 'CIA triad, threats, risk, security mindset',   icon: '🛡️', status: 'done',   tags: ['Completed', '3 lessons'] },
  { id: 'r2', title: 'Network Security',       desc: 'Protocols, traffic analysis, firewalls',       icon: '🌐', status: 'done',   tags: ['Completed', '4 lessons'] },
  { id: 'r3', title: 'Web App Security',       desc: 'OWASP Top 10, XSS, SQL injection, CSRF',        icon: '🕸️', status: 'active', tags: ['In Progress', '5 lessons'] },
  { id: 'r4', title: 'Cryptography',           desc: 'Encryption, hashing, digital signatures, PKI',  icon: '🔐', status: 'locked', tags: ['Unlocks next', '6 lessons'] },
  { id: 'r5', title: 'Offensive Security',     desc: 'Pentesting, exploitation, privilege escalation', icon: '🎯', status: 'locked', tags: ['Locked', '5 lessons'] },
  { id: 'r6', title: 'Blue Team Capstone',     desc: 'Detection, incident response, hardening',       icon: '🏆', status: 'locked', tags: ['Locked', '1 project'] },
]

export const PLAN_WEEKS = [
  { week: 1, title: 'Foundations', tasks: [
    { label: 'Introduction to Cybersecurity', time: '12 min', status: 'done' },
    { label: 'Setting Up a Security Lab',      time: '15 min', status: 'done' },
    { label: 'CIA Triad Practice',             time: '20 min', status: 'done' },
  ]},
  { week: 2, title: 'Network Security', tasks: [
    { label: 'Packet Analysis',    time: '18 min', status: 'active' },
    { label: 'Firewall Rules',     time: '22 min', status: 'pending' },
    { label: 'Practice Exercise',  time: '25 min', status: 'pending' },
  ]},
  { week: 3, title: 'Web Security', tasks: [
    { label: 'OWASP Top 10',       time: '20 min', status: 'pending' },
    { label: 'SQL Injection Lab',  time: '25 min', status: 'pending' },
    { label: 'XSS Practice',       time: '18 min', status: 'pending' },
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

export const AI_WELCOME = "Welcome to cybersecurity! I'm your AI tutor. I'm here to help you understand concepts, answer questions, and guide you through hands-on labs. What would you like to explore today?"

export const AI_REPLIES = [
  "Great question! The CIA triad — Confidentiality, Integrity, Availability — is the foundation of security. Confidentiality keeps data secret, Integrity keeps it accurate and untampered, and Availability keeps it accessible when needed.",
  "XSS (Cross-Site Scripting) is when an attacker injects malicious scripts into a page other users view. The fix: validate input and escape/encode output. Never render untrusted user data as raw HTML.",
  "SQL injection happens when untrusted input is concatenated into a query. The defense is parameterized queries (prepared statements) — they separate code from data, so input can't change the query's logic.",
  "Hashing is a one-way function — you can't reverse it. Passwords should be stored as salted hashes (e.g., bcrypt), never in plain text, so a database leak doesn't directly expose them.",
  "Defense in depth means layering controls — firewall, patching, least privilege, monitoring — so if one layer fails, others still protect you. No single control should be your only line of defense.",
]
