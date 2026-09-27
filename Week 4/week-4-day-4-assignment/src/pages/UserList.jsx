import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'

const API_URL = 'https://jsonplaceholder.typicode.com/users'

function UserList () {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect (() => {
        const controller = new AbortController()

        fetch(API_URL, {signal: controller.signal})
            .then((res) => {
                if (!res.ok) throw new Error(`Request failed (${res.status})`)
                return res.json()
            })
            .then((data) => {
                setUsers(data)
                setLoading(false)
            })
            .catch((err) => {
                if (err.name === 'AbortError') return
                setError(err.message)
                setLoading(false)
            })
        return () => controller.abort()
    }, [])

    return (
        <section className="section">
            <p className="eyebrow">// USERS</p>
            <h1>User Directory</h1>
            <p className="section-lede">
                Pulled live from JSONPlaceholder. Click a card to see the full profile.
            </p>

            {loading && (
                <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-busy="true">
                    <p className="sr-only">Loading users…</p>
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="h-32 animate-pulse rounded-xl border border-slate-700 bg-slate-800" />
                    ))}
                </div>
            )}

            {error && (
                <p className="mt-8 rounded-lg border border-red-500 bg-red-500/10 p-4 text-red-400">
                    Could not load users: {error}
                </p>
            )}

            {!loading && !error && (
                <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {users.map((user) => (
                        <Link
                            key={user.id}
                            to={`/users/${user.id}`}
                            className="block rounded-xl border border-slate-700 bg-slate-800 p-6 shadow-lg transition hover:-translate-y-1 hover:border-teal-400"
                        >
                            <h3 className="mb-2 text-lg font-semibold text-slate-100">{user.name}</h3>
                            <p className="mb-1 text-sm text-slate-400">{user.email}</p>
                            <p className="mb-0 text-sm text-teal-400">{user.company.name}</p>
                        </Link>
                    ))}
                </div>
            )}
        </section>
    )
}

export default UserList