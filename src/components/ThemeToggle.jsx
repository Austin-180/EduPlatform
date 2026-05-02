import { useTheme } from '../context/ThemeContext'

export default function ThemeToggle() {
  const { theme, toggle } = useTheme()
  return (
    <button
      onClick={toggle}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      style={{
        width: 38, height: 21,
        background: theme === 'dark' ? 'var(--accent)' : 'var(--surface3)',
        border: '1px solid var(--border2)',
        borderRadius: 999,
        cursor: 'pointer',
        position: 'relative',
        transition: 'background 0.2s',
        flexShrink: 0,
        padding: 0,
      }}
    >
      <span style={{
        position: 'absolute',
        top: 3, left: 3,
        width: 13, height: 13,
        background: 'var(--accent)',
        borderRadius: '50%',
        transition: 'transform 0.2s',
        transform: theme === 'dark' ? 'translateX(17px)' : 'translateX(0)',
        display: 'block',
      }} />
    </button>
  )
}
