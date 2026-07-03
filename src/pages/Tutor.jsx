import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import PageTransition from '../components/PageTransition.jsx'
import { AI_WELCOME, AI_REPLIES } from '../data/mockData.js'
import { useLanguage } from '../context/LanguageContext.jsx'

const SUGGESTED_TOPICS = [
  { icon: '🔐', label: '什麼是 CIA 三要素？' },
  { icon: '🕸️', label: '解釋 XSS 攻擊' },
  { icon: '💉', label: 'SQL Injection 怎麼防？' },
  { icon: '🔑', label: '密碼該如何安全儲存？' },
  { icon: '🛡️', label: '什麼是縱深防禦？' },
  { icon: '🎣', label: '如何辨識釣魚郵件？' },
]

const HISTORY = [
  { id: 'h1', title: 'CIA 三要素與風險', time: '昨天' },
  { id: 'h2', title: 'OWASP Top 10 概覽', time: '2 天前' },
  { id: 'h3', title: '密碼雜湊與加鹽',   time: '3 天前' },
]

const INITIAL_MESSAGES = [{ role: 'ai', text: AI_WELCOME }]

export default function Tutor() {
  const { t } = useLanguage()
  const [messages, setMessages] = useState(INITIAL_MESSAGES)
  const [input, setInput]       = useState('')
  const [thinking, setThinking] = useState(false)
  const endRef = useRef(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, thinking])

  const send = text => {
    const q = (text ?? input).trim()
    if (!q) return
    setInput('')
    setMessages(prev => [...prev, { role: 'user', text: q }])
    setThinking(true)
    setTimeout(() => {
      const reply = AI_REPLIES[Math.floor(Math.random() * AI_REPLIES.length)]
      setMessages(prev => [...prev, { role: 'ai', text: reply }])
      setThinking(false)
    }, 800)
  }

  return (
    <PageTransition style={{ overflow: 'hidden' }}>
      {/* ── Outer container with gap (matches Dashboard floating-card style) ── */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden', background: 'var(--bg)', padding: '12px', gap: '12px' }}>

        {/* ── Left sidebar ── */}
        <motion.aside
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          style={{
            width: 256, minWidth: 256, display: 'flex', flexDirection: 'column',
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 10,
            boxShadow: 'var(--shadow-sm)',
            overflow: 'hidden',
          }}
        >
          <div style={{ padding: '14px 14px 10px' }}>
            <button
              className="btn btn-primary"
              style={{ width: '100%' }}
              onClick={() => setMessages(INITIAL_MESSAGES)}
            >
              {t('newChat')}
            </button>
          </div>

          <div style={{ padding: '10px 14px 6px' }}>
            <p style={{ fontSize: 10.5, fontWeight: 700, color: 'var(--text4)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
              {t('suggestedTopics')}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {SUGGESTED_TOPICS.map(t => (
                <button
                  key={t.label}
                  onClick={() => send(t.label)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    padding: '8px 10px', borderRadius: 8,
                    background: 'none', border: 'none',
                    cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left',
                    fontSize: 13, color: 'var(--text2)', transition: 'background 0.12s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--surface2)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'none'}
                >
                  <span style={{ fontSize: 15 }}>{t.icon}</span>
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div style={{ padding: '14px 14px 6px', borderTop: '1px solid var(--border)', marginTop: 8 }}>
            <p style={{ fontSize: 10.5, fontWeight: 700, color: 'var(--text4)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
              {t('chatHistory')}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {HISTORY.map(h => (
                <button
                  key={h.id}
                  style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
                    padding: '8px 10px', borderRadius: 8,
                    background: 'none', border: 'none',
                    cursor: 'pointer', fontFamily: 'inherit', transition: 'background 0.12s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--surface2)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'none'}
                >
                  <span style={{ fontSize: 13, color: 'var(--text2)', fontWeight: 500 }}>{h.title}</span>
                  <span style={{ fontSize: 11, color: 'var(--text4)', marginTop: 1 }}>{h.time}</span>
                </button>
              ))}
            </div>
          </div>
        </motion.aside>

        {/* ── Chat panel ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          style={{
            flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden',
            border: '1px solid var(--border)',
            borderRadius: 10,
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          {/* Header */}
          <div style={{
            padding: '13px 20px', borderBottom: '1px solid var(--border)',
            background: 'var(--surface)', display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0,
          }}>
            <span style={{ fontSize: 18 }}>✨</span>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text1)', lineHeight: 1.2 }}>AI Tutor</div>
              <div style={{ fontSize: 11, color: 'var(--text3)', marginTop: 1 }}>{t('poweredBy')}</div>
            </div>
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--success)' }} />
              <span style={{ fontSize: 11, color: 'var(--text3)' }}>{t('online')}</span>
            </div>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: 12, background: 'var(--bg)' }}>
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                style={{ maxWidth: '78%', alignSelf: msg.role === 'ai' ? 'flex-start' : 'flex-end' }}
              >
                {msg.role === 'ai' && (
                  <div style={{ fontSize: 10.5, color: 'var(--text4)', marginBottom: 4, paddingLeft: 2, fontWeight: 500 }}>AI Tutor</div>
                )}
                <div style={{
                  padding: '11px 15px',
                  borderRadius: msg.role === 'ai' ? '4px 12px 12px 12px' : '12px 12px 4px 12px',
                  fontSize: 13.5, lineHeight: 1.65,
                  background: msg.role === 'ai' ? 'var(--surface)' : 'var(--primary)',
                  color: msg.role === 'ai' ? 'var(--text2)' : '#fff',
                  border: msg.role === 'ai' ? '1px solid var(--border)' : 'none',
                  boxShadow: 'var(--shadow-sm)',
                }}>
                  {msg.text}
                </div>
              </motion.div>
            ))}

            {thinking && (
              <div style={{ alignSelf: 'flex-start', maxWidth: '78%' }}>
                <div style={{ fontSize: 10.5, color: 'var(--text4)', marginBottom: 4, paddingLeft: 2, fontWeight: 500 }}>AI Tutor</div>
                <div style={{
                  padding: '12px 16px', borderRadius: '4px 12px 12px 12px',
                  background: 'var(--surface)', border: '1px solid var(--border)',
                  display: 'flex', gap: 5, alignItems: 'center',
                }}>
                  {[0, 1, 2].map(i => (
                    <motion.span
                      key={i}
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                      style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--text3)', display: 'block' }}
                    />
                  ))}
                </div>
              </div>
            )}
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
              onKeyDown={e => e.key === 'Enter' && !e.shiftKey && send()}
              placeholder={t('askQuestion')}
              style={{
                flex: 1, padding: '10px 14px',
                background: 'var(--surface2)', border: '1px solid var(--border2)',
                borderRadius: 10, fontSize: 13.5,
                fontFamily: 'inherit', color: 'var(--text1)', outline: 'none',
              }}
              onFocus={e => e.target.style.borderColor = 'var(--accent)'}
              onBlur={e => e.target.style.borderColor = 'var(--border2)'}
            />
            <button
              onClick={() => send()}
              disabled={!input.trim() || thinking}
              style={{
                width: 38, height: 38, flexShrink: 0,
                background: input.trim() && !thinking ? 'var(--accent)' : 'var(--surface3)',
                color: input.trim() && !thinking ? 'var(--accent-text)' : 'var(--text4)',
                border: 'none', borderRadius: 10,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: input.trim() && !thinking ? 'pointer' : 'not-allowed',
                fontSize: 15, transition: 'background 0.15s, color 0.15s',
                boxShadow: input.trim() && !thinking ? '0 2px 8px rgba(245,200,66,.3)' : 'none',
              }}
            >➤</button>
          </div>
        </motion.div>

      </div>
    </PageTransition>
  )
}
