import { useLocation, useNavigate } from 'react-router-dom'

  function NotFound() {
    const navigate = useNavigate()
    const { pathname } = useLocation()

    return (
      <section className="section not-found">
        <p className="eyebrow">// SIGNAL LOST — 404</p>
        <h1>Page Not Found</h1>
        <p className="section-lede">
          No route matches <code>{pathname}</code>. It may have moved, or the link
          was mistyped.
        </p>

        <button type="button" className="btn btn-primary" onClick={() => navigate('/')}>
          Go Home
        </button>
      </section>
    )
  }

export default NotFound
