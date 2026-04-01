import { UtensilsCrossed, ShoppingCart, ClipboardList, Phone, LogOut } from 'lucide-react'

export default function Navbar({ activeTab, setActiveTab, cartCount, user, onLogout }) {
  const tabs = [
    { id: 'menu',    label: 'Menu',    icon: <UtensilsCrossed size={15}/> },
    { id: 'cart',    label: 'Cart',    icon: <ShoppingCart size={15}/> },
    { id: 'orders',  label: 'Orders',  icon: <ClipboardList size={15}/> },
    { id: 'contact', label: 'Contact', icon: <Phone size={15}/> },
  ]

  return (
    <nav className="navbar">
      <div className="nav-brand" onClick={() => setActiveTab('menu')}>
        <div className="nav-logo">🍴</div>
        <span className="nav-name">FeastFlow</span>
      </div>

      <div className="nav-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.id === 'cart' ? (
              <span className="cart-wrap" style={{ position:'relative', display:'flex', alignItems:'center' }}>
                {tab.icon}
                {cartCount > 0 && (
                  <span className="cart-dot" key={cartCount}>{cartCount > 9 ? '9+' : cartCount}</span>
                )}
              </span>
            ) : tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="nav-right" style={{ display:'flex', alignItems:'center', gap:10 }}>
        {/* User greeting */}
        {user && (
          <div style={{
            display:'flex', alignItems:'center', gap:8,
            background:'rgba(255,107,43,0.1)', border:'1px solid rgba(255,107,43,0.2)',
            borderRadius:50, padding:'5px 14px 5px 8px',
          }}>
            <div style={{
              width:28, height:28, borderRadius:'50%', flexShrink:0,
              background:'linear-gradient(135deg,#ff6b2b,#ff9f1c)',
              display:'flex', alignItems:'center', justifyContent:'center',
              fontSize:'0.75rem', fontWeight:800, color:'#fff',
            }}>
              {user.name?.[0]?.toUpperCase() || '?'}
            </div>
            <span style={{ fontSize:'0.8rem', fontWeight:600, color:'#f5f5f5', maxWidth:80, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
              {user.name}
            </span>
          </div>
        )}

        <button
          className="btn btn-ghost btn-sm"
          onClick={onLogout}
          style={{ display:'flex', alignItems:'center', gap:5, color:'#ef4444', borderColor:'rgba(239,68,68,0.3)' }}
          title="Log out"
        >
          <LogOut size={14}/> Logout
        </button>
      </div>
    </nav>
  )
}
