import { useState, useEffect, useCallback } from 'react'
import toast from 'react-hot-toast'
import { Plus, Trash2, RefreshCw, Search, Star, ShoppingCart } from 'lucide-react'
import { getMenu, addMenuItem, deleteMenuItem, addToCart } from '../api'
import { getFoodInfo, formatCurrency } from '../utils'

const CATEGORIES = ['All','Italian','Indian','American','Asian','Seafood','Dessert','Beverages','Healthy','Grill']

export default function MenuPage({ onCartUpdate }) {
  const [menu, setMenu]       = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch]   = useState('')
  const [category, setCategory] = useState('All')
  const [newName, setNewName] = useState('')
  const [newPrice, setNewPrice] = useState('')
  const [adding, setAdding]   = useState(false)
  const [qty, setQty]         = useState({})
  const [busyCart, setBusyCart] = useState({})
  const [favs, setFavs]       = useState(new Set())

  const fetchMenu = useCallback(async () => {
    try { setLoading(true); const { data } = await getMenu(); setMenu(data) }
    catch { toast.error('Failed to load menu') }
    finally { setLoading(false) }
  }, [])

  useEffect(() => { fetchMenu() }, [fetchMenu])

  const getQty = id => qty[id] ?? 1
  const changeQty = (id, d) => setQty(q => ({ ...q, [id]: Math.max(1, (q[id] ?? 1) + d) }))

  const handleAddToCart = async item => {
    setBusyCart(b => ({ ...b, [item.id]: true }))
    try {
      await addToCart({ menuId: item.id, quantity: getQty(item.id) })
      toast.success(`Added ${item.name} to cart! 🛒`)
      onCartUpdate()
    } catch (e) {
      toast.error(e.response?.data?.message || 'Add to cart failed')
    } finally {
      setBusyCart(b => ({ ...b, [item.id]: false }))
    }
  }

  const handleAdd = async e => {
    e.preventDefault(); if (!newName.trim() || !newPrice) return
    setAdding(true)
    try {
      await addMenuItem({ name: newName.trim(), price: parseFloat(newPrice) })
      toast.success(`"${newName}" added! 🎉`); setNewName(''); setNewPrice(''); fetchMenu()
    } catch (e) {
      const errs = e.response?.data?.details
      if (errs) Object.values(errs).forEach(m => toast.error(m))
      else toast.error('Failed to add item')
    } finally { setAdding(false) }
  }

  const handleDelete = async item => {
    if (!confirm(`Remove "${item.name}"?`)) return
    try { await deleteMenuItem(item.id); toast.success('Removed'); fetchMenu() }
    catch { toast.error('Delete failed') }
  }

  const toggleFav = id => setFavs(f => { const n = new Set(f); n.has(id) ? n.delete(id) : n.add(id); return n })

  const filtered = menu.filter(m => {
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase())
    const info = getFoodInfo(m.name)
    const matchCat = category === 'All' || info.category === category
    return matchSearch && matchCat
  })

  const avgPrice = menu.length ? Math.round(menu.reduce((s,m) => s + m.price, 0) / menu.length) : 0

  return (
    <div>
      {/* ── Hero ── */}
      <section className="hero-section">
        <div className="hero-bg" />
        <div className="hero-content">
          <div>
            <div className="hero-badge">🔥 Fresh Every Day</div>
            <h1 className="hero-title">
              Experience The
              <span className="accent">Art of Dining</span>
            </h1>
            <p className="hero-desc">
              Handcrafted dishes made from farm-fresh ingredients by award-winning chefs. Order online and have perfection delivered to your door.
            </p>
            <div className="hero-actions">
              <button className="btn btn-primary btn-lg" onClick={() => document.getElementById('menu-grid').scrollIntoView({ behavior:'smooth' })}>
                🍽️ Explore Menu
              </button>
              <button
                className="btn btn-outline btn-lg"
                onClick={() => window.open('https://www.google.com/maps/search/42+Culinary+Lane+Food+Street+Chennai', '_blank')}
              >
                📍 Find Location
              </button>
            </div>
            <div className="hero-stats">
              <div className="hero-stat">
                <span className="hero-stat-val">{menu.length}+</span>
                <span className="hero-stat-label">Dishes</span>
              </div>
              <div className="hero-stat">
                <span className="hero-stat-val">4.9★</span>
                <span className="hero-stat-label">Rating</span>
              </div>
              <div className="hero-stat">
                <span className="hero-stat-val">25min</span>
                <span className="hero-stat-label">Delivery</span>
              </div>
              <div className="hero-stat">
                <span className="hero-stat-val">10k+</span>
                <span className="hero-stat-label">Orders</span>
              </div>
            </div>
          </div>
          {/* Hero image cards */}
          <div className="hero-cards">
            {[
              { src:'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&q=80', name:'Chicken Biryani' },
              { src:'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80', name:'Margherita Pizza' },
              { src:'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80', name:'Gourmet Burger' },
              { src:'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=80', name:'Chocolate Cake' },
            ].map((c,i) => (
              <div key={i} className="hero-food-card" data-name={c.name}>
                <img src={c.src} alt={c.name} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="page-wrap" id="menu-grid">
        {/* Stats */}
        <div className="stats-grid">
          <div className="stat-card"><div className="stat-icon">🍽️</div><div className="stat-lbl">Total Items</div><div className="stat-val orange">{menu.length}</div></div>
          <div className="stat-card"><div className="stat-icon">💰</div><div className="stat-lbl">Avg Price</div><div className="stat-val orange">₹{avgPrice}</div></div>
          <div className="stat-card"><div className="stat-icon">⭐</div><div className="stat-lbl">Rating</div><div className="stat-val gold">4.9 / 5</div></div>
          <div className="stat-card"><div className="stat-icon">⚡</div><div className="stat-lbl">Delivery Time</div><div className="stat-val green">25 min</div></div>
        </div>

        {/* Admin add form */}
        <form className="add-form" onSubmit={handleAdd}>
          <input className="form-input" value={newName} onChange={e=>setNewName(e.target.value)} placeholder="Item name (e.g. Margherita Pizza)" required />
          <input className="form-input" type="number" min="1" step="0.01" value={newPrice} onChange={e=>setNewPrice(e.target.value)} placeholder="Price (₹)" style={{maxWidth:150}} required />
          <button className="btn btn-primary" type="submit" disabled={adding}><Plus size={16}/>{adding?'Adding...':'Add Item'}</button>
        </form>

        {/* Filters */}
        <div className="section-hd">
          <div className="section-hd-left">
            <span className="section-eyebrow">Our Specialties</span>
            <h2 className="section-ttl">Explore the Menu</h2>
          </div>
          <div style={{display:'flex',gap:10,alignItems:'center'}}>
            <div className="search-wrap">
              <Search size={14} className="search-icon" />
              <input className="search-input" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search dishes..." />
            </div>
            <button className="btn btn-ghost btn-sm" onClick={fetchMenu}><RefreshCw size={14}/></button>
          </div>
        </div>

        <div className="filter-row">
          {CATEGORIES.map(c => (
            <button key={c} className={`filter-chip ${category===c?'active':''}`} onClick={()=>setCategory(c)}>{c}</button>
          ))}
        </div>

        {/* Grid */}
        {loading ? <div className="loading-wrap"><div className="spinner"/></div>
        : filtered.length === 0 ? (
          <div className="empty"><div className="empty-ico">🍽️</div><h3>No dishes found</h3><p>{search?'Try another search':'Add your first dish above'}</p></div>
        ) : (
          <div className="menu-grid">
            {filtered.map((item,i) => {
              const info = getFoodInfo(item.name)
              return (
                <div className="menu-card" key={item.id} style={{animationDelay:`${i*0.05}s`}}>
                  <div className="menu-card-img-wrap">
                    <img src={info.img} alt={item.name} loading="lazy" />
                    <span className="menu-card-badge">{info.category}</span>
                    <button className="menu-card-fav" onClick={()=>toggleFav(item.id)}>
                      {favs.has(item.id)?'❤️':'🤍'}
                    </button>
                  </div>
                  <div className="menu-card-body">
                    <div className="menu-card-category">{info.category}</div>
                    <div className="menu-card-name">{item.name}</div>
                    <div className="menu-card-desc">{info.desc}</div>
                    <div className="menu-card-footer">
                      <div className="menu-card-price">{formatCurrency(item.price)}</div>
                      <div className="menu-card-actions">
                        <div className="qty-row">
                          <button className="qty-btn" onClick={()=>changeQty(item.id,-1)}>−</button>
                          <span className="qty-val">{getQty(item.id)}</span>
                          <button className="qty-btn" onClick={()=>changeQty(item.id,+1)}>+</button>
                        </div>
                        <button className="btn btn-primary btn-sm" onClick={()=>handleAddToCart(item)} disabled={busyCart[item.id]}>
                          <ShoppingCart size={14}/>{busyCart[item.id]?'...':'Add'}
                        </button>
                        <button className="btn btn-danger btn-icon btn-sm" onClick={()=>handleDelete(item)}><Trash2 size={14}/></button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
