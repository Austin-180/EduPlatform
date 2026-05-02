import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageTransition from '../components/PageTransition.jsx'

export default function Home() {
  const navigate = useNavigate()

  return (
    <PageTransition>
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg)',
        padding: '32px',
        overflowY: 'auto',
      }}>
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="card"
          style={{
            width: '100%',
            maxWidth: 560,
            padding: '48px 44px',
            boxShadow: 'var(--shadow-md)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          {/* Star icon */}
          <div style={{ fontSize: 48, lineHeight: 1, marginBottom: 22 }}>✨</div>

          {/* Title */}
          <h1 style={{
            fontSize: 28, fontWeight: 800,
            color: 'var(--text1)',
            lineHeight: 1.25,
            marginBottom: 14,
          }}>
            Welcome to AI Learning Platform
          </h1>

          {/* Subtitle */}
          <p style={{
            fontSize: 14.5,
            color: 'var(--text3)',
            lineHeight: 1.75,
            marginBottom: 36,
            maxWidth: 400,
          }}>
            Your personalized AI-powered learning experience. Master programming with an intelligent tutor, interactive exercises, and a built-in code sandbox.
          </p>

          {/* CTA */}
          <button
            className="btn btn-accent btn-lg"
            style={{ width: '65%', fontWeight: 700, justifyContent: 'center' }}
            onClick={() => navigate('/courses')}
          >
            Get Started
          </button>
        </motion.div>
      </div>
    </PageTransition>
  )
}
