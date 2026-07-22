import { useState, useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { api } from '../../api/client'

export default function PrivateRoute({ children }) {
  const navigate = useNavigate()
  const [authState, setAuthState] = useState('loading')

  const token = localStorage.getItem('admin_token')

  if (!token) {
    return <Navigate to="/admin/login" replace />
  }

  useEffect(() => {
    api('/api/admin/verify', {
      headers: { Authorization: `Bearer ${token}` },
    }).then((r) => {
      if (r.ok) {
        setAuthState('authorized')
      } else {
        localStorage.removeItem('admin_token')
        localStorage.removeItem('admin_username')
        navigate('/admin/login', { replace: true })
      }
    }).catch(() => {
      localStorage.removeItem('admin_token')
      localStorage.removeItem('admin_username')
      navigate('/admin/login', { replace: true })
    })
  }, [])

  if (authState === 'loading') return null

  return children
}
