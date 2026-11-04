import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAdmin } from '../context/AdminContext'

// Admin pages render only when an admin key has been accepted; otherwise go to login
export default function ProtectedRoute() {
  const { isAdmin } = useAdmin()
  const location = useLocation()

  if (!isAdmin) {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />
  }

  return <Outlet />
}
