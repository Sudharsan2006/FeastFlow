import { useState, useEffect, useCallback } from 'react'
import toast from 'react-hot-toast'
import { ShoppingCart, Trash2, RefreshCw, ShoppingBag, Truck, Shield, Tag } from 'lucide-react'
import { getCart, clearCart, placeOrder } from '../api'
import { getFoodInfo, formatCurrency } from '../utils'

export default function CartPage({ onCartUpdate, onOrderPlaced }) {
  const [cart, setCart]       = useState([])
  const [loading, setLoading] = useState(true)
  const [placing, setPlacing] = useState(false)
  const [clearing, setClearing] = useState(false)

  const fetchCart = useCallback(async () => {
    try { setLoading(true); const { data } = await getCart(); setCart(data) }
    catch { toast.error('Failed to load cart') }
    finally { setLoading(false) }
  }, [])

  useEffect(() => { fetchCart() }, [fetchCart])

  const subtotal = cart.reduce((s,i) => s + i.menu.price * i.quantity, 0)
  const tax      = Math.round(subtotal * 0.05)
  const delivery = subtotal >= 500 ? 0 : 49
  const total    = subtotal + tax + delivery
  const itemCount = cart.reduce((s,i) => s + i.quantity, 0)

  const handleClear = async () => {
    if (!confirm('Clear all items?')) return
    setClearing(true)
    try { await clearCart(); setCart([]); onCartUpdate(); toast.success('Cart cleared') }
    catch { toast.error('Failed') }
    finally { setClearing(false) }
  }

  const handlePlace = async () => {
    if (cart.length===0) { toast.error('Cart is empty!'); return }
    setPlacing(true)
    try {
      const { data } = await placeOrder()
      toast.success(`🎉 Order #${data.id} placed! ${formatCurrency(data.totalAmount)}`, { duration:5000 })
      setCart([]); onCartUpdate(); onOrderPlaced()
    } catch (e) {
      toast.error(e.response?.data?.message || 'Order failed')
    } finally { setPlacing(false) }
  }

  return (
    <div className="page-wrap" style={{paddingTop:'2.5rem'}}>
      <div className="section-hd">
        <div className="section-hd-left">
          <span className="section-eyebrow">Your Selection</span>
          <h2 className="section-ttl">
            Shopping Cart
            {itemCount > 0 && <span className="badge b-preparing" style={{marginLeft:10,fontSize:'0.75rem'}}>{itemCount} items</span>}
          </h2>
        </div>
        <div style={{display:'flex',gap:8}}>
          <button className="btn btn-ghost btn-sm" onClick={fetchCart}><RefreshCw size={14}/> Refresh</button>
          {cart.length>0 && <button className="btn btn-danger btn-sm" onClick={handleClear} disabled={clearing}><Trash2 size={14}/>{clearing?'Clearing...':'Clear All'}</button>}
        </div>
      </div>

      {loading ? <div className="loading-wrap"><div className="spinner"/></div>
      : cart.length===0 ? (
        <div className="empty">
          <div className="empty-ico">🛒</div>
          <h3>Your cart is empty</h3>
          <p>Browse our menu and add some delicious dishes!</p>
        </div>
      ) : (
        <div className="cart-layout">
          {/* Items */}
          <div style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
            {cart.map((item,i) => {
              const info = getFoodInfo(item.menu.name)
              return (
                <div className="cart-item" key={item.id} style={{animationDelay:`${i*0.06}s`}}>
                  <img className="cart-item-img" src={info.img} alt={item.menu.name} />
                  <div className="cart-item-body">
                    <div className="cart-item-name">{item.menu.name}</div>
                    <div className="cart-item-sub" style={{marginTop:4}}>
                      <span style={{color:'var(--orange)',fontWeight:700}}>{formatCurrency(item.menu.price)}</span>
                      {' '}× {item.quantity} {item.quantity>1?'units':'unit'}
                    </div>
                    <div style={{marginTop:6,fontSize:'0.78rem',color:'var(--text3)'}}>
                      {info.category} • {info.desc.slice(0,50)}…
                    </div>
                  </div>
                  <div className="cart-item-right">
                    <span className="cart-item-price">{formatCurrency(item.menu.price * item.quantity)}</span>
                  </div>
                </div>
              )
            })}

            {/* Promo banner */}
            {subtotal < 500 && (
              <div style={{
                background:'rgba(255,107,43,0.08)', border:'1px solid rgba(255,107,43,0.2)',
                borderRadius:'var(--r-md)', padding:'1rem 1.25rem',
                display:'flex', alignItems:'center', gap:10, fontSize:'0.875rem'
              }}>
                <Tag size={16} style={{color:'var(--orange)',flexShrink:0}}/>
                <span style={{color:'var(--text2)'}}>Add <strong style={{color:'var(--orange)'}}>{formatCurrency(500-subtotal)}</strong> more to get <strong style={{color:'var(--green)'}}>FREE delivery!</strong> 🚀</span>
              </div>
            )}
          </div>

          {/* Summary */}
          <div className="summary-box">
            <div className="summary-title"><ShoppingBag size={18}/> Order Summary</div>
            {cart.map(item => (
              <div className="s-row" key={item.id}>
                <span>{item.menu.name} ×{item.quantity}</span>
                <span>{formatCurrency(item.menu.price * item.quantity)}</span>
              </div>
            ))}
            <div className="s-row"><span>Subtotal</span><span>{formatCurrency(subtotal)}</span></div>
            <div className="s-row"><span>GST (5%)</span><span>{formatCurrency(tax)}</span></div>
            <div className="s-row">
              <span>Delivery <span style={{fontSize:'0.72rem',color:'var(--text3)'}}>(orders ≥₹500 free)</span></span>
              <span style={{color: delivery===0?'var(--green)':'inherit'}}>{delivery===0?'FREE 🎉':formatCurrency(delivery)}</span>
            </div>
            <div className="s-total">
              <span>Total</span>
              <span className="s-total-val">{formatCurrency(total)}</span>
            </div>
            <button
              className="btn btn-primary"
              style={{width:'100%',padding:'14px',fontSize:'1rem',borderRadius:'var(--r-md)'}}
              onClick={handlePlace} disabled={placing}
            >
              {placing ? '⏳ Placing Order...' : '🛍️ Place Order Now'}
            </button>
            <div className="trust-badges">
              <span className="trust-badge"><Shield size={12}/> Secure</span>
              <span className="trust-badge"><Truck size={12}/> Fast Delivery</span>
              <span className="trust-badge">💳 Cash on Delivery</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
