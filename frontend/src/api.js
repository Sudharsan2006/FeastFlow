import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:9090',
  headers: { 'Content-Type': 'application/json' },
})

// ─── Attach JWT on every request ─────────────────────────────────────────────
api.interceptors.request.use(config => {
  const token = localStorage.getItem('ff_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// ─── Auto-logout on 401 ──────────────────────────────────────────────────────
api.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
      localStorage.removeItem('ff_token')
      localStorage.removeItem('ff_user')
      window.location.reload()
    }
    return Promise.reject(err)
  }
)

// ─── Auth ─────────────────────────────────────────────────────────────────────
export const loginUser    = (data) => api.post('/auth/login', data)
export const registerUser = (data) => api.post('/auth/register', data)

// ─── Menu ─────────────────────────────────────────────────────────────────────
export const getMenu       = ()           => api.get('/menu')
export const addMenuItem   = (data)       => api.post('/menu', data)
export const deleteMenuItem= (id)         => api.delete(`/menu/${id}`)

// ─── Cart ─────────────────────────────────────────────────────────────────────
export const getCart      = ()            => api.get('/cart')
export const addToCart    = (data)        => api.post('/cart', data)
export const updateCart   = (id, data)    => api.put(`/cart/${id}`, data)
export const removeFromCart=(id)          => api.delete(`/cart/${id}`)
export const clearCart    = ()            => api.delete('/cart')

// ─── Orders ──────────────────────────────────────────────────────────────────
export const placeOrder        = ()           => api.post('/order/place')
export const getAllOrders       = ()           => api.get('/order')
export const getOrder          = (id)         => api.get(`/order/${id}`)
export const updateOrderStatus = (id, status) => api.put(`/order/${id}/status`, { status })

// ─── Contact ─────────────────────────────────────────────────────────────────
export const submitContact   = (data) => api.post('/contact', data)
export const getAllContacts   = ()     => api.get('/contact')
export const getUnread        = ()     => api.get('/contact/unread')
export const markContactRead  = (id)  => api.put(`/contact/${id}/read`)
