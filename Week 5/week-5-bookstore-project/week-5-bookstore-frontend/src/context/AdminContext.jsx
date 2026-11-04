import { createContext, useContext, useState } from 'react'
import { api } from '../api'

const AdminContext = createContext(null)
const STORAGE_KEY = 'kitabu-admin-key'

// the key lives in sessionStorage, so closing the tab logs the admin out
const loadKey = () => {
  try {
    return sessionStorage.getItem(STORAGE_KEY) || ''
  } catch {
    return ''
  }
}

export function AdminProvider({ children }) {
  const [adminKey, setAdminKey] = useState(loadKey)

  // throws ApiError if the API rejects the key
  const login = async (key) => {
    await api.verifyAdmin(key)
    setAdminKey(key)
    try {
      sessionStorage.setItem(STORAGE_KEY, key)
    } catch {
      // ignore - stays logged in until refresh
    }
  }

  const logout = () => {
    setAdminKey('')
    try {
      sessionStorage.removeItem(STORAGE_KEY)
    } catch {
      // ignore
    }
  }

  return (
    <AdminContext.Provider value={{ adminKey, isAdmin: Boolean(adminKey), login, logout }}>
      {children}
    </AdminContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAdmin = () => useContext(AdminContext)
