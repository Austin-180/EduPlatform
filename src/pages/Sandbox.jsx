import { useState } from 'react'
import { motion } from 'framer-motion'
import PageTransition from '../components/PageTransition.jsx'
import { useLanguage } from '../context/LanguageContext.jsx'

const TASKS = [
  {
    id: 't1', title: 'Caesar Cipher 解密', level: 'Beginner',
    desc: '撰寫一個函式，將位移 3 的 Caesar cipher 密文解密回原文。',
    hints: ['每個字母往前位移 3 位', '可用 ord() 與 chr() 換算字元'],
    starterCode: `def caesar_decrypt(text, shift=3):\n    # 在這裡撰寫你的程式碼\n    pass\n\nprint(caesar_decrypt("KHOOR ZRUOG"))`,
    output: 'HELLO WORLD\n\n>>> Process finished with exit code 0',
  },
  {
    id: 't2', title: 'SHA-256 密碼雜湊', level: 'Beginner',
    desc: '使用 hashlib 對密碼做 SHA-256 雜湊，輸出十六進位摘要。',
    hints: ['import hashlib', '用 .hexdigest() 取得十六進位字串'],
    starterCode: `import hashlib\n\ndef hash_password(pw):\n    # 在這裡撰寫你的程式碼\n    pass\n\nprint(hash_password("P@ssw0rd"))`,
    output: '161ebd7d45089b3446ee4e0d86dbcf092d7f3c8e4a3e4a6f9a3a...\n\n>>> Process finished with exit code 0',
  },
  {
    id: 't3', title: '找出弱密碼', level: 'Intermediate',
    desc: '給定密碼清單，使用 list comprehension 篩選出長度小於 8 的弱密碼。',
    hints: ['語法：[pw for pw in passwords if ...]', '弱密碼條件：len(pw) < 8'],
    starterCode: `passwords = ["123", "SuperSecret!", "abc", "correcthorse"]\n# 篩選弱密碼\nweak = []\n\nprint(weak)`,
    output: "['123', 'abc']\n\n>>> Process finished with exit code 0",
  },
  {
    id: 't4', title: '偵測 SQL Injection', level: 'Beginner',
    desc: '撰寫一個函式，判斷輸入字串是否包含常見的 SQL injection 特徵。',
    hints: ["檢查 ' OR 1=1、--、DROP 等關鍵字", '比對前先轉成小寫'],
    starterCode: `def is_sqli(user_input):\n    # 在這裡撰寫你的程式碼\n    pass\n\nprint(is_sqli("admin' OR 1=1 --"))`,
    output: 'True\n\n>>> Process finished with exit code 0',
  },
  {
    id: 't5', title: '檢查缺少的安全標頭', level: 'Intermediate',
    desc: '給定 HTTP 回應標頭，找出缺少的必要安全標頭。',
    hints: ['用 dict 儲存現有標頭', '比對必要標頭清單找差集'],
    starterCode: `headers = {"X-Frame-Options": "DENY", "X-Content-Type-Options": "nosniff"}\nrequired = ["X-Frame-Options", "Content-Security-Policy", "X-Content-Type-Options"]\n# 找出缺少的標頭\nmissing = []\n\nprint(missing)`,
    output: "['Content-Security-Policy']\n\n>>> Process finished with exit code 0",
  },
]

const LEVEL_COLOR = {
  Beginner:     { bg: 'var(--primary-dim)', text: 'var(--primary)' },
  Intermediate: { bg: 'var(--accent-dim)',  text: 'var(--accent)'  },
}

export default function Sandbox() {
  const { t } = useLanguage()
  const [activeId, setActiveId] = useState('t1')
  const [codes, setCodes]       = useState(Object.fromEntries(TASKS.map(t => [t.id, t.starterCode])))
  const [output, setOutput]     = useState('')
  const [running, setRunning]   = useState(false)

  const task = TASKS.find(t => t.id === activeId)
  const lc   = LEVEL_COLOR[task.level] ?? { bg: 'var(--surface2)', text: 'var(--text3)' }

  const run = () => {
    setRunning(true)
    setOutput('Running...')
    setTimeout(() => { setOutput(task.output); setRunning(false) }, 1000)
  }

  return (
    <PageTransition style={{ overflow: 'hidden' }}>
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden', background: 'var(--bg)', padding: '12px', gap: '12px' }}>

        {/* ── Left: Task list ── */}
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
          <div style={{ padding: '13px 16px', borderBottom: '1px solid var(--border)', flexShrink: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 14, color: 'var(--primary)', fontFamily: 'monospace', fontWeight: 800 }}>{'<>'}</span>
            <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text1)' }}>{t('exercises')}</span>
            <span style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--text4)', background: 'var(--surface2)', padding: '2px 8px', borderRadius: 999, border: '1px solid var(--border)' }}>Python</span>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', padding: '8px' }}>
            {TASKS.map((t, i) => {
              const tlc      = LEVEL_COLOR[t.level] ?? { bg: 'var(--surface2)', text: 'var(--text3)' }
              const isActive = t.id === activeId
              return (
                <button
                  key={t.id}
                  onClick={() => { setActiveId(t.id); setOutput('') }}
                  style={{
                    width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
                    padding: '10px 12px', borderRadius: 8, marginBottom: 4,
                    background: isActive ? 'var(--surface2)' : 'transparent',
                    border: `1px solid ${isActive ? 'var(--border2)' : 'transparent'}`,
                    cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left', transition: 'background 0.12s',
                  }}
                  onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = 'var(--surface2)' }}
                  onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%', marginBottom: 5 }}>
                    <span style={{ fontSize: 11, color: 'var(--text4)', fontFamily: 'monospace', minWidth: 20 }}>{String(i + 1).padStart(2, '0')}</span>
                    <span style={{ flex: 1, fontSize: 13.5, fontWeight: isActive ? 700 : 500, color: isActive ? 'var(--text1)' : 'var(--text2)' }}>{t.title}</span>
                  </div>
                  <span style={{ marginLeft: 28, fontSize: 10.5, fontWeight: 700, padding: '2px 8px', borderRadius: 999, background: tlc.bg, color: tlc.text }}>{t.level}</span>
                </button>
              )
            })}
          </div>
        </motion.aside>

        {/* ── Middle: Editor ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
          style={{
            flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden',
            border: '1px solid var(--border)',
            borderRadius: 10,
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          {/* Task description */}
          <div style={{ padding: '14px 18px', background: 'var(--surface)', borderBottom: '1px solid var(--border)', flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
              <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--text1)' }}>{task.title}</span>
              <span style={{ fontSize: 10.5, fontWeight: 700, padding: '2px 8px', borderRadius: 999, background: lc.bg, color: lc.text }}>{task.level}</span>
            </div>
            <p style={{ fontSize: 13, color: 'var(--text3)', lineHeight: 1.6, marginBottom: 8 }}>{task.desc}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {task.hints.map((h, i) => (
                <span key={i} style={{ fontSize: 11.5, padding: '3px 10px', borderRadius: 999, background: 'var(--surface2)', color: 'var(--text3)', border: '1px solid var(--border)' }}>
                  💡 {h}
                </span>
              ))}
            </div>
          </div>

          {/* Code editor */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', background: 'var(--code-bg)' }}>
            <div style={{ padding: '8px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
              {['#ff5f57', '#febc2e', '#28c840'].map(c => (
                <span key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c, display: 'block' }} />
              ))}
              <span style={{ marginLeft: 8, fontSize: 12, color: 'rgba(255,255,255,0.3)', fontFamily: 'monospace' }}>main.py</span>
            </div>
            <textarea
              value={codes[activeId]}
              onChange={e => setCodes(prev => ({ ...prev, [activeId]: e.target.value }))}
              spellCheck={false}
              style={{
                flex: 1, padding: '16px 20px',
                background: 'transparent', border: 'none', outline: 'none',
                color: 'var(--code-text)',
                fontFamily: "'SF Mono','Fira Code','Cascadia Code',Consolas,monospace",
                fontSize: 13.5, lineHeight: 1.8, resize: 'none', width: '100%',
              }}
            />
          </div>
        </motion.div>

        {/* ── Right: Output ── */}
        <motion.aside
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          style={{
            width: 300, minWidth: 300, display: 'flex', flexDirection: 'column',
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 10,
            boxShadow: 'var(--shadow-sm)',
            overflow: 'hidden',
          }}
        >
          <div style={{ padding: '13px 16px', borderBottom: '1px solid var(--border)', flexShrink: 0 }}>
            <span style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--text1)' }}>{t('outputLabel')}</span>
          </div>

          <div style={{ flex: 1, padding: '16px', overflow: 'auto', background: 'var(--code-bg)' }}>
            {output
              ? <pre style={{ fontSize: 13, color: output.includes('exit code 0') ? 'var(--success)' : 'var(--code-text)', fontFamily: "'SF Mono','Fira Code',Consolas,monospace", whiteSpace: 'pre-wrap', margin: 0, lineHeight: 1.7 }}>{output}</pre>
              : <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.2)', fontFamily: 'monospace', lineHeight: 1.6 }}>{t('clickToRun')}</p>
            }
          </div>

          <div style={{ padding: '12px 16px', borderTop: '1px solid var(--border)', flexShrink: 0 }}>
            <button
              onClick={run}
              disabled={running}
              style={{
                width: '100%', padding: '11px',
                background: running ? 'var(--surface2)' : 'var(--accent)',
                color: running ? 'var(--text3)' : 'var(--accent-text)',
                border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 700,
                cursor: running ? 'not-allowed' : 'pointer', fontFamily: 'inherit',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                transition: 'background 0.15s',
                boxShadow: running ? 'none' : '0 2px 12px rgba(245,200,66,.25)',
              }}
            >
              {running ? t('runningCode') : t('runCode')}
            </button>
          </div>
        </motion.aside>

      </div>
    </PageTransition>
  )
}
