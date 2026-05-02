import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageTransition from '../components/PageTransition.jsx'
import { CHAPTERS, COURSE_CATALOG } from '../data/mockData.js'

const CH_META = { c1: { weeks: 2 }, c2: { weeks: 1 }, c3: { weeks: 2 } }

const LEVEL_COLOR = {
  Beginner:     { bg: 'var(--primary-dim)', text: 'var(--primary)' },
  Intermediate: { bg: 'var(--accent-dim)',  text: 'var(--accent)'  },
  Advanced:     { bg: 'rgba(239,68,68,.1)', text: 'var(--danger)'  },
}

export default function CourseDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const course = COURSE_CATALOG.find(c => c.id === id) ?? COURSE_CATALOG[0]
  const lc = LEVEL_COLOR[course.level] ?? { bg: 'var(--surface2)', text: 'var(--text3)' }

  const [selectedChapter, setSelectedChapter] = useState('c1')

  const totalLessons = CHAPTERS.reduce((s, c) => s + c.lessons.length, 0)
  const doneLessons  = CHAPTERS.reduce((s, c) => s + c.lessons.filter(l => l.status === 'done').length, 0)
  const progress     = Math.round((doneLessons / totalLessons) * 100)

  return (
    <PageTransition>
      <div style={{ flex: 1, overflowY: 'auto', padding: '32px', background: 'var(--bg)' }}>
        <div style={{ maxWidth: 780, margin: '0 auto' }}>

          {/* Back */}
          <button
            className="btn btn-ghost btn-sm"
            style={{ marginBottom: 24 }}
            onClick={() => navigate('/courses')}
          >
            ← Back to Courses
          </button>

          {/* Course header */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'flex', alignItems: 'flex-start', gap: 20, marginBottom: 28 }}
          >
            <span style={{ fontSize: 52, lineHeight: 1, flexShrink: 0 }}>{course.icon}</span>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 999, background: lc.bg, color: lc.text }}>
                  {course.level}
                </span>
              </div>
              <h1 style={{ fontSize: 22, fontWeight: 800, color: 'var(--text1)', marginBottom: 6, lineHeight: 1.25 }}>
                {course.title}
              </h1>
              <div style={{ fontSize: 13, color: 'var(--text3)', display: 'flex', gap: 16 }}>
                <span>📚 {course.lessons} 堂課</span>
                <span>⏱️ {course.duration}</span>
                <span>📑 {CHAPTERS.length} 章節</span>
              </div>
            </div>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.32, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
            className="card"
            style={{ padding: '16px 20px', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 16 }}
          >
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5, color: 'var(--text3)', marginBottom: 7 }}>
                <span>Overall Progress</span>
                <span style={{ fontWeight: 600, color: 'var(--text2)' }}>{doneLessons} / {totalLessons} lessons</span>
              </div>
              <div style={{ background: 'var(--surface2)', borderRadius: 999, height: 7 }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  style={{ height: '100%', background: 'var(--accent)', borderRadius: 999 }}
                />
              </div>
            </div>
            <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--accent)', flexShrink: 0, minWidth: 40, textAlign: 'right' }}>
              {progress}%
            </div>
          </motion.div>

          {/* Course Curriculum card */}
          <motion.div
            className="card"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.32, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{ padding: '24px', boxShadow: 'var(--shadow-md)' }}
          >
            {/* Card header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text1)', margin: 0 }}>
                Course Curriculum
              </h2>
              <button
                className="btn btn-accent"
                onClick={() => navigate('/dashboard')}
                style={{ fontWeight: 700 }}
              >
                Start Learning →
              </button>
            </div>

            {/* Chapter cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {CHAPTERS.map((ch, i) => {
                const isSelected = ch.id === selectedChapter
                const meta = CH_META[ch.id] ?? { weeks: 1 }
                const chDone = ch.lessons.filter(l => l.status === 'done').length
                const isComplete = chDone === ch.lessons.length

                return (
                  <div
                    key={ch.id}
                    onClick={() => setSelectedChapter(ch.id)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 16,
                      padding: '16px 20px',
                      borderRadius: 10,
                      border: `1px solid ${isSelected ? 'var(--accent)' : 'var(--border)'}`,
                      background: isSelected ? 'var(--surface2)' : 'var(--surface)',
                      cursor: 'pointer',
                      transition: 'background 0.15s, border-color 0.15s',
                      boxShadow: isSelected ? '0 0 0 1px var(--accent)' : 'none',
                    }}
                    onMouseEnter={e => { if (!isSelected) e.currentTarget.style.background = 'var(--surface2)' }}
                    onMouseLeave={e => { if (!isSelected) e.currentTarget.style.background = 'var(--surface)' }}
                  >
                    {/* Circle number */}
                    <div style={{
                      width: 40, height: 40, borderRadius: '50%', flexShrink: 0,
                      background: isSelected ? 'var(--accent)' : 'var(--surface3)',
                      border: `2px solid ${isSelected ? 'var(--accent)' : 'var(--border2)'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 15, fontWeight: 800,
                      color: isSelected ? 'var(--accent-text)' : 'var(--text3)',
                      transition: 'background 0.15s, border-color 0.15s, color 0.15s',
                    }}>
                      {i + 1}
                    </div>

                    {/* Chapter icon + content */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1, minWidth: 0 }}>
                      <span style={{ fontSize: 20, flexShrink: 0 }}>{ch.icon}</span>
                      <div style={{ minWidth: 0 }}>
                        <div style={{
                          fontSize: 14, fontWeight: isSelected ? 700 : 600,
                          color: isSelected ? 'var(--text1)' : 'var(--text2)',
                          marginBottom: 3, lineHeight: 1.3,
                          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                        }}>
                          {ch.title}
                        </div>
                        <div style={{ fontSize: 12, color: 'var(--text4)' }}>
                          {ch.lessons.length} lessons &nbsp;•&nbsp; {meta.weeks} week{meta.weeks > 1 ? 's' : ''}
                        </div>
                      </div>
                    </div>

                    {/* Status icon */}
                    {isComplete ? (
                      <div style={{
                        width: 24, height: 24, borderRadius: '50%', flexShrink: 0,
                        background: 'var(--success)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 11, color: '#fff', fontWeight: 700,
                      }}>✓</div>
                    ) : (
                      <div style={{
                        width: 24, height: 24, borderRadius: '50%', flexShrink: 0,
                        border: `2px solid ${isSelected ? 'var(--accent)' : 'var(--border2)'}`,
                        transition: 'border-color 0.15s',
                      }} />
                    )}
                  </div>
                )
              })}
            </div>
          </motion.div>

        </div>
      </div>
    </PageTransition>
  )
}
