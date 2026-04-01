import { useState, useEffect, useCallback } from 'react'
import toast from 'react-hot-toast'
import { ClipboardList, RefreshCw, CheckCircle, Clock, XCircle, TrendingUp } from 'lucide-react'
import { getAllOrders, updateOrderStatus } from '../api'
import { getFoodInfo, formatCurrency, formatDate, STATUS_OPTIONS } from '../utils'

function StatusBadge({ status }) {
  const cfg = {
    PENDING:   { cls:'b-pending',   icon:'⏳', label:'Pending' },
    PREPARING: { cls:'b-preparing', icon:'👨‍🍳',  label:'Preparing' },
    DELIVERED: { cls:'b-delivered', icon:'✅', label:'Delivered' },
    CANCELLED: { cls:'b-cancelled', icon:'❌', label:'Cancelled' },
  }
  const c = cfg[status] || cfg.PENDING
  return <span className={`badge ${c.cls}`}>{c.icon} {c.label}</span>
}

export default function OrdersPage() {
  const [orders, setOrders]   = useState([])
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState({})

  const fetchOrders = useCallback(async () => {
    try { setLoading(true); const { data } = await getAllOrders(); setOrders(data.sort((a,b)=>b.id-a.id)) }
    catch { toast.error('Failed to load orders') }
    finally { setLoading(false) }
  }, [])

  useEffect(() => { fetchOrders() }, [fetchOrders])

  const handleUpdate = async (id, status) => {
    setUpdating(u => ({ ...u, [id]: true }))
    try {
      await updateOrderStatus(id, status)
      toast.success(`Order #${id} → ${status} ✅`)
      fetchOrders()
    } catch (e) {
      toast.error(e.response?.data?.message || 'Cannot update order')
    } finally { setUpdating(u => ({ ...u, [id]: false })) }
  }

  const revenue   = orders.filter(o=>o.status==='DELIVERED').reduce((s,o)=>s+o.totalAmount,0)
  const delivered = orders.filter(o=>o.status==='DELIVERED').length
  const preparing = orders.filter(o=>o.status==='PREPARING').length
  const pending   = orders.filter(o=>o.status==='PENDING').length

  return (
    <div className="page-wrap" style={{paddingTop:'2.5rem'}}>
      <div className="section-hd">
        <div className="section-hd-left">
          <span className="section-eyebrow">Order Management</span>
          <h2 className="section-ttl">All Orders <span className="badge b-preparing" style={{fontSize:'0.8rem',marginLeft:8}}>{orders.length}</span></h2>
        </div>
        <button className="btn btn-ghost btn-sm" onClick={fetchOrders}><RefreshCw size={14}/> Refresh</button>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        <div className="stat-card"><div className="stat-icon"><TrendingUp size={20} style={{color:'var(--orange)'}}/></div><div className="stat-lbl">Revenue</div><div className="stat-val orange">{formatCurrency(revenue)}</div></div>
        <div className="stat-card"><div className="stat-icon"><CheckCircle size={20} style={{color:'var(--green)'}}/></div><div className="stat-lbl">Delivered</div><div className="stat-val green">{delivered}</div></div>
        <div className="stat-card"><div className="stat-icon" style={{fontSize:'1.4rem'}}>👨‍🍳</div><div className="stat-lbl">Preparing</div><div className="stat-val blue">{preparing}</div></div>
        <div className="stat-card"><div className="stat-icon"><Clock size={20} style={{color:'var(--gold)'}}/></div><div className="stat-lbl">Pending</div><div className="stat-val gold">{pending}</div></div>
      </div>

      {loading ? <div className="loading-wrap"><div className="spinner"/></div>
      : orders.length===0 ? (
        <div className="empty"><div className="empty-ico">📋</div><h3>No orders yet</h3><p>Place your first order from the Menu tab!</p></div>
      ) : (
        <div style={{display:'flex',flexDirection:'column',gap:'1.25rem'}}>
          {orders.map((order,i) => {
            const canUpdate = order.status!=='DELIVERED' && order.status!=='CANCELLED'
            const items = order.itemsSummary ? order.itemsSummary.split(',').map(s=>s.trim()) : []
            const firstItem = items[0] || ''
            const info = getFoodInfo(firstItem)

            return (
              <div className="order-card" key={order.id} style={{animationDelay:`${i*0.05}s`}}>
                <div className="order-card-head">
                  <div style={{display:'flex',alignItems:'center',gap:14}}>
                    <img src={info.img} alt="" style={{width:56,height:56,borderRadius:'var(--r-sm)',objectFit:'cover',flexShrink:0}}/>
                    <div>
                      <div className="order-id">Order <sup>#{order.id}</sup></div>
                      <div style={{fontSize:'0.8rem',color:'var(--text2)',marginTop:2}}>{items.length} item{items.length!==1?'s':''}</div>
                    </div>
                  </div>
                  <StatusBadge status={order.status}/>
                </div>

                <div className="order-body">
                  <div className="order-meta">
                    <span className="order-meta-label">Items</span>
                    <span className="order-meta-val" style={{fontSize:'0.875rem',color:'var(--text2)'}}>{order.itemsSummary || '—'}</span>
                  </div>
                  <div className="order-meta">
                    <span className="order-meta-label">Total</span>
                    <span className="order-meta-val" style={{background:'linear-gradient(135deg,var(--orange),var(--orange2))',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',fontSize:'1.1rem'}}>
                      {formatCurrency(order.totalAmount)}
                    </span>
                  </div>
                  <div className="order-meta">
                    <span className="order-meta-label">Placed At</span>
                    <span className="order-meta-val" style={{fontSize:'0.82rem',color:'var(--text2)'}}>{formatDate(order.createdAt)}</span>
                  </div>
                </div>

                {canUpdate && (
                  <div className="order-footer">
                    <span style={{fontSize:'0.78rem',color:'var(--text3)'}}>Update:</span>
                    {STATUS_OPTIONS.filter(s=>s!==order.status).map(s => (
                      <button
                        key={s}
                        className={`btn btn-sm ${s==='DELIVERED'?'btn-success':s==='CANCELLED'?'btn-danger':'btn-ghost'}`}
                        onClick={()=>handleUpdate(order.id,s)}
                        disabled={updating[order.id]}
                      >
                        {updating[order.id] ? '...'
                          : s==='DELIVERED' ? '✅ Delivered'
                          : s==='CANCELLED' ? '❌ Cancel'
                          : s==='PREPARING' ? '👨‍🍳 Preparing'
                          : s}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
