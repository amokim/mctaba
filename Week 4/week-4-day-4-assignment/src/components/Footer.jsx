const social = [
    { href: 'https://github.com/amokim', label: 'GitHub' },
    { href: 'https://www.linkedin.com/in/amon-kimutai', label: 'LinkedIn' },
    { href: 'https://x.com/amokim', label: 'Twitter / X' },
    { href: 'mailto:amokim023@gmail.com', label: 'Email' },
]

function Footer() {
    return (
        <footer className="site-footer">
            <div className="footer-inner">
                <p className="footer-copy">
                    © {new Date().getFullYear()} Amon. All rights reserved.
                </p>
                <ul className="footer-links">
                    {social.map((item) => (
                        <li key={item.label}>
                            <a href={item.href} target="_blank" rel="noopener noreferrer">
                                {item.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </footer>
    )
}

export default Footer