import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const LEARN_ITEMS = [
  'Core concepts and fundamentals',
  'Hands-on projects and practical applications',
  'Best practices and industry standards',
  'Real-world problem-solving techniques',
]

const LEVEL_META = {
  Beginner:     { track: 'Foundational programming', difficulty: 'Foundational', duration: '12–16 weeks' },
  Intermediate: { track: 'Intermediate programming', difficulty: 'Intermediate', duration: '8–12 weeks'  },
  Advanced:     { track: 'Advanced programming',     difficulty: 'Advanced',     duration: '6–10 weeks'  },
}

const FALLBACK = {
  difficulty: 'Foundational',
  track:      'Foundational programming',
  duration:   '12–16 weeks',
  weeklyTime: '1–3 hours/week',
  goals:      'Build a strong foundation in programming and develop practical coding skills.',
}

function readOnboarding() {
  try {
    const raw = localStorage.getItem('onboarding')
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function Divider() {
  return <div style={{ height: 1, background: 'var(--border)' }} />
}

function InfoBlock({ icon, label, value }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, flex: 1, minWidth: 160 }}>
      <div style={{
        width: 44, height: 44, flexShrink: 0,
        background: 'var(--surface2)',
        border: '1px solid var(--border)',
        borderRadius: 10,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 19, color: 'var(--accent)',
      }}>
        {icon}
      </div>
      <div>
        <div style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--text1)', marginBottom: 2 }}>{label}</div>
        <div style={{ fontSize: 13, color: 'var(--text3)' }}>{value}</div>
      </div>
    </div>
  )
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

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.38, delay, ease: [0.16, 1, 0.3, 1] },
})

export default function LearningPathConfirm() {
  const navigate = useNavigate()
  const data     = readOnboarding()

  const meta   = LEVEL_META[data.currentLevel] ?? LEVEL_META.Beginner
  const track  = meta.track      ?? FALLBACK.track
  const diff   = meta.difficulty ?? FALLBACK.difficulty
  const dur    = meta.duration   ?? FALLBACK.duration
  const weekly = data.weeklyTime?.trim() || FALLBACK.weeklyTime
  const goals  = data.learningGoals?.trim() || FALLBACK.goals

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '48px 24px 64px',
    }}>
      {/* Check icon */}
      <motion.div
        initial={{ opacity: 0, scale: 0.65 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{
          width: 60, height: 60,
          borderRadius: '50%',
          border: '2px solid var(--accent)',
          background: 'var(--surface)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 22, color: 'var(--accent)',
          marginBottom: 24,
          boxShadow: '0 0 0 6px var(--accent-dim)',
        }}
      >
        ✓
      </motion.div>

      {/* Header */}
      <motion.div
        {...fadeUp(0.08)}
        style={{ textAlign: 'center', marginBottom: 32 }}
      >
        <h1 style={{
          fontSize: 28, fontWeight: 800,
          color: 'var(--text1)',
          marginBottom: 10, lineHeight: 1.25,
          letterSpacing: '-0.3px',
        }}>
          Your Personalized Learning Path
        </h1>
        <p style={{
          fontSize: 14.5, color: 'var(--text3)',
          lineHeight: 1.65, maxWidth: 480, margin: '0 auto',
        }}>
          Based on your responses, we've crafted a custom curriculum for you
        </p>
      </motion.div>

      {/* Main card */}
      <motion.div
        {...fadeUp(0.14)}
        className="card"
        style={{
          width: '100%', maxWidth: 680,
          padding: '32px 36px',
          boxShadow: 'var(--shadow-md)',
          display: 'flex', flexDirection: 'column', gap: 22,
          marginBottom: 24,
        }}
      >
        <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--text1)' }}>
          Recommended Track: {track}
        </div>

        <Divider />

        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <InfoBlock icon="◎" label="Difficulty Level"   value={diff}   />
          <InfoBlock icon="⏱" label="Estimated Duration" value={dur}    />
          <InfoBlock icon="↗" label="Weekly Commitment"  value={weekly} />
        </div>

        <Divider />

        <div>
          <div style={{ fontSize: 14.5, fontWeight: 700, color: 'var(--text1)', marginBottom: 12 }}>
            Your Goals
          </div>
          <div style={{
            background: 'var(--surface2)',
            border: '1px solid var(--border)',
            borderRadius: 10,
            padding: '14px 16px',
            fontSize: 13.5, color: 'var(--text2)',
            lineHeight: 1.7, minHeight: 52,
          }}>
            {goals}
          </div>
        </div>

        <div>
          <div style={{ fontSize: 14.5, fontWeight: 700, color: 'var(--text1)', marginBottom: 14 }}>
            What You'll Learn
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {LEARN_ITEMS.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{
                  width: 22, height: 22, flexShrink: 0,
                  borderRadius: '50%',
                  border: '1.5px solid var(--accent)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 11, fontWeight: 800, color: 'var(--accent)',
                }}>
                  ✓
                </span>
                <span style={{ fontSize: 13.5, color: 'var(--text2)' }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Three summary cards */}
      <motion.div
        {...fadeUp(0.2)}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 16,
          width: '100%', maxWidth: 680,
          marginBottom: 36,
        }}
      >
        <SummaryCard icon="◎" value={diff}    label="Difficulty Level" />
        <SummaryCard icon="⏱" value={weekly}  label="Study Time"       />
        <SummaryCard icon="↗" value="4 Weeks" label="Duration"         />
      </motion.div>

      {/* View Study Plan → goes to roadmap */}
      <motion.div {...fadeUp(0.26)}>
        <button
          className="btn btn-accent btn-lg"
          onClick={() => navigate('/learning-roadmap')}
          style={{ width: 240, fontWeight: 700, justifyContent: 'center' }}
        >
          View Study Plan
        </button>
      </motion.div>
    </div>
  )
}
