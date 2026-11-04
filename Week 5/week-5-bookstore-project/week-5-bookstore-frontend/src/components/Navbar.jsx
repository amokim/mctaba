import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAdmin } from '../context/AdminContext'

const linkClass = ({ isActive }) =>
  `block rounded-md px-3 py-2 text-sm font-medium transition-colors ${
    isActive ? 'bg-emerald-800 text-white' : 'text-emerald-50 hover:bg-emerald-800/60'
  }`

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { itemCount } = useCart()
  const { isAdmin, logout } = useAdmin()

  const close = () => setOpen(false)

  const links = (
    <>
      <NavLink to="/" end className={linkClass} onClick={close}>Catalogue</NavLink>
      <NavLink to="/authors" className={linkClass} onClick={close}>Authors</NavLink>
      <NavLink to="/admin" className={linkClass} onClick={close}>Admin</NavLink>
      {isAdmin && (
        <button
          type="button"
          onClick={() => { logout(); close() }}
          className="block w-full rounded-md px-3 py-2 text-left text-sm font-medium text-emerald-50 hover:bg-emerald-800/60"
        >
          Log out
        </button>
      )}
    </>
  )

  return (
    <header className="sticky top-0 z-20 bg-emerald-900 shadow">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 font-serif text-xl font-bold text-white" onClick={close}>
          <span aria-hidden="true">📚</span> Kitabu
        </Link>

        <div className="hidden items-center gap-1 md:flex">{links}</div>

        <div className="flex items-center gap-2">
          <Link
            to="/cart"
            onClick={close}
            className="relative rounded-md px-3 py-2 text-sm font-medium text-emerald-50 hover:bg-emerald-800/60"
            aria-label={`Cart, ${itemCount} items`}
          >
            🛒 Cart
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-400 px-1 text-xs font-bold text-emerald-950">
                {itemCount}
              </span>
            )}
          </Link>

          <button
            type="button"
            className="rounded-md p-2 text-emerald-50 hover:bg-emerald-800/60 md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label="Toggle menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              {open
                ? <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
                : <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </nav>

      {open && <div className="space-y-1 border-t border-emerald-800 px-4 py-3 md:hidden">{links}</div>}
    </header>
  )
}
