import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const LEVEL_META = {
  Beginner:     { difficulty: 'Foundational' },
  Intermediate: { difficulty: 'Intermediate' },
  Advanced:     { difficulty: 'Advanced'     },
}

const ROADMAP_WEEKS = [
  { week: 1, title: 'Foundation Building',  hours: '4–6 hours',  tags: ['Core Concepts', 'Environment Setup', 'First Exercises'] },
  { week: 2, title: 'Practical Skills',     hours: '5–7 hours',  tags: ['Hands-on Projects', 'Problem Solving', 'Best Practices'] },
  { week: 3, title: 'Advanced Techniques',  hours: '6–8 hours',  tags: ['Complex Topics', 'Optimization', 'Code Review'] },
  { week: 4, title: 'Real-world Projects',  hours: '6–10 hours', tags: ['Portfolio Project', 'Debugging', 'Deployment'] },
]

function readOnboarding() {
  try {
    const raw = localStorage.getItem('onboarding')
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function SummaryCard({ icon, value, label }) {
  return (
    <div className="card" style={{
      padding: '28px 20px',
      textAlign: 'center',
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14,
    }}>
      <div style={{
        width: 48, height: 48,
        borderRadius: '50%',
        background: 'var(--surface2)',
        border: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 20, color: 'var(--accent)',
      }}>
        {icon}
      </div>
      <div>
        <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--text1)', lineHeight: 1.2, marginBottom: 4 }}>
          {value}
        </div>
        <div style={{ fontSize: 13, color: 'var(--text3)' }}>{label}</div>
      </div>
    </div>
  )
}

function RoadmapWeek({ week, title, hours, tags, isLast }) {
  return (
    <div style={{ display: 'flex', gap: 16 }}>
      {/* Timeline */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, width: 32 }}>
        <div style={{
          width: 32, height: 32, flexShrink: 0,
          borderRadius: '50%',
          border: '1.5px solid var(--accent)',
          background: 'var(--surface)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 13, fontWeight: 700, color: 'var(--accent)',
        }}>
          {week}
        </div>
        {!isLast && (
          <div style={{
            width: 1, flex: 1, minHeight: 20,
            background: 'var(--border2)',
            margin: '4px 0',
          }} />
        )}
      </div>

      {/* Week card */}
      <div style={{
        flex: 1,
        background: 'var(--surface2)',
        border: '1px solid var(--border)',
        borderRadius: 10,
        padding: '16px 20px',
        marginBottom: isLast ? 0 : 20,
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10, marginBottom: 6 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text1)' }}>
            Week {week}: {title}
          </div>
          <span style={{
            fontSize: 11, fontWeight: 600,
            color: 'var(--accent)',
            background: 'var(--accent-dim)',
            border: '1px solid var(--accent)',
            padding: '2px 9px',
            borderRadius: 999,
            flexShrink: 0,
          }}>
            upcoming
          </span>
        </div>
        <div style={{ fontSize: 12.5, color: 'var(--text3)', marginBottom: 12 }}>{hours}</div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {tags.map(tag => (
            <span key={tag} style={{
              fontSize: 12, fontWeight: 500,
              background: 'var(--surface3)',
              color: 'var(--text2)',
              border: '1px solid var(--border)',
              padding: '3px 10px',
              borderRadius: 999,
            }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.38, delay, ease: [0.16, 1, 0.3, 1] },
})

export default function LearningRoadmap() {
  const navigate = useNavigate()
  const data     = readOnboarding()

  const diff   = (LEVEL_META[data.currentLevel] ?? LEVEL_META.Beginner).difficulty
  const weekly = data.weeklyTime?.trim() || '1–3 hours/week'

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '48px 24px 64px',
    }}>
      {/* Header */}
      <motion.div {...fadeUp(0)} style={{ textAlign: 'center', marginBottom: 32 }}>
        <h1 style={{
          fontSize: 28, fontWeight: 800,
          color: 'var(--text1)',
          marginBottom: 10, lineHeight: 1.25,
          letterSpacing: '-0.3px',
        }}>
          Your Learning Roadmap
        </h1>
        <p style={{
          fontSize: 14.5, color: 'var(--text3)',
          lineHeight: 1.65, maxWidth: 500, margin: '0 auto',
        }}>
          A customized 4-week roadmap designed for your programming learning journey
        </p>
      </motion.div>

      {/* Three summary cards */}
      <motion.div
        {...fadeUp(0.08)}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 16,
          width: '100%', maxWidth: 680,
          marginBottom: 24,
        }}
      >
        <SummaryCard icon="◎" value={diff}    label="Difficulty Level" />
        <SummaryCard icon="⏱" value={weekly}  label="Study Time"       />
        <SummaryCard icon="↗" value="4 Weeks" label="Duration"         />
      </motion.div>

      {/* Roadmap card */}
      <motion.div
        {...fadeUp(0.14)}
        className="card"
        style={{
          width: '100%', maxWidth: 680,
          padding: '28px 32px',
          boxShadow: 'var(--shadow-md)',
          marginBottom: 36,
        }}
      >
        <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--text1)', marginBottom: 24 }}>
          Learning Roadmap
        </div>
        {ROADMAP_WEEKS.map((w, i) => (
          <RoadmapWeek
            key={w.week}
            {...w}
            isLast={i === ROADMAP_WEEKS.length - 1}
          />
        ))}
      </motion.div>

      {/* Start Learning */}
      <motion.div {...fadeUp(0.2)}>
        <button
          className="btn btn-accent btn-lg"
          onClick={() => navigate('/dashboard')}
          style={{ width: 240, fontWeight: 700, justifyContent: 'center' }}
        >
          Start Learning →
        </button>
      </motion.div>
    </div>
  )
}
