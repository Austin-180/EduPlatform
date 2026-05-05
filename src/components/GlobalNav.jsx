import { useNavigate, useLocation } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'
import { useLanguage } from '../context/LanguageContext.jsx'

export default function GlobalNav() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { t } = useLanguage()

  const NAV_LINKS = [
    { path: '/',          label: t('home'),      icon: '🏠' },
    { path: '/dashboard', label: t('dashboard'), icon: '📖' },
    { path: '/courses',   label: t('courses'),   icon: '🗂️' },
    { path: '/tutor',     label: t('aiTutor'),   icon: '✨' },
    { path: '/sandbox',   label: t('sandbox'),   icon: '💻' },
    { path: '/settings',  label: t('settings'),  icon: '⚙️' },
  ]

  return (
    <header style={{
      height: 52, background: 'var(--nav-bg)',
      borderBottom: '1px solid var(--border)',
      display: 'flex', alignItems: 'center',
      padding: '0 20px', gap: 8, flexShrink: 0,
      position: 'sticky', top: 0, zIndex: 100,
      transition: 'background 0.25s, border-color 0.25s',
    }}>
      <button
        onClick={() => navigate('/')}
        style={{
          display: 'flex', alignItems: 'center', gap: 8,
          fontSize: 15, fontWeight: 800, color: 'var(--accent)',
          background: 'none', border: 'none', cursor: 'pointer',
          padding: 0, fontFamily: 'inherit',
        }}
      >
        <span style={{
          width: 28, height: 28, background: 'var(--accent)', borderRadius: 7,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'var(--accent-text)', fontSize: 12, fontWeight: 900,
        }}>E</span>
        EduPlatform
      </button>

      <span style={{ color: 'var(--border2)', fontSize: 18, margin: '0 4px' }}>/</span>

      <nav style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        {NAV_LINKS.map(link => {
          const active = pathname === link.path
          return (
            <button
              key={link.path}
              onClick={() => navigate(link.path)}
              style={{
                display: 'flex', alignItems: 'center', gap: 5,
                padding: '5px 10px', borderRadius: 7,
                fontSize: 13, fontWeight: active ? 600 : 500,
                color: active ? 'var(--text1)' : 'var(--text3)',
                background: active ? 'var(--surface2)' : 'none',
                border: 'none', cursor: 'pointer', fontFamily: 'inherit',
                transition: 'background 0.12s, color 0.12s',
              }}
            >
              <span style={{ fontSize: 14 }}>{link.icon}</span>
              {link.label}
            </button>
          )
        })}
      </nav>

      <div style={{ flex: 1 }} />
      <ThemeToggle />
    </header>
  )
}
