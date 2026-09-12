import MemberCard from './MemberCard';

function TeamPage({ members, title = 'Our Team', memberLabel = 'team members' }) {
  return (
    <section className="team-page">
      <h2>{title}</h2>
      <p>{memberLabel}</p>
      <div className="team-page-grid">
        {members.map((member) => (
          <MemberCard key={member.name} {...member} />
        ))}
      </div>
    </section>
  );
}

export default TeamPage;