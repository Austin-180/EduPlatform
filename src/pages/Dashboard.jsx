import { useState } from 'react'
import CourseOutline from '../components/CourseOutline.jsx'
import CodeSandboxPanel from '../components/CodeSandboxPanel.jsx'
import ThemeToggle from '../components/ThemeToggle.jsx'
import FloatingAiChat from '../components/FloatingAiChat.jsx'
import { CHAPTERS } from '../data/mockData.js'

const TABS = [
  { id: 'summary', label: 'Summary' },
  { id: 'concepts', label: 'Concepts' },
  { id: 'mind-map', label: 'Mind Map' },
]

const LESSON_CONTENT = {
  l1: {
    summary: 'Programming is the process of writing instructions that a computer executes. Every program — from a calculator to an AI — is built from the same foundational ideas.',
    points: [
      'A program is a sequence of instructions executed top-to-bottom',
      'Variables store and label data so you can reference it later',
      'Functions package reusable logic under a single name',
      'Control flow (if/else, loops) lets programs react and repeat',
    ],
    note: 'Focus on the "why" behind each concept — it makes advanced topics much easier later.',
  },
  l2: {
    summary: 'Before writing code, you need the right tools. A well-configured environment reduces friction so you can focus on learning instead of fighting tooling.',
    points: [
      'Install a code editor (VS Code is the most popular choice)',
      'Install the language runtime for your target language',
      'Learn the terminal: running programs and reading output',
      'Error messages tell you exactly what went wrong — read them carefully',
    ],
    note: 'Spend time here. A broken environment doubles the time it takes to learn anything.',
  },
  l3: {
    summary: 'Every language shares a set of core building blocks. Master these and learning new languages becomes significantly faster.',
    points: [
      'Data types: numbers, strings, booleans, and collections',
      'Operators: arithmetic (+, -, ×, ÷) and comparison (==, >, <)',
      'Expressions produce values; statements perform actions',
      'Comments explain intent — write them for your future self',
    ],
    note: 'Type out every example by hand. Reading code and writing code use different parts of your brain.',
  },
  l4: {
    summary: 'Exercises bridge theory and practice. The first practical exercise reinforces the core concepts from the previous lessons through hands-on problem solving.',
    points: [
      'Read the problem statement fully before writing a single line',
      'Break the problem into smaller steps on paper first',
      'Test with simple inputs before edge cases',
      'A failing test tells you exactly what still needs fixing',
    ],
    note: 'Struggling with an exercise for 20 minutes teaches more than reading the solution immediately.',
  },
  l5: {
    summary: 'Variables are named containers that hold values. Data types define what kind of value a variable can store and what operations are valid on it.',
    points: [
      'Integers hold whole numbers; floats hold decimals',
      'Strings are sequences of characters, typically in quotes',
      'Booleans hold true or false — the basis of all logic',
      'Type errors occur when you mix incompatible types in an operation',
    ],
    note: 'Most bugs in beginner code come from unexpected types. When in doubt, print the type.',
  },
  l6: {
    summary: 'Control flow determines the order statements execute. Without it, every program would run the same way every time — which is rarely useful.',
    points: [
      'if/else branches execute different code based on a condition',
      'for loops repeat a block a known number of times',
      'while loops repeat until a condition becomes false',
      'break and continue give you fine-grained loop control',
    ],
    note: 'Trace through loops manually with small examples to build intuition before writing complex ones.',
  },
}

function getFallbackContent(lesson) {
  return {
    summary: 'This lesson\'s detailed content will appear here once available. Select a completed lesson to explore the material.',
    points: ['Content coming soon'],
    note: null,
    title: lesson?.title,
  }
}

function LessonContentPanel({ lessonId }) {
  let lesson = null
  for (const ch of CHAPTERS) {
    const found = ch.lessons.find(l => l.id === lessonId)
    if (found) { lesson = found; break }
  }
  const content = LESSON_CONTENT[lessonId] ?? getFallbackContent(lesson)

  return (
    <div style={{
      flex: 1,
      overflowY: 'auto',
      background: 'var(--surface)',
      borderRadius: '0 0 8px 8px',
      border: '1px solid var(--border)',
      borderTop: 'none',
      padding: '24px 28px',
    }}>
      {/* Title row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18, flexWrap: 'wrap' }}>
        <h2 style={{ fontSize: 17, fontWeight: 700, color: 'var(--text1)', margin: 0 }}>
          {content.title ?? lesson?.title ?? 'Lesson'}
        </h2>
        {lesson && (
          <span style={{
            fontSize: 11, fontWeight: 600,
            background: 'var(--accent)', color: 'var(--accent-text)',
            padding: '2px 9px', borderRadius: 20,
          }}>
            {lesson.time}
          </span>
        )}
      </div>

      {/* Summary */}
      <p style={{ fontSize: 13.5, lineHeight: 1.8, color: 'var(--text2)', margin: '0 0 20px' }}>
        {content.summary}
      </p>

      {/* Key Points */}
      <div style={{
        background: 'var(--bg)',
        border: '1px solid var(--border)',
        borderRadius: 8,
        padding: '16px 20px',
        marginBottom: 16,
      }}>
        <div style={{
          fontSize: 10.5, fontWeight: 700, color: 'var(--accent)',
          textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 14,
        }}>
          Key Points
        </div>
        <ul style={{ margin: 0, paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 11 }}>
          {content.points.map((pt, i) => (
            <li key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <span style={{ color: 'var(--accent)', fontWeight: 700, flexShrink: 0, marginTop: 1 }}>→</span>
              <span style={{ fontSize: 13.5, color: 'var(--text2)', lineHeight: 1.65 }}>{pt}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Note */}
      {content.note && (
        <div style={{
          background: 'var(--bg)',
          border: '1px solid var(--border)',
          borderLeft: '3px solid var(--accent)',
          borderRadius: '0 8px 8px 0',
          padding: '12px 16px',
        }}>
          <span style={{ fontSize: 13, color: 'var(--text3)', lineHeight: 1.7, fontStyle: 'italic' }}>
            💡 {content.note}
          </span>
        </div>
      )}
    </div>
  )
}

function PlaceholderPanel({ label }) {
  return (
    <div style={{
      flex: 1,
      background: 'var(--surface)',
      borderRadius: '0 0 8px 8px',
      border: '1px solid var(--border)',
      borderTop: 'none',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexDirection: 'column', gap: 8,
    }}>
      <span style={{ fontSize: 22, opacity: 0.3 }}>🚧</span>
      <span style={{ fontSize: 13, color: 'var(--text2)', fontWeight: 500 }}>{label} — Coming Soon</span>
    </div>
  )
}

export default function Dashboard() {
  const [activeLesson, setActiveLesson] = useState('l1')
  const [activeTab, setActiveTab] = useState('summary')

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden', background: 'var(--bg)' }}>
      {/* Top bar */}
      <header style={{
        height: 52, flexShrink: 0,
        background: 'var(--surface)',
        borderBottom: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 16px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 24, height: 24, borderRadius: 6, background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 13, color: 'var(--accent-text)' }}>E</div>
          <span style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--text1)' }}>EduPlatform</span>
        </div>
        <ThemeToggle />
      </header>

      {/* Three-column body */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden', padding: '12px', gap: '12px' }}>
        <CourseOutline
          chapters={CHAPTERS}
          activeLesson={activeLesson}
          onSelectLesson={setActiveLesson}
        />

        {/* Middle column: tabs + lesson content */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>
          {/* Tab bar */}
          <div style={{
            flexShrink: 0,
            display: 'flex', gap: 4,
            background: 'var(--surface)',
            borderRadius: '8px 8px 0 0',
            border: '1px solid var(--border)',
            borderBottom: 'none',
            padding: '0 8px',
          }}>
            {TABS.map(tab => {
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    padding: '10px 14px',
                    fontSize: 13, fontWeight: isActive ? 600 : 400,
                    color: isActive ? 'var(--accent)' : 'var(--text2)',
                    borderBottom: isActive ? '2px solid var(--accent)' : '2px solid transparent',
                    transition: 'color 0.15s, border-color 0.15s',
                    marginBottom: -1,
                  }}
                >
                  {tab.label}
                </button>
              )
            })}
          </div>

          {/* Tab content */}
          {activeTab === 'summary' && <LessonContentPanel lessonId={activeLesson} />}
          {activeTab === 'concepts' && <PlaceholderPanel label="Concepts" />}
          {activeTab === 'mind-map' && <PlaceholderPanel label="Mind Map" />}
        </div>

        <CodeSandboxPanel />
      </div>

      <FloatingAiChat />
    </div>
  )
}
