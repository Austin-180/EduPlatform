import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

const LEVELS = ['Beginner', 'Intermediate', 'Advanced']

const TIME_OPTIONS = [
  '1–3 hours/week',
  '4–7 hours/week',
  '8–15 hours/week',
  '15+ hours/week',
]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.35, delay, ease: [0.16, 1, 0.3, 1] },
})

function OptionButton({ label, selected, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '11px 8px',
        borderRadius: 10,
        border: `1.5px solid ${selected ? 'var(--accent)' : 'var(--border2)'}`,
        background: selected ? 'var(--accent-dim)' : 'var(--surface2)',
        color: selected ? 'var(--text1)' : 'var(--text2)',
        fontFamily: 'inherit',
        fontSize: 13.5,
        fontWeight: selected ? 700 : 500,
        cursor: 'pointer',
        transition: 'all 0.14s ease',
        textAlign: 'center',
        width: '100%',
      }}
      onMouseEnter={e => {
        if (!selected) {
          e.currentTarget.style.borderColor = 'var(--border)'
          e.currentTarget.style.background = 'var(--surface3)'
        }
      }}
      onMouseLeave={e => {
        if (!selected) {
          e.currentTarget.style.borderColor = 'var(--border2)'
          e.currentTarget.style.background = 'var(--surface2)'
        }
      }}
    >
      {label}
    </button>
  )
}

export default function Questionnaire() {
  const navigate = useNavigate()
  const location = useLocation()
  const courseId = location.state?.courseId ?? null

  const [currentLevel, setCurrentLevel] = useState('')
  const [learningGoals, setLearningGoals] = useState('')
  const [weeklyTime, setWeeklyTime] = useState('')

  const canContinue = Boolean(currentLevel && weeklyTime)

  const handleContinue = () => {
    if (!canContinue) return
    localStorage.setItem('onboarding', JSON.stringify({
      courseId,
      currentLevel,
      learningGoals,
      weeklyTime,
    }))
    navigate('/learning-path-confirm')
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg)',
      display: 'flex',
      flexDirection: 'column',
      padding: '24px',
    }}>
      {/* Back */}
      <motion.div {...fadeUp(0)}>
        <button
          className="btn btn-ghost btn-sm"
          onClick={() => navigate('/courses')}
        >
          ← Back
        </button>
      </motion.div>

      {/* Centred content */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 16,
        paddingBottom: 40,
      }}>
        {/* Header */}
        <motion.div {...fadeUp(0.06)} style={{ textAlign: 'center', marginBottom: 32 }}>
          <h1 style={{
            fontSize: 28,
            fontWeight: 800,
            color: 'var(--text1)',
            marginBottom: 10,
            lineHeight: 1.25,
            letterSpacing: '-0.3px',
          }}>
            Tell Us About Yourself
          </h1>
          <p style={{
            fontSize: 14.5,
            color: 'var(--text3)',
            lineHeight: 1.65,
            maxWidth: 440,
            margin: '0 auto',
          }}>
            Help us customize your learning experience in programming
          </p>
        </motion.div>

        {/* Card */}
        <motion.div
          {...fadeUp(0.12)}
          className="card"
          style={{
            width: '100%',
            maxWidth: 560,
            padding: '36px 40px',
            boxShadow: 'var(--shadow-md)',
            display: 'flex',
            flexDirection: 'column',
            gap: 28,
          }}
        >
          {/* Section 1: Level */}
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text1)', marginBottom: 12 }}>
              What is your current level?
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
              {LEVELS.map(lvl => (
                <OptionButton
                  key={lvl}
                  label={lvl}
                  selected={currentLevel === lvl}
                  onClick={() => setCurrentLevel(lvl)}
                />
              ))}
            </div>
          </div>

          {/* Section 2: Goals */}
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text1)', marginBottom: 12 }}>
              What are your learning goals?
            </div>
            <textarea
              value={learningGoals}
              onChange={e => setLearningGoals(e.target.value)}
              placeholder="e.g. Build a personal project, prepare for a job interview, learn for fun..."
              rows={4}
              style={{
                width: '100%',
                padding: '12px 14px',
                background: 'var(--surface2)',
                border: `1.5px solid ${learningGoals ? 'var(--accent)' : 'var(--border2)'}`,
                borderRadius: 10,
                fontSize: 13.5,
                fontFamily: 'inherit',
                color: 'var(--text1)',
                resize: 'vertical',
                outline: 'none',
                lineHeight: 1.65,
                transition: 'border-color 0.15s',
              }}
              onFocus={e => { e.target.style.borderColor = 'var(--accent)' }}
              onBlur={e => { e.target.style.borderColor = learningGoals ? 'var(--accent)' : 'var(--border2)' }}
            />
          </div>

          {/* Section 3: Weekly time */}
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text1)', marginBottom: 12 }}>
              How much time can you commit weekly?
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
              {TIME_OPTIONS.map(opt => (
                <OptionButton
                  key={opt}
                  label={opt}
                  selected={weeklyTime === opt}
                  onClick={() => setWeeklyTime(opt)}
                />
              ))}
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: 'var(--border)', margin: '0 -4px' }} />

          {/* Continue */}
          <button
            className="btn btn-accent btn-lg"
            onClick={handleContinue}
            disabled={!canContinue}
            style={{ width: '100%', fontWeight: 700, justifyContent: 'center' }}
          >
            Continue →
          </button>
        </motion.div>
      </div>
    </div>
  )
}
