import { useState } from 'react'

function StatusDot({ status, active }) {
  if (active || status === 'active') {
    return (
      <div style={{ width: 14, height: 14, borderRadius: '50%', background: 'var(--accent)', flexShrink: 0, marginTop: 2 }} />
    )
  }
  if (status === 'done') {
    return (
      <div style={{ width: 14, height: 14, borderRadius: '50%', border: '1.5px solid var(--text3)', flexShrink: 0, marginTop: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, color: 'var(--text3)' }}>
        ✓
      </div>
    )
  }
  return (
    <div style={{ width: 14, height: 14, borderRadius: '50%', border: '1.5px solid var(--border2)', flexShrink: 0, marginTop: 2 }} />
  )
}

export default function CourseOutline({ chapters, activeLesson, onSelectLesson }) {
  const [open, setOpen] = useState({ c1: true, c2: false, c3: false })
  const toggle = id => setOpen(p => ({ ...p, [id]: !p[id] }))

  return (
    <aside style={{
      width: 280, minWidth: 280,
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: 10,
      boxShadow: 'var(--shadow-sm)',
      display: 'flex', flexDirection: 'column',
      overflow: 'hidden',
    }}>
      {/* User badge */}
      <div style={{
        padding: '12px 16px',
        borderBottom: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', gap: 10,
        flexShrink: 0,
      }}>
        <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--surface3)', border: '1.5px solid var(--border2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, flexShrink: 0 }}>
          👤
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text1)', lineHeight: 1.3 }}>Signed in</div>
          <div style={{ fontSize: 11, color: 'var(--text3)' }}>Guest Mode</div>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto' }}>
        {chapters.map(ch => (
          <div key={ch.id}>
            {/* Chapter toggle */}
            <button
              onClick={() => toggle(ch.id)}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: 8,
                padding: '9px 16px',
                background: 'var(--surface2)',
                borderTop: 'none', borderRight: 'none',
                borderBottom: '1px solid var(--border)', borderLeft: 'none',
                cursor: 'pointer', fontFamily: 'inherit',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--surface3)'}
              onMouseLeave={e => e.currentTarget.style.background = 'var(--surface2)'}
            >
              <span style={{
                fontSize: 8, color: 'var(--text4)',
                transition: 'transform 0.2s',
                transform: open[ch.id] ? 'rotate(90deg)' : 'rotate(0deg)',
                display: 'inline-block', flexShrink: 0,
              }}>▶</span>
              <span style={{ fontSize: 13 }}>{ch.icon}</span>
              <span style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--text2)', flex: 1, textAlign: 'left', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {ch.title}
              </span>
              <span style={{ fontSize: 10, background: 'var(--surface)', color: 'var(--text4)', padding: '1px 6px', borderRadius: 999, fontWeight: 600, border: '1px solid var(--border)', flexShrink: 0 }}>
                {ch.lessons.filter(l => l.status === 'done').length}/{ch.lessons.length}
              </span>
            </button>

            {/* Lessons */}
            {open[ch.id] && ch.lessons.map(l => {
              const isActive = l.id === activeLesson
              return (
                <button
                  key={l.id}
                  onClick={() => onSelectLesson?.(l.id)}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'flex-start', gap: 12,
                    padding: '10px 16px',
                    background: isActive ? 'var(--surface2)' : 'transparent',
                    borderTop: 'none', borderRight: 'none',
                    borderBottom: '1px solid var(--border)',
                    borderLeft: `3px solid ${isActive ? 'var(--accent)' : 'transparent'}`,
                    cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left',
                    transition: 'background 0.12s',
                  }}
                  onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = 'var(--surface2)' }}
                  onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent' }}
                >
                  <StatusDot status={l.status} active={isActive} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontSize: 13,
                      fontWeight: isActive ? 600 : 400,
                      color: isActive ? 'var(--text1)' : l.status === 'done' ? 'var(--text3)' : 'var(--text2)',
                      overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                      lineHeight: 1.35,
                    }}>
                      {l.title}
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--text4)', marginTop: 2 }}>{l.time}</div>
                  </div>
                </button>
              )
            })}
          </div>
        ))}
      </div>
    </aside>
  )
}
