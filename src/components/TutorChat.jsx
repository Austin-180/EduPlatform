import { useState, useEffect, useRef } from 'react'

export default function TutorChat({ messages, onSend, compact = false }) {
  const [input, setInput] = useState('')
  const endRef = useRef(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const send = () => {
    if (!input.trim()) return
    onSend?.(input.trim())
    setInput('')
  }

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 10, boxShadow: 'var(--shadow-sm)' }}>
      {/* Header */}
      <div style={{
        padding: compact ? '10px 16px' : '13px 20px',
        borderBottom: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', gap: 10,
        flexShrink: 0, background: 'var(--surface)',
      }}>
        <span style={{ fontSize: 18 }}>✨</span>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text1)', lineHeight: 1.2 }}>AI Tutor</div>
          {!compact && <div style={{ fontSize: 11, color: 'var(--text3)', marginTop: 1 }}>Powered by EduPlatform AI</div>}
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--success)' }} />
          {!compact && <span style={{ fontSize: 11, color: 'var(--text3)' }}>Online</span>}
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              maxWidth: '82%',
              alignSelf: msg.role === 'ai' ? 'flex-start' : 'flex-end',
            }}
          >
            {msg.role === 'ai' && (
              <div style={{ fontSize: 10.5, color: 'var(--text4)', marginBottom: 4, paddingLeft: 2, fontWeight: 500 }}>
                AI Tutor
              </div>
            )}
            <div style={{
              padding: '11px 15px',
              borderRadius: msg.role === 'ai' ? '4px 12px 12px 12px' : '12px 12px 4px 12px',
              fontSize: 13.5, lineHeight: 1.65,
              background: msg.role === 'ai' ? 'var(--surface)' : 'var(--primary)',
              color: msg.role === 'ai' ? 'var(--text2)' : '#fff',
              border: msg.role === 'ai' ? '1px solid var(--border)' : 'none',
              boxShadow: msg.role === 'ai' ? 'var(--shadow-sm)' : 'none',
            }}>
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>

      {/* Input bar */}
      <div style={{
        padding: '12px 16px', background: 'var(--surface)',
        borderTop: '1px solid var(--border)',
        display: 'flex', gap: 8, alignItems: 'center', flexShrink: 0,
      }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
          placeholder="Ask your AI tutor anything..."
          style={{
            flex: 1, padding: '10px 14px',
            background: 'var(--surface2)',
            border: '1px solid var(--border2)',
            borderRadius: 10, fontSize: 13.5,
            fontFamily: 'inherit', color: 'var(--text1)',
            outline: 'none',
          }}
          onFocus={e => e.target.style.borderColor = 'var(--accent)'}
          onBlur={e => e.target.style.borderColor = 'var(--border2)'}
        />
        <button
          onClick={send}
          style={{
            width: 38, height: 38, flexShrink: 0,
            background: 'var(--accent)', color: 'var(--accent-text)',
            border: 'none', borderRadius: 8,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', fontSize: 15,
            boxShadow: '0 2px 8px rgba(245,200,66,.3)',
          }}
        >
          ➤
        </button>
      </div>
    </div>
  )
}
