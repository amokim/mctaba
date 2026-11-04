export default function StockBadge({ inStock }) {
  return inStock ? (
    <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-800">In stock</span>
  ) : (
    <span className="rounded-full bg-stone-200 px-2 py-0.5 text-xs font-medium text-stone-600">Out of stock</span>
  )
}
