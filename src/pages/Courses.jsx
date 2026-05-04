import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageTransition from '../components/PageTransition.jsx'
import { COURSE_CATALOG } from '../data/mockData.js'

const DESCRIPTIONS = {
  python:  'Learn Python from scratch with hands-on exercises and AI-guided feedback.',
  js:      'Build dynamic web experiences with modern JavaScript fundamentals.',
  dsa:     'Master algorithms and data structures for technical interviews.',
  react:   'Build modern web apps with React hooks, components, and state.',
  ml:      'Explore machine learning concepts with practical Python examples.',
  system:  'Learn scalable system design patterns used at top tech companies.',
}

export default function Courses() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState(null)

  return (
    <PageTransition>
      <div style={{ flex: 1, overflowY: 'auto', padding: '32px', background: 'var(--bg)' }}>
        <div style={{ maxWidth: 880, margin: '0 auto' }}>

          {/* Back */}
          <button className="btn btn-ghost btn-sm" style={{ marginBottom: 32 }} onClick={() => navigate('/')}>
            ← Back
          </button>

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <h1 style={{ fontSize: 28, fontWeight: 800, color: 'var(--text1)', marginBottom: 10, lineHeight: 1.25 }}>
              Choose Your Learning Path
            </h1>
            <p style={{ fontSize: 14.5, color: 'var(--text3)', lineHeight: 1.65, maxWidth: 480, margin: '0 auto' }}>
              Select a course to begin your personalized AI learning journey.
            </p>
          </div>

          {/* 3 × 2 grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 40 }}>
            {COURSE_CATALOG.map((course, i) => {
              const isSelected = selected === course.id
              return (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.28, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => setSelected(course.id)}
                  style={{
                    padding: '20px',
                    borderRadius: 12,
                    border: `1px solid ${isSelected ? 'var(--accent)' : 'var(--border)'}`,
                    background: isSelected ? 'var(--surface2)' : 'var(--surface)',
                    cursor: 'pointer',
                    transition: 'background 0.12s, border-color 0.12s',
                    boxShadow: isSelected ? '0 0 0 1px var(--accent), var(--shadow-sm)' : 'var(--shadow-sm)',
                  }}
                  onMouseEnter={e => { if (!isSelected) e.currentTarget.style.background = 'var(--surface2)' }}
                  onMouseLeave={e => { if (!isSelected) e.currentTarget.style.background = 'var(--surface)' }}
                >
                  <div style={{ fontSize: 32, marginBottom: 12, lineHeight: 1 }}>{course.icon}</div>
                  <div style={{ fontSize: 14.5, fontWeight: 700, color: 'var(--text1)', marginBottom: 8, lineHeight: 1.3 }}>
                    {course.title}
                  </div>
                  <div style={{ fontSize: 12.5, color: 'var(--text3)', lineHeight: 1.6, marginBottom: 14 }}>
                    {DESCRIPTIONS[course.id] ?? `${course.lessons} lessons · ${course.duration}`}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{
                      fontSize: 10.5, fontWeight: 700, padding: '2px 8px', borderRadius: 999,
                      background: isSelected ? 'var(--accent-dim)' : 'var(--surface3)',
                      color: isSelected ? 'var(--accent)' : 'var(--text4)',
                      border: `1px solid ${isSelected ? 'var(--accent)' : 'var(--border)'}`,
                      transition: 'all 0.12s',
                    }}>{course.level}</span>
                    <span style={{ fontSize: 11.5, color: 'var(--text4)' }}>{course.lessons} lessons</span>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Continue */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button
              className="btn btn-accent btn-lg"
              onClick={() => { if (selected) navigate('/questionnaire', { state: { courseId: selected } }) }}
              disabled={!selected}
              style={{
                width: 220, fontWeight: 700, justifyContent: 'center',
                opacity: selected ? 1 : 0.38,
                cursor: selected ? 'pointer' : 'not-allowed',
                transition: 'opacity 0.15s',
              }}
            >
              Continue →
            </button>
          </div>

        </div>
      </div>
    </PageTransition>
  )
}
