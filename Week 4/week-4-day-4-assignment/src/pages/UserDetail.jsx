import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const API_URL = 'https://jsonplaceholder.typicode.com/users'

function BackLink() {
    return (
        <Link to="/users" className="mb-6 inline-block font-semibold text-teal-400 hover:text-teal-300">
            ← Back to Users
        </Link>
    )
}

function UserDetail() {
    const { id } = useParams()
    const isValidId = /^\d+$/.test(id)

    const [result, setResult] = useState({ id: null, user: null, error: null })

    useEffect(() => {
        if (!isValidId) return
        const controller = new AbortController()

        fetch(`${API_URL}/${id}`, { signal: controller.signal })
            .then((res) => {
                if (res.status === 404) return null
                if (!res.ok) throw new Error(`Request failed (${res.status})`)
                return res.json()
            })
            .then((data) => {
                setResult({ id, user: data && data.id ? data : null, error: null })
            })
            .catch((err) => {
                if (err.name === 'AbortError') return
                setResult({ id, user: null, error: err.message })
            })

        return () => controller.abort()
    }, [id, isValidId])

    const loading = isValidId && result.id !== id
    const { user, error } = result

    if (loading) {
        return (
            <section className="section">
                <BackLink />
                <div className="animate-pulse space-y-4" aria-busy="true">
                    <p className="sr-only">Loading user…</p>
                    <div className="h-10 w-2/3 rounded bg-slate-800" />
                    <div className="h-64 rounded-xl bg-slate-800" />
                </div>
            </section>
        )
    }

    if (error) {
        return (
            <section className="section">
                <BackLink />
                <p className="rounded-lg border border-red-500 bg-red-500/10 p-4 text-red-400">
                    Could not load this user: {error}
                </p>
            </section>
        )
    }

    if (!isValidId || !user) {
        return (
            <section className="section">
                <BackLink />
                <p className="eyebrow">// 404 — USER NOT FOUND</p>
                <h1>User not found</h1>
                <p className="section-lede">
                    There is no user with ID <code>{id}</code>. Valid IDs are 1 to 10.
                </p>
            </section>
        )
    }

    const details = [
        { label: 'Username', value: `@${user.username}` },
        { label: 'Email', value: <a href={`mailto:${user.email}`} className="text-teal-400 hover:underline">{user.email}</a> },
        { label: 'Phone', value: user.phone },
        {
            label: 'Website',
            value: (
                <a href={`https://${user.website}`} target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:underline">
                    {user.website}
                </a>
            ),
        },
        { label: 'Company', value: user.company.name },
        { label: 'Address', value: `${user.address.street}, ${user.address.city}` },
    ]

    return (
        <section className="section">
            <BackLink />
            <p className="eyebrow">// USER #{user.id}</p>
            <h1>{user.name}</h1>

            <dl className="mt-6 grid gap-4 rounded-xl border border-slate-700 bg-slate-800 p-6 shadow-lg sm:grid-cols-2">
                {details.map((item) => (
                    <div key={item.label}>
                        <dt className="text-xs font-semibold uppercase tracking-wider text-slate-400">{item.label}</dt>
                        <dd className="m-0 mt-1 text-slate-100">{item.value}</dd>
                    </div>
                ))}
            </dl>
        </section>
    )
}

export default UserDetail