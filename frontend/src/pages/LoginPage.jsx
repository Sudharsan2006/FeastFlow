import { useState } from 'react'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'

export default function LoginPage({ onSwitchToRegister }) {
  const { login } = useAuth()
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      await login(form.email, form.password)
      toast.success('Welcome back! 🎉')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={overlay}>
      <div style={card}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={logo}>🍴</div>
          <h1 style={title}>FeastFlow</h1>
          <p style={subtitle}>Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={group}>
            <label style={label}>Email Address</label>
            <input
              style={input}
              type="email" required autoFocus
              placeholder="you@example.com"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            />
          </div>
          <div style={group}>
            <label style={label}>Password</label>
            <input
              style={input}
              type="password" required
              placeholder="••••••••"
              value={form.password}
              onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
            />
          </div>

          <button style={btn(loading)} type="submit" disabled={loading}>
            {loading ? 'Signing in...' : '🔑 Sign In'}
          </button>
        </form>

        <p style={footer}>
          Don't have an account?{' '}
          <span style={link} onClick={onSwitchToRegister}>Create one</span>
        </p>
      </div>
    </div>
  )
}

/* ─── Inline styles ─── */
const overlay = {
  minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
  background: 'linear-gradient(135deg,#0d0d0d 0%,#1a0a00 50%,#0d0d0d 100%)',
  padding: '1rem',
}
const card = {
  width: '100%', maxWidth: 420,
  background: 'rgba(28,28,28,0.95)',
  border: '1px solid rgba(255,107,43,0.2)',
  borderRadius: 24, padding: '2.5rem',
  boxShadow: '0 24px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,107,43,0.08)',
  backdropFilter: 'blur(20px)',
}
const logo = {
  width: 64, height: 64, borderRadius: 18, margin: '0 auto 12px',
  background: 'linear-gradient(135deg,#ff6b2b,#ff9f1c)',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  fontSize: '1.8rem', boxShadow: '0 8px 32px rgba(255,107,43,0.4)',
}
const title = {
  fontFamily: "'Playfair Display',serif", fontSize: '1.8rem', fontWeight: 800,
  background: 'linear-gradient(135deg,#ff6b2b,#ff9f1c)',
  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: 4,
}
const subtitle = { color: '#a3a3a3', fontSize: '0.9rem' }
const group = { marginBottom: '1.2rem' }
const label = { display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#a3a3a3', marginBottom: 6 }
const input = {
  width: '100%', padding: '12px 16px',
  background: '#0d0d0d', border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: 12, color: '#f5f5f5', fontSize: '0.9rem',
  fontFamily: "'Inter',sans-serif", outline: 'none', boxSizing: 'border-box',
  transition: 'border-color 0.2s',
}
const btn = loading => ({
  width: '100%', padding: '13px', marginTop: '0.5rem',
  background: loading ? 'rgba(255,107,43,0.5)' : 'linear-gradient(135deg,#ff6b2b,#ff9f1c)',
  color: '#fff', border: 'none', borderRadius: 12,
  fontSize: '1rem', fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer',
  fontFamily: "'Inter',sans-serif", transition: 'all 0.2s',
  boxShadow: '0 4px 20px rgba(255,107,43,0.35)',
})
const footer = { textAlign: 'center', marginTop: '1.5rem', color: '#a3a3a3', fontSize: '0.875rem' }
const link = { color: '#ff6b2b', cursor: 'pointer', fontWeight: 600, textDecoration: 'underline' }
