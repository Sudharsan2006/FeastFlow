import { createContext, useContext, useState, useCallback } from 'react'
import { loginUser, registerUser } from '../api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('ff_user')) } catch { return null }
  })

  const login = useCallback(async (email, password) => {
    const { data } = await loginUser({ email, password })
    localStorage.setItem('ff_token', data.token)
    localStorage.setItem('ff_user', JSON.stringify({ id: data.id, name: data.name, email: data.email, role: data.role }))
    setUser({ id: data.id, name: data.name, email: data.email, role: data.role })
    return data
  }, [])

  const register = useCallback(async (name, email, password) => {
    const { data } = await registerUser({ name, email, password })
    localStorage.setItem('ff_token', data.token)
    localStorage.setItem('ff_user', JSON.stringify({ id: data.id, name: data.name, email: data.email, role: data.role }))
    setUser({ id: data.id, name: data.name, email: data.email, role: data.role })
    return data
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('ff_token')
    localStorage.removeItem('ff_user')
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
