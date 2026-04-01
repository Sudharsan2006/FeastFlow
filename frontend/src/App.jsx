import { useState, useEffect, useCallback } from 'react'
import { Toaster } from 'react-hot-toast'
import { AuthProvider, useAuth } from './context/AuthContext'
import Navbar from './components/Navbar'
import MenuPage from './pages/MenuPage'
import CartPage from './pages/CartPage'
import OrdersPage from './pages/OrdersPage'
import ContactPage from './pages/ContactPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import { getCart } from './api'

const toastStyle = {
  style: {
    background: '#1c1c1c', color: '#f5f5f5',
    border: '1px solid rgba(255,107,43,0.3)',
    borderRadius: '12px', fontFamily: "'Inter', sans-serif", fontSize: '0.875rem',
  },
  success: { iconTheme: { primary: '#22c55e', secondary: '#fff' } },
  error:   { iconTheme: { primary: '#ef4444', secondary: '#fff' } },
  duration: 3500,
}

function AppInner() {
  const { user, logout } = useAuth()
  const [authView, setAuthView]   = useState('login')   // 'login' | 'register'
  const [activeTab, setActiveTab] = useState('menu')
  const [cartCount, setCartCount] = useState(0)

  const refreshCartCount = useCallback(async () => {
    if (!user) return
    try {
      const { data } = await getCart()
      setCartCount(data.reduce((s, i) => s + i.quantity, 0))
    } catch { setCartCount(0) }
  }, [user])

  useEffect(() => { refreshCartCount() }, [refreshCartCount])

  const handleOrderPlaced = () => {
    setCartCount(0)
    setTimeout(() => setActiveTab('orders'), 800)
  }

  // ─── Not logged in → show auth screens ──────────────────────────────────
  if (!user) {
    return (
      <>
        <Toaster position="top-right" toastOptions={toastStyle} />
        {authView === 'login'
          ? <LoginPage    onSwitchToRegister={() => setAuthView('register')} />
          : <RegisterPage onSwitchToLogin={()    => setAuthView('login')}    />
        }
      </>
    )
  }

  // ─── Logged in → full app ────────────────────────────────────────────────
  return (
    <div className="app">
      <Toaster position="top-right" toastOptions={toastStyle} />

      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={cartCount}
        user={user}
        onLogout={logout}
      />

      <main style={{ flex: 1 }}>
        {activeTab === 'menu'    && <MenuPage    onCartUpdate={refreshCartCount} />}
        {activeTab === 'cart'    && <CartPage    onCartUpdate={refreshCartCount} onOrderPlaced={handleOrderPlaced} />}
        {activeTab === 'orders'  && <OrdersPage  />}
        {activeTab === 'contact' && <ContactPage />}
      </main>

      <footer className="footer">
        <div className="footer-brand">🍴 FeastFlow</div>
        <span className="footer-copy">© 2026 FeastFlow Restaurant. All rights reserved.</span>
        <div className="footer-links">
          <a className="footer-link" href="#" onClick={e=>{e.preventDefault();setActiveTab('menu')}}>Menu</a>
          <a className="footer-link" href="#" onClick={e=>{e.preventDefault();setActiveTab('orders')}}>Orders</a>
          <a className="footer-link" href="#" onClick={e=>{e.preventDefault();setActiveTab('contact')}}>Contact</a>
        </div>
      </footer>
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <AppInner />
    </AuthProvider>
  )
}
