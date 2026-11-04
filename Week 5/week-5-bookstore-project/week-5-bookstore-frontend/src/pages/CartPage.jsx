import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import BookCover from '../components/BookCover'
import { formatKES } from '../utils/format'

export default function CartPage() {
  const { items, itemCount, total, updateQuantity, removeFromCart, clearCart, MAX_QUANTITY } = useCart()
  const [ordered, setOrdered] = useState(false)

  if (ordered) {
    return (
      <div className="mx-auto max-w-md py-16 text-center">
        <p className="text-5xl" aria-hidden="true">🎉</p>
        <h1 className="mt-4 font-serif text-2xl font-bold">Thank you for your order!</h1>
        <p className="mt-2 text-stone-500">This is a demo store, so no payment was taken.</p>
        <Link to="/" className="mt-6 inline-block rounded-md bg-emerald-700 px-5 py-2 font-medium text-white hover:bg-emerald-800">
          Keep browsing
        </Link>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-md py-16 text-center">
        <p className="text-5xl" aria-hidden="true">🛒</p>
        <h1 className="mt-4 font-serif text-2xl font-bold">Your cart is empty</h1>
        <p className="mt-2 text-stone-500">Find something good to read in the catalogue.</p>
        <Link to="/" className="mt-6 inline-block rounded-md bg-emerald-700 px-5 py-2 font-medium text-white hover:bg-emerald-800">
          Browse books
        </Link>
      </div>
    )
  }

  const handleCheckout = () => {
    clearCart()
    setOrdered(true)
  }

  return (
    <div>
      <h1 className="mb-6 font-serif text-2xl font-bold text-stone-900 sm:text-3xl">Your cart</h1>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <ul className="divide-y divide-stone-200 rounded-lg border border-stone-200 bg-white">
          {items.map((item) => (
            <li key={item.id} className="flex gap-4 p-4">
              <Link to={`/books/${item.id}`} className="w-16 shrink-0 overflow-hidden rounded sm:w-20">
                <BookCover book={item} className="aspect-2/3 w-full text-xs" />
              </Link>

              <div className="flex min-w-0 flex-1 flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <Link to={`/books/${item.id}`} className="font-serif font-semibold text-stone-900 hover:text-emerald-800">
                    {item.title}
                  </Link>
                  <p className="truncate text-sm text-stone-500">{item.author}</p>
                  <p className="text-sm text-stone-600">{formatKES(item.price)} each</p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center rounded-md border border-stone-300">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-3 py-1 text-lg hover:bg-stone-100"
                      aria-label={`Decrease quantity of ${item.title}`}
                    >
                      −
                    </button>
                    <span className="w-8 text-center text-sm" aria-live="polite">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      disabled={item.quantity >= MAX_QUANTITY}
                      className="px-3 py-1 text-lg hover:bg-stone-100 disabled:opacity-40"
                      aria-label={`Increase quantity of ${item.title}`}
                    >
                      +
                    </button>
                  </div>
                  <span className="w-24 text-right font-semibold">{formatKES(item.price * item.quantity)}</span>
                  <button
                    type="button"
                    onClick={() => removeFromCart(item.id)}
                    className="text-sm text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <aside className="h-fit rounded-lg border border-stone-200 bg-white p-5 lg:sticky lg:top-20">
          <h2 className="font-semibold text-stone-900">Order summary</h2>
          <div className="mt-4 flex justify-between text-sm text-stone-600">
            <span>Items</span>
            <span>{itemCount}</span>
          </div>
          <div className="mt-2 flex justify-between border-t border-stone-200 pt-3 text-lg font-bold">
            <span>Total</span>
            <span>{formatKES(total)}</span>
          </div>
          <button
            type="button"
            onClick={handleCheckout}
            className="mt-5 w-full rounded-md bg-emerald-700 py-2.5 font-medium text-white hover:bg-emerald-800"
          >
            Checkout
          </button>
          <button type="button" onClick={clearCart} className="mt-2 w-full py-2 text-sm text-stone-500 hover:text-red-600">
            Empty cart
          </button>
        </aside>
      </div>
    </div>
  )
}
