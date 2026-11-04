import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="mx-auto max-w-md py-16 text-center">
      <p className="font-serif text-6xl font-bold text-emerald-800">404</p>
      <h1 className="mt-4 text-xl font-semibold">Page not found</h1>
      <p className="mt-2 text-stone-500">This page has wandered off the shelf.</p>
      <Link to="/" className="mt-6 inline-block rounded-md bg-emerald-700 px-5 py-2 font-medium text-white hover:bg-emerald-800">
        Back to the catalogue
      </Link>
    </div>
  )
}
