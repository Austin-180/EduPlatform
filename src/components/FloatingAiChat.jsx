import { useState, useRef, useEffect } from 'react'
import { AI_WELCOME, AI_REPLIES } from '../data/mockData.js'

const INITIAL_MESSAGES = [{ role: 'ai', text: AI_WELCOME }]

export default function FloatingAiChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState(INITIAL_MESSAGES)
  const [input, setInput] = useState('')
  const endRef = useRef(null)

  useEffect(() => {
    if (isOpen) endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isOpen])

  const handleSend = () => {
    if (!input.trim()) return
    const text = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', text }])
    const reply = AI_REPLIES[Math.floor(Math.random() * AI_REPLIES.length)]
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'ai', text: reply }])
    }, 700)
  }

  return (
    <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 100 }}>
      {/* Chat window */}
      <div
        aria-hidden={!isOpen}
        style={{
          position: 'absolute',
          bottom: 64,
          right: 0,
          width: 320,
          height: 420,
          display: 'flex',
          flexDirection: 'column',
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 14,
          boxShadow: '0 8px 32px rgba(0,0,0,0.22)',
          overflow: 'hidden',
          opacity: isOpen ? 1 : 0,
          transform: isOpen ? 'translateY(0)' : 'translateY(14px)',
          pointerEvents: isOpen ? 'auto' : 'none',
          transition: 'opacity 0.2s ease, transform 0.2s ease',
        }}
      >
        {/* Header */}
        <div style={{
          padding: '11px 14px',
          background: 'var(--accent)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 15 }}>✨</span>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent-text)', lineHeight: 1.2 }}>AI Tutor</div>
              <div style={{ fontSize: 10.5, color: 'var(--accent-text)', opacity: 0.75 }}>Ask anything about the lesson</div>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'var(--accent-text)', fontSize: 15, lineHeight: 1,
              padding: '4px 6px', borderRadius: 6, opacity: 0.8,
            }}
          >
            ✕
          </button>
        </div>

        {/* Messages */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '14px 12px',
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
        }}>
          {messages.map((msg, i) => (
            <div
              key={i}
              style={{
                maxWidth: '88%',
                alignSelf: msg.role === 'ai' ? 'flex-start' : 'flex-end',
              }}
            >
              {msg.role === 'ai' && (
                <div style={{ fontSize: 10, color: 'var(--text4)', marginBottom: 3, paddingLeft: 2, fontWeight: 600 }}>
                  AI Tutor
                </div>
              )}
              <div style={{
                padding: '9px 12px',
                borderRadius: msg.role === 'ai' ? '3px 10px 10px 10px' : '10px 10px 3px 10px',
                fontSize: 12.5,
                lineHeight: 1.65,
                background: msg.role === 'ai' ? 'var(--bg)' : 'var(--primary)',
                color: msg.role === 'ai' ? 'var(--text2)' : '#fff',
                border: msg.role === 'ai' ? '1px solid var(--border)' : 'none',
              }}>
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={endRef} />
        </div>

        {/* Input */}
        <div style={{
          padding: '10px 12px',
          borderTop: '1px solid var(--border)',
          display: 'flex',
          gap: 8,
          alignItems: 'center',
          flexShrink: 0,
          background: 'var(--surface)',
        }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder="Ask anything..."
            style={{
              flex: 1,
              padding: '8px 12px',
              background: 'var(--bg)',
              border: '1px solid var(--border2)',
              borderRadius: 8,
              fontSize: 12.5,
              fontFamily: 'inherit',
              color: 'var(--text1)',
              outline: 'none',
            }}
            onFocus={e => e.target.style.borderColor = 'var(--accent)'}
            onBlur={e => e.target.style.borderColor = 'var(--border2)'}
          />
          <button
            onClick={handleSend}
            style={{
              width: 32, height: 32, flexShrink: 0,
              background: 'var(--accent)',
              color: 'var(--accent-text)',
              border: 'none',
              borderRadius: 6,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
              fontSize: 13,
            }}
          >
            ➤
          </button>
        </div>
      </div>

      {/* Floating button */}
      <button
        onClick={() => setIsOpen(prev => !prev)}
        title="Ask AI Tutor"
        style={{
          width: 52, height: 52,
          borderRadius: '50%',
          background: 'var(--accent)',
          color: 'var(--accent-text)',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: isOpen ? 18 : 22,
          boxShadow: '0 4px 18px rgba(0,0,0,0.28)',
          transition: 'transform 0.15s ease, box-shadow 0.15s ease',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'scale(1.08)'
          e.currentTarget.style.boxShadow = '0 6px 22px rgba(0,0,0,0.34)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'scale(1)'
          e.currentTarget.style.boxShadow = '0 4px 18px rgba(0,0,0,0.28)'
        }}
      >
        {isOpen ? '✕' : '✨'}
      </button>
    </div>
  )
}
