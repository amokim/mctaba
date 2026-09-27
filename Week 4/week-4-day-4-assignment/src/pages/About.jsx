import profile from "../assets/profile.jpg"

function About() {
    return (
        <section className="section">
            <p className="eyebrow">// ABOUT</p>
            <h1>Where I am coming from</h1>

            <div className="about-grid">
                <div className="about-photo">
                    <img src={profile} width="320" height="320" alt="Amon Kimutai" />
                </div>
                <div className="about-copy">
                    <p>My background is rooted in data analytics, where I developed a
              passion for uncovering patterns, solving complex problems, and
              transforming raw data into meaningful insights. Working with large
              datasets using Python and SQL, I built analytical solutions that
              supported performance optimization, forecasting, and data-driven
              decision-making.</p>
                    <p>Over time, that analytical foundation evolved into a broader interest
              in artificial intelligence and software engineering. Today, I build
              AI-powered applications, develop modern web platforms, and create
              scalable cloud-native solutions that combine intelligent automation
              with thoughtful software design.
                    </p>
                </div>
            </div>
        </section>
    )
}

export default About