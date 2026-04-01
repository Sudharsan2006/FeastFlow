import { useState } from 'react'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'

export default function RegisterPage({ onSwitchToLogin }) {
  const { register } = useAuth()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault()
    if (form.password !== form.confirm) { toast.error('Passwords do not match'); return }
    if (form.password.length < 6) { toast.error('Password must be at least 6 characters'); return }
    setLoading(true)
    try {
      await register(form.name, form.email, form.password)
      toast.success(`Welcome to FeastFlow, ${form.name}! 🎉`)
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  const set = key => e => setForm(f => ({ ...f, [key]: e.target.value }))

  return (
    <div style={overlay}>
      <div style={card}>
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <div style={logo}>🍴</div>
          <h1 style={title}>Create Account</h1>
          <p style={subtitle}>Join FeastFlow and start ordering</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={group}>
            <label style={label}>Full Name</label>
            <input style={inp} placeholder="Sharan" required value={form.name} onChange={set('name')} />
          </div>
          <div style={group}>
            <label style={label}>Email Address</label>
            <input style={inp} type="email" placeholder="you@example.com" required value={form.email} onChange={set('email')} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div style={group}>
              <label style={label}>Password</label>
              <input style={inp} type="password" placeholder="••••••••" required value={form.password} onChange={set('password')} />
            </div>
            <div style={group}>
              <label style={label}>Confirm</label>
              <input style={inp} type="password" placeholder="••••••••" required value={form.confirm} onChange={set('confirm')} />
            </div>
          </div>

          <button style={btn(loading)} type="submit" disabled={loading}>
            {loading ? 'Creating account...' : '🚀 Create Account'}
          </button>
        </form>

        <p style={footer}>
          Already have an account?{' '}
          <span style={lnk} onClick={onSwitchToLogin}>Sign in</span>
        </p>
      </div>
    </div>
  )
}

const overlay = {
  minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
  background: 'linear-gradient(135deg,#0d0d0d 0%,#1a0a00 50%,#0d0d0d 100%)',
  padding: '1rem',
}
const card = {
  width: '100%', maxWidth: 460,
  background: 'rgba(28,28,28,0.95)', border: '1px solid rgba(255,107,43,0.2)',
  borderRadius: 24, padding: '2.5rem',
  boxShadow: '0 24px 80px rgba(0,0,0,0.6)', backdropFilter: 'blur(20px)',
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
const group = { marginBottom: '1.1rem' }
const label = { display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#a3a3a3', marginBottom: 6 }
const inp = {
  width: '100%', padding: '11px 14px',
  background: '#0d0d0d', border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: 12, color: '#f5f5f5', fontSize: '0.875rem',
  fontFamily: "'Inter',sans-serif", outline: 'none', boxSizing: 'border-box',
}
const btn = l => ({
  width: '100%', padding: '13px', marginTop: '0.5rem',
  background: l ? 'rgba(255,107,43,0.5)' : 'linear-gradient(135deg,#ff6b2b,#ff9f1c)',
  color: '#fff', border: 'none', borderRadius: 12,
  fontSize: '1rem', fontWeight: 700, cursor: l ? 'not-allowed' : 'pointer',
  fontFamily: "'Inter',sans-serif", boxShadow: '0 4px 20px rgba(255,107,43,0.35)',
})
const footer = { textAlign: 'center', marginTop: '1.5rem', color: '#a3a3a3', fontSize: '0.875rem' }
const lnk = { color: '#ff6b2b', cursor: 'pointer', fontWeight: 600, textDecoration: 'underline' }
