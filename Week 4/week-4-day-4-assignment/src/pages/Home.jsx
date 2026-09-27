import { Link } from "react-router-dom";

function Home() {
    return (
        <section className="section">
            <p className="eyebrow">// SIGNAL ACQUIRED - NAIROBI, KENYA</p>
            <h1 className="hero-title">
                Hi, I am <span className="accent">Amon Kimutai</span>
            </h1>
            <p className="hero-tagline">
                AI Engineer &amp; Software Developer building intelligent, scalable, and
          secure digital solutions that transform ideas into innovative products
          and real-world impact.
            </p>

            <div className="hero-actions">
                <Link to="/projects" className="btn btn-primary">See My Projects</Link>
                <Link to="/contact" className="btn btn-ghost">Get In Touch</Link>
            </div>

            <div className="card-grid home-links">
                <Link to="/about" className="link-card">
                    <h3>About →</h3>
                    <p>Where I'm coming from: data analytics, then AI and software.</p>
                </Link>
                <Link to="/projects" className="link-card">
                    <h3>Projects →</h3>
                    <p>What I'm building right now, and what's next in the queue.</p>
                </Link>
                <Link to="/contact" className="link-card">
                    <h3>Contact →</h3>
                    <p>Send a message, or reach me on the links in the footer.</p>
                </Link>
            </div>
        </section>
    )
}

export default Home