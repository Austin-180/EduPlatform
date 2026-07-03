import { useState, useRef, useEffect } from 'react'
import CourseOutline from '../components/CourseOutline.jsx'
import ThemeToggle from '../components/ThemeToggle.jsx'
import { CHAPTERS, AI_REPLIES } from '../data/mockData.js'
import { useLanguage } from '../context/LanguageContext.jsx'

const ALL_LESSONS = CHAPTERS.flatMap(ch => ch.lessons)

const LESSON_DATA = {
  l1: {
    summary: 'Cybersecurity is the practice of protecting systems, networks, and data from digital attacks. Every defense — from a home router to an enterprise SOC — is built on the same foundational ideas.',
    points: [
      'Security protects the confidentiality, integrity, and availability of data',
      'Threats exploit vulnerabilities to cause harm — you defend by reducing both',
      'Attackers and defenders often use the same tools; intent is what differs',
      'Defense in depth layers controls so one failure does not break everything',
    ],
    note: 'Focus on the "why" behind each control — it makes advanced topics much easier later.',
    example: 'CIA Triad:\n  Confidentiality -> encryption, access control\n  Integrity       -> hashing, digital signatures\n  Availability    -> backups, redundancy',
    concepts: [
      { title: 'Threat', desc: 'Any potential cause of an unwanted incident that may harm a system.' },
      { title: 'Vulnerability', desc: 'A weakness that a threat can exploit to gain access or cause damage.' },
      { title: 'Risk', desc: 'The likelihood and impact of a threat exploiting a vulnerability.' },
      { title: 'Exploit', desc: 'Code or a technique that takes advantage of a vulnerability.' },
      { title: 'Attack Surface', desc: 'The sum of all points where an attacker could try to enter a system.' },
      { title: 'Control', desc: 'A safeguard or countermeasure that reduces risk.' },
    ],
    mindMap: { center: 'Cybersecurity', branches: ['Threats', 'Vulnerabilities', 'Risk', 'CIA Triad', 'Attack Surface', 'Controls'] },
    sandbox: 'A customer database was leaked online. Identify which part of the CIA triad was violated.',
    sandboxCode: '# Which CIA property is broken?\n# A) Confidentiality  B) Integrity  C) Availability\nanswer = "A"\nprint("Leaked data breaks:", answer)',
  },
  l2: {
    summary: 'The CIA triad — Confidentiality, Integrity, and Availability — is the foundation of every security decision. Almost every control you will learn maps back to one of these three goals.',
    points: [
      'Confidentiality keeps data secret from unauthorized parties',
      'Integrity ensures data is accurate and has not been tampered with',
      'Availability ensures systems and data are accessible when needed',
      'Real incidents usually break more than one property at once',
    ],
    note: 'When evaluating any control, ask which CIA property it protects — and what it costs.',
    example: 'Confidentiality -> AES-256 encryption\nIntegrity       -> SHA-256 checksum\nAvailability    -> load balancer + backups',
    concepts: [
      { title: 'Confidentiality', desc: 'Ensuring information is accessible only to authorized parties.' },
      { title: 'Integrity', desc: 'Ensuring information is not altered by unauthorized parties.' },
      { title: 'Availability', desc: 'Ensuring systems and data are usable when legitimately needed.' },
      { title: 'Encryption', desc: 'Transforming data so only authorized parties can read it.' },
      { title: 'Hashing', desc: 'A one-way function used to verify the integrity of data.' },
      { title: 'Redundancy', desc: 'Duplicate systems that keep services available during failure.' },
    ],
    mindMap: { center: 'CIA Triad', branches: ['Confidentiality', 'Integrity', 'Availability', 'Encryption', 'Hashing', 'Redundancy'] },
    sandbox: 'Passwords should be stored as hashes, not plain text. Hash a sample password to see the output.',
    sandboxCode: '# Passwords are stored hashed, never in plain text\nimport hashlib\nprint(hashlib.sha256(b"P@ssw0rd").hexdigest())',
  },
  l3: {
    summary: 'Security is risk management. You cannot eliminate every threat, so you learn to identify vulnerabilities, estimate risk, and prioritize the controls that reduce it the most.',
    points: [
      'Threat + Vulnerability + Impact together define Risk',
      'You reduce risk by removing vulnerabilities or reducing impact',
      'Not all risks are worth fixing — prioritize by likelihood and impact',
      'Threat modeling maps how an attacker might reach your assets',
    ],
    note: 'Document your assumptions. A threat model is only as good as what you remembered to include.',
    example: 'Risk = Likelihood x Impact\n\nUnpatched public server (High likelihood)\n  x Customer PII (High impact)\n  = Critical risk -> patch first',
    concepts: [
      { title: 'Threat Actor', desc: 'A person or group that carries out a malicious action.' },
      { title: 'Attack Vector', desc: 'The path or method used to gain unauthorized access.' },
      { title: 'Threat Modeling', desc: 'Systematically identifying and prioritizing potential threats.' },
      { title: 'Likelihood', desc: 'How probable it is that a threat will exploit a vulnerability.' },
      { title: 'Impact', desc: 'The damage caused if a threat is successfully realized.' },
      { title: 'Mitigation', desc: 'An action that reduces the likelihood or impact of a risk.' },
    ],
    mindMap: { center: 'Risk', branches: ['Threat Actor', 'Attack Vector', 'Vulnerability', 'Likelihood', 'Impact', 'Mitigation'] },
    sandbox: 'Rank two risks: (A) public, unpatched server holding PII; (B) internal, patched server holding test data.',
    sandboxCode: '# Higher risk = higher likelihood x impact\nrisk_a = "public + unpatched + PII"\nrisk_b = "internal + patched + test data"\nprint("Fix first:", risk_a)',
  },
}

function getLessonData(id) {
  return LESSON_DATA[id] ?? {
    summary: 'This lesson\'s content will appear here once available. Select a completed lesson to explore the material.',
    points: ['Check back after completing prerequisite lessons.'],
    note: null,
    example: '# Example code will appear here\npass',
    concepts: [{ title: 'Coming Soon', desc: 'Concepts for this lesson will be available once unlocked.' }],
    mindMap: { center: 'Topic', branches: ['Coming Soon'] },
    sandbox: 'This exercise will be available once the lesson is unlocked.',
    sandboxCode: '# Write your solution here\n',
  }
}

function getLessonMeta(id) {
  for (const ch of CHAPTERS) {
    const found = ch.lessons.find(l => l.id === id)
    if (found) return found
  }
  return null
}

// ─── Shared micro-components ──────────────────────────────────────────────────

function Label({ children }) {
  return (
    <div style={{ fontSize: 10.5, fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
      {children}
    </div>
  )
}

function ContentBlock({ label, children }) {
  return (
    <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 8, padding: '16px 20px', marginBottom: 16 }}>
      <div style={{ fontSize: 10.5, fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 14 }}>{label}</div>
      {children}
    </div>
  )
}

// ─── Lesson (default view) ────────────────────────────────────────────────────

function LessonPanel({ lessonId }) {
  const meta = getLessonMeta(lessonId)
  const d = getLessonData(lessonId)

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '24px 28px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18, flexWrap: 'wrap' }}>
        <h2 style={{ fontSize: 17, fontWeight: 700, color: 'var(--text1)', margin: 0 }}>
          {meta?.title ?? 'Lesson'}
        </h2>
        {meta && (
          <span style={{ fontSize: 11, fontWeight: 600, background: 'var(--accent)', color: 'var(--accent-text)', padding: '2px 9px', borderRadius: 20 }}>
            {meta.time}
          </span>
        )}
      </div>
      <p style={{ fontSize: 13.5, lineHeight: 1.8, color: 'var(--text2)', margin: '0 0 20px' }}>{d.summary}</p>
      <ContentBlock label="Key Points">
        <ul style={{ margin: 0, paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 11 }}>
          {d.points.map((pt, i) => (
            <li key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <span style={{ color: 'var(--accent)', fontWeight: 700, flexShrink: 0, marginTop: 1 }}>→</span>
              <span style={{ fontSize: 13.5, color: 'var(--text2)', lineHeight: 1.65 }}>{pt}</span>
            </li>
          ))}
        </ul>
      </ContentBlock>
      <ContentBlock label="Example">
        <pre style={{ margin: 0, fontSize: 12.5, color: 'var(--text2)', fontFamily: 'monospace', whiteSpace: 'pre-wrap', lineHeight: 1.7 }}>{d.example}</pre>
      </ContentBlock>
      {d.note && (
        <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderLeft: '3px solid var(--accent)', borderRadius: '0 8px 8px 0', padding: '12px 16px' }}>
          <span style={{ fontSize: 13, color: 'var(--text3)', lineHeight: 1.7, fontStyle: 'italic' }}>💡 {d.note}</span>
        </div>
      )}
    </div>
  )
}

// ─── Summary ──────────────────────────────────────────────────────────────────

function SummaryPanel({ lessonId }) {
  const meta = getLessonMeta(lessonId)
  const d = getLessonData(lessonId)

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '24px 28px' }}>
      <Label>Chapter Summary</Label>
      <h2 style={{ fontSize: 17, fontWeight: 700, color: 'var(--text1)', margin: '8px 0 16px' }}>
        {meta?.title ?? 'Lesson'}
      </h2>
      <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 8, padding: '16px 20px', marginBottom: 24 }}>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.85, color: 'var(--text2)' }}>{d.summary}</p>
      </div>
      <Label>Key Takeaways</Label>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 12 }}>
        {d.points.map((pt, i) => (
          <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 8, padding: '12px 16px' }}>
            <span style={{ background: 'var(--accent)', color: 'var(--accent-text)', fontWeight: 700, fontSize: 11, padding: '2px 8px', borderRadius: 12, flexShrink: 0 }}>{i + 1}</span>
            <span style={{ fontSize: 13.5, color: 'var(--text2)', lineHeight: 1.6 }}>{pt}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Concepts ─────────────────────────────────────────────────────────────────

function ConceptsPanel({ lessonId }) {
  const meta = getLessonMeta(lessonId)
  const d = getLessonData(lessonId)

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '24px 28px' }}>
      <Label>Key Concepts</Label>
      <h2 style={{ fontSize: 17, fontWeight: 700, color: 'var(--text1)', margin: '8px 0 20px' }}>
        {meta?.title ?? 'Lesson'}
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: 14 }}>
        {d.concepts.map((c, i) => (
          <div key={i} style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 10, padding: '18px 16px' }}>
            <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text1)', marginBottom: 8 }}>{c.title}</div>
            <div style={{ fontSize: 12.5, color: 'var(--text2)', lineHeight: 1.6 }}>{c.desc}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Mind Map ─────────────────────────────────────────────────────────────────

function MindMapPanel({ lessonId }) {
  const d = getLessonData(lessonId)
  const { center, branches } = d.mindMap

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '32px 28px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Label>Mind Map</Label>
      <div style={{ marginTop: 36, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
        <div style={{ background: 'var(--accent)', color: 'var(--accent-text)', fontWeight: 700, fontSize: 15, padding: '12px 28px', borderRadius: 30 }}>
          {center}
        </div>
        <div style={{ width: 2, height: 28, background: 'var(--border)' }} />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center', maxWidth: 560 }}>
          {branches.map((b, i) => (
            <div key={i} style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 20, padding: '8px 20px', fontSize: 13, color: 'var(--text2)', fontWeight: 500 }}>
              {b}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── AI Tutor ─────────────────────────────────────────────────────────────────

function AiTutorPanel() {
  const [messages, setMessages] = useState([
    { role: 'ai', text: "Hi! I'm your AI tutor. Ask me anything about this lesson or cybersecurity in general." },
  ])
  const [input, setInput] = useState('')
  const bottomRef = useRef(null)

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])

  function send() {
    const text = input.trim()
    if (!text) return
    const reply = AI_REPLIES[Math.floor(Math.random() * AI_REPLIES.length)]
    setMessages(prev => [...prev, { role: 'user', text }, { role: 'ai', text: reply }])
    setInput('')
  }

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--border)', flexShrink: 0 }}>
        <Label>AI Tutor</Label>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {messages.map((m, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
            <div style={{
              maxWidth: '76%', padding: '10px 14px',
              borderRadius: m.role === 'user' ? '12px 12px 4px 12px' : '12px 12px 12px 4px',
              background: m.role === 'user' ? 'var(--accent)' : 'var(--bg)',
              color: m.role === 'user' ? 'var(--accent-text)' : 'var(--text2)',
              border: m.role === 'user' ? 'none' : '1px solid var(--border)',
              fontSize: 13.5, lineHeight: 1.65,
            }}>
              {m.text}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <div style={{ padding: '12px 16px', borderTop: '1px solid var(--border)', display: 'flex', gap: 8, flexShrink: 0 }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
          placeholder="Ask a question about this lesson..."
          style={{ flex: 1, background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 8, padding: '8px 12px', fontSize: 13.5, color: 'var(--text1)', outline: 'none' }}
        />
        <button onClick={send} style={{ background: 'var(--accent)', color: 'var(--accent-text)', border: 'none', cursor: 'pointer', padding: '8px 16px', borderRadius: 8, fontSize: 13, fontWeight: 600 }}>
          Send
        </button>
      </div>
    </div>
  )
}

// ─── Sandbox ──────────────────────────────────────────────────────────────────

function SandboxPanel({ lessonId }) {
  const d = getLessonData(lessonId)
  const [code, setCode] = useState(d.sandboxCode)
  const [output, setOutput] = useState('')

  function run() {
    setOutput('> Running security check...\n> No issues found.\n>\n> ✓ Scan complete (0.0s)')
  }

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ padding: '12px 20px', background: 'var(--bg)', borderBottom: '1px solid var(--border)', flexShrink: 0 }}>
        <div style={{ fontSize: 10.5, fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>Problem</div>
        <p style={{ margin: 0, fontSize: 13.5, color: 'var(--text2)', lineHeight: 1.6 }}>{d.sandbox}</p>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ padding: '6px 12px 6px 16px', background: '#12122a', borderBottom: '1px solid #2a2a4a', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
          <span style={{ fontSize: 11, color: '#888', fontFamily: 'monospace' }}>main.py</span>
          <button onClick={run} style={{ background: 'var(--accent)', color: 'var(--accent-text)', border: 'none', cursor: 'pointer', padding: '4px 14px', borderRadius: 6, fontSize: 12, fontWeight: 600 }}>
            ▶ Run
          </button>
        </div>
        <textarea
          value={code}
          onChange={e => setCode(e.target.value)}
          spellCheck={false}
          style={{ flex: 1, background: '#0d0d1f', color: '#e0e0ff', border: 'none', outline: 'none', padding: '16px', fontFamily: 'monospace', fontSize: 13, lineHeight: 1.7, resize: 'none' }}
        />
      </div>
      <div style={{ height: 110, background: '#060610', borderTop: '1px solid #1a1a3a', padding: '10px 16px', overflow: 'auto', flexShrink: 0 }}>
        <div style={{ fontSize: 10.5, fontWeight: 700, color: '#555', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>Output</div>
        <pre style={{ margin: 0, fontSize: 12, color: '#00ee77', fontFamily: 'monospace', lineHeight: 1.6 }}>
          {output || '> Click ▶ Run to execute your code'}
        </pre>
      </div>
    </div>
  )
}

// ─── Settings ─────────────────────────────────────────────────────────────────

function SettingsRow({ label, value }) {
  return (
    <div style={{ padding: '12px 0', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span style={{ fontSize: 13.5, color: 'var(--text2)' }}>{label}</span>
      <span style={{ fontSize: 13, color: 'var(--text3)' }}>{value}</span>
    </div>
  )
}

function SettingsSection({ title, children }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>{title}</div>
      <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 10, padding: '0 16px' }}>
        {children}
      </div>
    </div>
  )
}

function SettingsPanel() {
  const { language, setLanguage, t } = useLanguage()
  const [speed, setSpeed] = useState('standard')
  const [notifications, setNotifications] = useState(true)

  const selectStyle = {
    background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 6,
    padding: '4px 10px', fontSize: 13, color: 'var(--text1)', cursor: 'pointer',
  }

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '24px 28px' }}>
      <Label>{t('settingsTool')}</Label>
      <div style={{ marginTop: 20 }}>
        <SettingsSection title={t('dashboardAccountSection')}>
          <SettingsRow label={t('accountName')} value="Austin" />
          <SettingsRow label={t('accountEmail')} value="austinting1288@gmail.com" />
          <div style={{ padding: '12px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 13.5, color: 'var(--text2)' }}>{t('accountPlan')}</span>
            <span style={{ fontSize: 12, fontWeight: 600, background: 'var(--accent)', color: 'var(--accent-text)', padding: '2px 10px', borderRadius: 12 }}>Student — Free</span>
          </div>
        </SettingsSection>

        <SettingsSection title={t('dashboardAppearanceSection')}>
          <div style={{ padding: '12px 0', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 13.5, color: 'var(--text2)' }}>{t('darkMode')}</span>
            <span style={{ fontSize: 12.5, color: 'var(--text3)', fontStyle: 'italic' }}>{t('dashboardDarkModeHint')}</span>
          </div>
          <div style={{ padding: '12px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 13.5, color: 'var(--text2)' }}>{t('interfaceLanguage')}</span>
            <select value={language} onChange={e => setLanguage(e.target.value)} style={selectStyle}>
              <option value="zh-TW">繁體中文</option>
              <option value="en">English</option>
            </select>
          </div>
        </SettingsSection>

        <SettingsSection title={t('dashboardLearningSection')}>
          <div style={{ padding: '12px 0', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 13.5, color: 'var(--text2)' }}>{t('learningSpeedLabel')}</span>
            <select value={speed} onChange={e => setSpeed(e.target.value)} style={selectStyle}>
              <option value="relaxed">{t('learningSpeedRelaxed')}</option>
              <option value="standard">{t('learningSpeedStandard')}</option>
              <option value="intensive">{t('learningSpeedIntensive')}</option>
            </select>
          </div>
          <div style={{ padding: '12px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 13.5, color: 'var(--text2)' }}>{t('emailNotifLabel')}</span>
            <button
              onClick={() => setNotifications(n => !n)}
              style={{
                width: 44, height: 24, borderRadius: 12, border: 'none', cursor: 'pointer',
                background: notifications ? 'var(--accent)' : 'var(--border)',
                transition: 'background 0.2s', position: 'relative', flexShrink: 0,
              }}
            >
              <span style={{
                position: 'absolute', top: 2, left: notifications ? 22 : 2,
                width: 20, height: 20, borderRadius: '50%', background: '#fff',
                transition: 'left 0.2s', display: 'block',
              }} />
            </button>
          </div>
        </SettingsSection>
      </div>
    </div>
  )
}

// ─── Right Sidebar: Code Sandbox ─────────────────────────────────────────────

function RightSandboxPanel() {
  const [code, setCode] = useState('// Write your code here...\n')
  const [output, setOutput] = useState('')

  function runCode() {
    setOutput('> Running...\n> Scan complete.\n>\n> ✓ No issues found.')
  }

  return (
    <div style={{
      width: 340, flexShrink: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden',
      background: 'var(--surface)', borderRadius: 8, border: '1px solid var(--border)',
    }}>
      <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)', flexShrink: 0 }}>
        <div style={{ fontSize: 10.5, fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Code Sandbox</div>
      </div>
      <textarea
        value={code}
        onChange={e => setCode(e.target.value)}
        spellCheck={false}
        style={{
          flex: 1, background: '#0d0d1f', color: '#e0e0ff', border: 'none', outline: 'none',
          padding: '14px', fontFamily: 'monospace', fontSize: 12.5, lineHeight: 1.7, resize: 'none',
        }}
      />
      <div style={{ padding: '10px 12px', borderTop: '1px solid var(--border)', flexShrink: 0 }}>
        <button
          onClick={runCode}
          style={{
            width: '100%', background: 'var(--accent)', color: 'var(--accent-text)',
            border: 'none', cursor: 'pointer', padding: '8px', borderRadius: 6,
            fontSize: 13, fontWeight: 600,
          }}
        >▶ Run & Debug</button>
      </div>
      <div style={{
        height: 90, background: '#060610', borderTop: '1px solid #1a1a3a',
        padding: '10px 14px', overflow: 'auto', flexShrink: 0,
      }}>
        <div style={{ fontSize: 10.5, fontWeight: 700, color: '#555', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>Output</div>
        <pre style={{ margin: 0, fontSize: 11.5, color: '#00ee77', fontFamily: 'monospace', lineHeight: 1.55 }}>
          {output || 'Ready to run your code...'}
        </pre>
      </div>
    </div>
  )
}

// ─── Floating AI Chat ─────────────────────────────────────────────────────────

function FloatingAiChat({ open, onToggle }) {
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Ask me anything about this lesson...' },
  ])
  const [input, setInput] = useState('')
  const bottomRef = useRef(null)

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])

  function send() {
    const text = input.trim()
    if (!text) return
    const reply = AI_REPLIES[Math.floor(Math.random() * AI_REPLIES.length)]
    setMessages(prev => [...prev, { role: 'user', text }, { role: 'ai', text: reply }])
    setInput('')
  }

  return (
    <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 1000, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 12 }}>
      {open && (
        <div style={{
          width: 320, height: 400, background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 12, display: 'flex', flexDirection: 'column', overflow: 'hidden',
          boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
        }}>
          <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text1)' }}>AI Tutor</span>
            <button onClick={onToggle} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text3)', fontSize: 18, lineHeight: 1, padding: '0 2px' }}>×</button>
          </div>
          <div style={{ flex: 1, overflowY: 'auto', padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {messages.map((m, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
                <div style={{
                  maxWidth: '82%', padding: '8px 12px',
                  borderRadius: m.role === 'user' ? '10px 10px 3px 10px' : '10px 10px 10px 3px',
                  background: m.role === 'user' ? 'var(--accent)' : 'var(--bg)',
                  color: m.role === 'user' ? 'var(--accent-text)' : 'var(--text2)',
                  border: m.role === 'user' ? 'none' : '1px solid var(--border)',
                  fontSize: 13, lineHeight: 1.55,
                }}>{m.text}</div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>
          <div style={{ padding: '10px 12px', borderTop: '1px solid var(--border)', display: 'flex', gap: 6, flexShrink: 0 }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()}
              placeholder="Ask a question..."
              style={{ flex: 1, background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 6, padding: '6px 10px', fontSize: 13, color: 'var(--text1)', outline: 'none' }}
            />
            <button onClick={send} style={{ background: 'var(--accent)', color: 'var(--accent-text)', border: 'none', cursor: 'pointer', padding: '6px 12px', borderRadius: 6, fontSize: 12.5, fontWeight: 600 }}>Send</button>
          </div>
        </div>
      )}
      <button
        onClick={onToggle}
        title="AI Tutor"
        style={{
          width: 52, height: 52, borderRadius: '50%', background: 'var(--accent)', color: 'var(--accent-text)',
          border: 'none', cursor: 'pointer', fontSize: 22, display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 16px rgba(0,0,0,0.25)', transition: 'transform 0.15s',
        }}
      >✨</button>
    </div>
  )
}

// ─── Dashboard ────────────────────────────────────────────────────────────────

export default function Dashboard() {
  const { t } = useLanguage()
  const [activeLesson, setActiveLesson] = useState('l1')
  const [activeTool, setActiveTool] = useState('lesson')
  const [aiOpen, setAiOpen] = useState(false)

  const LEFT_TOOLS = [
    { id: 'summary',  label: t('summary')  },
    { id: 'concepts', label: t('concepts') },
    { id: 'mind-map', label: t('mindMap')  },
  ]

  const RIGHT_TOOLS = [
    { id: 'ai-tutor', label: t('aiTutorTool') },
    { id: 'sandbox',  label: t('sandboxTool') },
  ]

  const currentIdx = ALL_LESSONS.findIndex(l => l.id === activeLesson)
  const hasNext = currentIdx < ALL_LESSONS.length - 1

  function skipChapter() {
    if (!hasNext) return
    setActiveLesson(ALL_LESSONS[currentIdx + 1].id)
    setActiveTool('lesson')
  }

  function handleToolClick(id) {
    setActiveTool(prev => prev === id ? 'lesson' : id)
  }

  function handleLessonSelect(id) {
    setActiveLesson(id)
    setActiveTool('lesson')
  }

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden', background: 'var(--bg)' }}>
      {/* Top bar */}
      <header style={{
        height: 52, flexShrink: 0, background: 'var(--surface)',
        borderBottom: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 24, height: 24, borderRadius: 6, background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 13, color: 'var(--accent-text)' }}>E</div>
          <span style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--text1)' }}>EduPlatform</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button
            onClick={() => handleToolClick('settings')}
            style={{
              background: activeTool === 'settings' ? 'var(--accent)' : 'none',
              border: '1px solid', borderColor: activeTool === 'settings' ? 'var(--accent)' : 'var(--border)',
              cursor: 'pointer', padding: '5px 12px', borderRadius: 6,
              fontSize: 12.5, fontWeight: activeTool === 'settings' ? 600 : 400,
              color: activeTool === 'settings' ? 'var(--accent-text)' : 'var(--text2)',
              transition: 'all 0.15s',
            }}
          >{t('settingsTool')}</button>
          <ThemeToggle />
        </div>
      </header>

      {/* Toolbar */}
      <div style={{
        flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: 'var(--surface)', borderBottom: '1px solid var(--border)', padding: '0 16px',
      }}>
        {/* Left: lesson view tools */}
        <div style={{ display: 'flex', gap: 2 }}>
          {LEFT_TOOLS.map(t => {
            const active = activeTool === t.id
            return (
              <button
                key={t.id}
                onClick={() => handleToolClick(t.id)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  padding: '10px 14px', fontSize: 13, fontWeight: active ? 600 : 400,
                  color: active ? 'var(--accent)' : 'var(--text2)',
                  borderBottom: active ? '2px solid var(--accent)' : '2px solid transparent',
                  transition: 'color 0.15s, border-color 0.15s', marginBottom: -1,
                }}
              >{t.label}</button>
            )
          })}
        </div>

        {/* Right: tool + action buttons */}
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          {RIGHT_TOOLS.map(t => {
            const active = activeTool === t.id
            return (
              <button
                key={t.id}
                onClick={() => handleToolClick(t.id)}
                style={{
                  background: active ? 'var(--accent)' : 'none',
                  border: '1px solid', borderColor: active ? 'var(--accent)' : 'var(--border)',
                  cursor: 'pointer', padding: '5px 12px', borderRadius: 6,
                  fontSize: 12.5, fontWeight: active ? 600 : 400,
                  color: active ? 'var(--accent-text)' : 'var(--text2)',
                  transition: 'all 0.15s',
                }}
              >{t.label}</button>
            )
          })}
          <button
            onClick={skipChapter}
            disabled={!hasNext}
            title={hasNext ? 'Go to next lesson' : 'Already at last chapter'}
            style={{
              background: 'none', border: '1px solid var(--border)', cursor: hasNext ? 'pointer' : 'default',
              padding: '5px 12px', borderRadius: 6, fontSize: 12.5, fontWeight: 400,
              color: hasNext ? 'var(--text2)' : 'var(--text3)',
              opacity: hasNext ? 1 : 0.45, transition: 'all 0.15s',
            }}
          >
            {hasNext ? t('skipChapter') : t('lastChapter')}
          </button>
        </div>
      </div>

      {/* Body: left nav + center content */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden', padding: '12px', gap: '12px' }}>
        <CourseOutline
          chapters={CHAPTERS}
          activeLesson={activeLesson}
          onSelectLesson={handleLessonSelect}
        />

        {/* Center panel */}
        <div style={{
          flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0,
          background: 'var(--surface)', borderRadius: 8, border: '1px solid var(--border)',
        }}>
          {activeTool === 'lesson'   && <LessonPanel   lessonId={activeLesson} />}
          {activeTool === 'summary'  && <SummaryPanel  lessonId={activeLesson} />}
          {activeTool === 'concepts' && <ConceptsPanel lessonId={activeLesson} />}
          {activeTool === 'mind-map' && <MindMapPanel  lessonId={activeLesson} />}
          {activeTool === 'ai-tutor' && <AiTutorPanel  key={activeLesson} />}
          {activeTool === 'sandbox'  && <SandboxPanel  lessonId={activeLesson} key={activeLesson} />}
          {activeTool === 'settings' && <SettingsPanel />}
        </div>

        {/* Right sidebar: always-visible Code Sandbox */}
        <RightSandboxPanel />
      </div>

      {/* Floating AI chat button */}
      <FloatingAiChat open={aiOpen} onToggle={() => setAiOpen(o => !o)} />
    </div>
  )
}
