import { useState } from 'react'
import { motion } from 'framer-motion'
import PageTransition from '../components/PageTransition.jsx'
import ThemeToggle from '../components/ThemeToggle.jsx'
import { useTheme } from '../context/ThemeContext.jsx'

const SECTION_DELAY = i => ({ duration: 0.35, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] })

function Section({ title, delay, children }) {
  return (
    <motion.div
      className="card"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={SECTION_DELAY(delay)}
      style={{ padding: '24px 26px', marginBottom: 20 }}
    >
      <h2 style={{ fontSize: 14, fontWeight: 700, color: 'var(--text1)', marginBottom: 18, paddingBottom: 12, borderBottom: '1px solid var(--border)' }}>
        {title}
      </h2>
      {children}
    </motion.div>
  )
}

function Row({ label, hint, children }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, marginBottom: 16 }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--text1)', marginBottom: 2 }}>{label}</div>
        {hint && <div style={{ fontSize: 12, color: 'var(--text4)' }}>{hint}</div>}
      </div>
      {children}
    </div>
  )
}

function Toggle({ on, onToggle }) {
  return (
    <button
      onClick={onToggle}
      style={{
        width: 42, height: 24, borderRadius: 999, flexShrink: 0,
        background: on ? 'var(--accent)' : 'var(--surface3)',
        border: '1px solid var(--border2)',
        cursor: 'pointer', position: 'relative', padding: 0,
        transition: 'background 0.2s',
      }}
    >
      <span style={{
        position: 'absolute', top: 4, left: 4,
        width: 14, height: 14, borderRadius: '50%',
        background: on ? '#fff' : 'var(--text4)',
        transition: 'transform 0.2s',
        transform: on ? 'translateX(18px)' : 'translateX(0)',
        display: 'block',
      }} />
    </button>
  )
}

function Select({ value, onChange, options }) {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      style={{
        padding: '7px 12px', borderRadius: 8,
        border: '1px solid var(--border2)',
        background: 'var(--surface2)', color: 'var(--text1)',
        fontSize: 13, fontFamily: 'inherit', cursor: 'pointer', outline: 'none',
      }}
    >
      {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  )
}

export default function Settings() {
  const { theme } = useTheme()
  const [lang, setLang] = useState('zh-TW')
  const [difficulty, setDifficulty] = useState('beginner')
  const [prefs, setPrefs] = useState({ emailNotif: true, weeklyReport: false, soundEffects: true, autoplay: false })
  const toggle = key => setPrefs(p => ({ ...p, [key]: !p[key] }))

  return (
    <PageTransition>
      <div style={{ flex: 1, overflowY: 'auto', padding: '32px', background: 'var(--bg)' }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ marginBottom: 28 }}
          >
            <p className="section-tag">Preferences</p>
            <h1 className="section-title">設定</h1>
            <p className="section-sub">管理你的帳號、外觀與學習偏好。</p>
          </motion.div>

          {/* Account */}
          <Section title="👤 帳號資訊" delay={1}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20, padding: '14px 16px', background: 'var(--surface2)', borderRadius: 10 }}>
              <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, fontWeight: 900, color: 'var(--accent-text)', flexShrink: 0 }}>
                D
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text1)' }}>Demo User</div>
                <div style={{ fontSize: 13, color: 'var(--text3)' }}>demo@eduplatform.dev</div>
              </div>
              <button className="btn btn-ghost btn-sm" style={{ marginLeft: 'auto' }}>編輯</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {[
                { label: '使用者名稱', value: 'demo_user' },
                { label: '加入時間',   value: '2025 年 1 月' },
                { label: '目前方案',   value: 'Free Plan' },
                { label: '帳號狀態',   value: '已驗證 ✓' },
              ].map(item => (
                <div key={item.label} style={{ padding: '12px 14px', background: 'var(--surface2)', borderRadius: 8 }}>
                  <div style={{ fontSize: 11.5, color: 'var(--text4)', marginBottom: 4 }}>{item.label}</div>
                  <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--text1)' }}>{item.value}</div>
                </div>
              ))}
            </div>
          </Section>

          {/* Appearance */}
          <Section title="🎨 外觀" delay={2}>
            <Row label="深色模式" hint={`目前：${theme === 'dark' ? '深色' : '淺色'}模式`}>
              <ThemeToggle />
            </Row>
            <Row label="介面語言" hint="影響按鈕與說明文字">
              <Select
                value={lang}
                onChange={setLang}
                options={[
                  { value: 'zh-TW', label: '繁體中文' },
                  { value: 'zh-CN', label: '简体中文' },
                  { value: 'en',    label: 'English'  },
                ]}
              />
            </Row>
          </Section>

          {/* Learning */}
          <Section title="📚 學習偏好" delay={3}>
            <Row label="預設難度" hint="影響推薦課程與題目">
              <Select
                value={difficulty}
                onChange={setDifficulty}
                options={[
                  { value: 'beginner',     label: '入門' },
                  { value: 'intermediate', label: '進階' },
                  { value: 'advanced',     label: '挑戰' },
                ]}
              />
            </Row>
            <Row label="自動播放下一堂" hint="完成後自動跳到下一章節">
              <Toggle on={prefs.autoplay} onToggle={() => toggle('autoplay')} />
            </Row>
            <Row label="答題音效" hint="完成與答對時播放音效">
              <Toggle on={prefs.soundEffects} onToggle={() => toggle('soundEffects')} />
            </Row>
          </Section>

          {/* Notifications */}
          <Section title="🔔 通知" delay={4}>
            <Row label="電子郵件通知" hint="學習提醒與課程更新">
              <Toggle on={prefs.emailNotif} onToggle={() => toggle('emailNotif')} />
            </Row>
            <Row label="每週學習報告" hint="每週日寄送學習摘要至信箱">
              <Toggle on={prefs.weeklyReport} onToggle={() => toggle('weeklyReport')} />
            </Row>
          </Section>

          {/* Danger zone */}
          <Section title="⚠️ 危險區域" delay={5}>
            <p style={{ fontSize: 13, color: 'var(--text3)', marginBottom: 14 }}>
              以下操作無法還原，請謹慎操作。
            </p>
            <div style={{ display: 'flex', gap: 12 }}>
              <button className="btn btn-ghost btn-sm" style={{ color: 'var(--danger)', borderColor: 'var(--danger)' }}>
                重設學習進度
              </button>
              <button className="btn btn-ghost btn-sm" style={{ color: 'var(--danger)', borderColor: 'var(--danger)' }}>
                刪除帳號
              </button>
            </div>
          </Section>

        </div>
      </div>
    </PageTransition>
  )
}
