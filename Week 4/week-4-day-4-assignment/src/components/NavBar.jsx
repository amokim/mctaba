import { useState } from "react";
import { NavLink } from "react-router-dom";

const Links = [
    { to: "/", text: "Home" },
    { to: "/about", text: "About" },
    { to: "/contact", text: "Contact" },
    { to: "/projects", text: "Projects" },
    { to: "/users", text: "Users" },
    { to: "/search", text: "Search" },
]

function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <header className="site-header">
            <div className="header-inner">
                <NavLink to="/" className="logo" onClick={() => setOpen(false)}>
                    Amon<span className="logo-dot">.</span>
                </NavLink>

                <button
                    type="button"
                    className="nav-toggle"
                    aria-label="Toggle navigation menu"
                    aria-expanded={open}
                    onClick={() => setOpen((prev) => !prev)}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <nav className={open ? 'primary-nav is-open' : 'primary-nav'}
                aria-label="Primary">
                    <ul>
                        {Links.map((link) => (
                            <li key={link.to}>
                                <NavLink
                                    to={link.to}
                                    end={link.to === '/'}
                                    onClick={() => setOpen(false)}
                                    className={({ isActive }) =>
                                        isActive ? 'nav-link is-active' : 'nav-link'
                                    }
                                >
                                    {link.text}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Navbar