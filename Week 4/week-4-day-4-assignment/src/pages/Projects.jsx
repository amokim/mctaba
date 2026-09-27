import projects from "../data/projects.js"

function Projects() {
    return (
        <section className="section">
            <p className="eyebrow">// PROJECTS</p>
            <h1>What I am building</h1>
            <p className="section-lede">
                Real work in progress. Each card gets a live demo and repo link as the
          project ships — for now, consider this the queue.
            </p>
            <div className="card-grid">
                {projects.map((project) => (
                    <article key={project.id} className="project-card">
                        <h3>{project.title}</h3>
                        <p className="project-tags">
                            {project.tags.map((tag) => (
                                <span key={tag}>{tag}</span>
                            ))}
                        </p>
                        <p>{project.blurb}</p>
                        {project.link ? (
                            <a
                                className="project-link"
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                View Project →
                            </a>
                        ) : (
                            <p className="project-link is-muted">Coming Soon</p>
                        )}
                    </article>
                ))}
            </div>
        </section>
    )
}

export default Projects