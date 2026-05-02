import { useState } from 'react'
import CourseOutline from '../components/CourseOutline.jsx'
import TutorChat from '../components/TutorChat.jsx'
import CodeSandboxPanel from '../components/CodeSandboxPanel.jsx'
import ThemeToggle from '../components/ThemeToggle.jsx'
import { CHAPTERS, AI_WELCOME, AI_REPLIES } from '../data/mockData.js'

const INITIAL_MESSAGES = [{ role: 'ai', text: AI_WELCOME }]

export default function Dashboard() {
  const [activeLesson, setActiveLesson] = useState('l1')
  const [messages, setMessages] = useState(INITIAL_MESSAGES)

  const handleSend = text => {
    setMessages(prev => [...prev, { role: 'user', text }])
    const reply = AI_REPLIES[Math.floor(Math.random() * AI_REPLIES.length)]
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'ai', text: reply }])
    }, 700)
  }

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
        <TutorChat
          messages={messages}
          onSend={handleSend}
        />
        <CodeSandboxPanel />
      </div>
    </div>
  )
}
