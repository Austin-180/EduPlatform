import { useState } from 'react'

const DEFAULT_CODE = `# Write your code here...
# Your AI tutor will help you debug and improve

def greet(name):
    return f"Hello, {name}!"

print(greet("World"))`

export default function CodeSandboxPanel({ compact = false }) {
  const [code, setCode]       = useState(DEFAULT_CODE)
  const [output, setOutput]   = useState('Ready to run your code...')
  const [running, setRunning] = useState(false)

  const run = () => {
    setRunning(true)
    setOutput('Running...')
    setTimeout(() => {
      setOutput('Hello, World!\n\n>>> Process finished with exit code 0')
      setRunning(false)
    }, 1200)
  }

  return (
    <aside style={{
      width: compact ? '100%' : 400,
      minWidth: compact ? 'unset' : 400,
      background: 'var(--surface)',
      border: compact ? 'none' : '1px solid var(--border)',
      borderRadius: compact ? 0 : 10,
      boxShadow: compact ? 'none' : 'var(--shadow-sm)',
      display: 'flex', flexDirection: 'column',
      overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{
        padding: '13px 16px',
        borderBottom: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', gap: 8,
        flexShrink: 0,
      }}>
        <span style={{ fontSize: 13, color: 'var(--primary)', fontFamily: 'monospace', fontWeight: 700 }}>{'<>'}</span>
        <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text1)' }}>Code Sandbox</span>
        <span style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--text4)', padding: '2px 8px', background: 'var(--surface2)', borderRadius: 4, border: '1px solid var(--border)', fontFamily: 'monospace' }}>
          python
        </span>
      </div>

      {/* Editor */}
      <textarea
        value={code}
        onChange={e => setCode(e.target.value)}
        spellCheck={false}
        style={{
          flex: 1, padding: '14px 16px',
          background: 'var(--code-bg)',
          border: 'none', outline: 'none',
          color: 'var(--code-text)',
          fontFamily: "'SF Mono','Fira Code','Cascadia Code',Consolas,monospace",
          fontSize: 13, lineHeight: 1.8,
          resize: 'none', minHeight: compact ? 200 : 0,
          width: '100%',
        }}
      />

      {/* Run button */}
      <div style={{ padding: '12px 16px 0', flexShrink: 0 }}>
        <button
          onClick={run}
          disabled={running}
          style={{
            width: '100%', padding: '12px',
            background: running ? 'var(--surface2)' : 'var(--accent)',
            color: running ? 'var(--text3)' : 'var(--accent-text)',
            border: 'none', borderRadius: 8,
            fontSize: 14, fontWeight: 700,
            cursor: running ? 'not-allowed' : 'pointer',
            fontFamily: 'inherit',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            transition: 'background 0.15s, color 0.15s',
            boxShadow: running ? 'none' : '0 2px 12px rgba(245,200,66,.25)',
          }}
        >
          {running ? '⏳ Running...' : '▶ Run & Debug'}
        </button>
      </div>

      {/* Output */}
      <div style={{ margin: '12px 16px 16px', padding: '12px 14px', background: 'var(--code-bg)', borderRadius: 8, flexShrink: 0 }}>
        <div style={{ fontSize: 10.5, color: 'var(--text3)', marginBottom: 6, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em' }}>
          Output:
        </div>
        <pre style={{ fontSize: 12.5, color: 'var(--code-text)', fontFamily: "'SF Mono','Fira Code',Consolas,monospace", whiteSpace: 'pre-wrap', margin: 0, lineHeight: 1.65 }}>
          {output}
        </pre>
      </div>
    </aside>
  )
}
