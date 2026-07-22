import PrivateRoute from './components/layout/PrivateRoute'
import AdminLayout from './components/layout/AdminLayout'

export default function AdminApp() {
  return (
    <PrivateRoute>
      <AdminLayout />
    </PrivateRoute>
  )
}
