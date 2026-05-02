import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import ThemeToggle from '../components/ThemeToggle.jsx'

const SOCIAL_BTNS = [
  { label: 'Sign in with Google',   icon: 'G', iconColor: '#4285f4' },
  { label: 'Sign in with Apple',    icon: '',  iconColor: 'var(--text1)' },
  { label: 'Sign in with Facebook', icon: 'f', iconColor: '#1877f2' },
]

function SocialButton({ label, icon, iconColor, onClick }) {
  return (
    <button
      onClick={onClick}
      onMouseEnter={e => { e.currentTarget.style.background = 'var(--surface3)'; e.currentTarget.style.borderColor = 'var(--text3)' }}
      onMouseLeave={e => { e.currentTarget.style.background = 'var(--surface2)'; e.currentTarget.style.borderColor = 'var(--border2)' }}
      style={{
        width: '100%', height: 46,
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
        background: 'var(--surface2)',
        border: '1px solid var(--border2)',
        borderRadius: 10,
        fontSize: 14, fontWeight: 600,
        color: 'var(--text1)',
        cursor: 'pointer', fontFamily: 'inherit',
        transition: 'background 0.12s, border-color 0.12s',
      }}
    >
      <span style={{ fontSize: 15, fontWeight: 800, color: iconColor, minWidth: 20, textAlign: 'center', lineHeight: 1 }}>
        {icon || ''}
      </span>
      {label}
    </button>
  )
}

export default function Login() {
  const navigate = useNavigate()
  const go = () => navigate('/dashboard')

  return (
    <div style={{
      minHeight: '100vh',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--bg)',
      padding: '24px',
    }}>
      <div style={{ position: 'absolute', top: 16, right: 16 }}>
        <ThemeToggle />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="card"
        style={{ width: '100%', maxWidth: 400, padding: '40px 36px', boxShadow: 'var(--shadow-md)' }}
      >
        {/* Star icon */}
        <div style={{ textAlign: 'center', marginBottom: 16 }}>
          <span style={{ fontSize: 40, lineHeight: 1 }}>✨</span>
        </div>

        {/* Title */}
        <h1 style={{ fontSize: 26, fontWeight: 800, color: 'var(--text1)', textAlign: 'center', marginBottom: 8, lineHeight: 1.2 }}>
          Welcome
        </h1>

        {/* Subtitle */}
        <p style={{ fontSize: 13.5, color: 'var(--text3)', textAlign: 'center', marginBottom: 32, lineHeight: 1.6 }}>
          Begin your personalized AI learning journey
        </p>

        {/* Social buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
          {SOCIAL_BTNS.map(btn => (
            <SocialButton key={btn.label} {...btn} onClick={go} />
          ))}
        </div>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
          <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
          <span style={{ fontSize: 12, color: 'var(--text4)', fontWeight: 500, letterSpacing: '0.04em' }}>or</span>
          <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
        </div>

        {/* Continue as Guest */}
        <button
          onClick={go}
          onMouseEnter={e => { e.currentTarget.style.background = 'var(--surface2)'; e.currentTarget.style.color = 'var(--text1)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text3)' }}
          style={{
            width: '100%', height: 46,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'transparent',
            border: '1px solid var(--border2)',
            borderRadius: 10,
            fontSize: 14, fontWeight: 600,
            color: 'var(--text3)',
            cursor: 'pointer', fontFamily: 'inherit',
            transition: 'background 0.12s, color 0.12s',
          }}
        >
          Continue as Guest
        </button>
      </motion.div>
    </div>
  )
}
