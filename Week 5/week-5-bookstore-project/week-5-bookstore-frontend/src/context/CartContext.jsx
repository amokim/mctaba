import { createContext, useContext, useEffect, useState } from 'react'

const CartContext = createContext(null)
const STORAGE_KEY = 'kitabu-cart'
const MAX_QUANTITY = 20

const loadCart = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  // each item: { id, title, author, price, coverImage, quantity }
  const [items, setItems] = useState(loadCart)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      // storage can be blocked (private mode) - the cart still works for this visit
    }
  }, [items])

  const addToCart = (book, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === book.id)
      if (existing) {
        return prev.map((item) =>
          item.id === book.id
            ? { ...item, quantity: Math.min(item.quantity + quantity, MAX_QUANTITY) }
            : item,
        )
      }
      const { id, title, author, price, coverImage } = book
      return [...prev, { id, title, author, price, coverImage, quantity: Math.min(quantity, MAX_QUANTITY) }]
    })
  }

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return removeFromCart(id)
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: Math.min(quantity, MAX_QUANTITY) } : item)),
    )
  }

  const removeFromCart = (id) => setItems((prev) => prev.filter((item) => item.id !== id))

  const clearCart = () => setItems([])

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <CartContext.Provider
      value={{ items, itemCount, total, addToCart, updateQuantity, removeFromCart, clearCart, MAX_QUANTITY }}
    >
      {children}
    </CartContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => useContext(CartContext)
