function MemberCard({ name, role, avatar, bio }) {
    return (
      <div className="member-card">
        <img className="member-card-avatar" src={avatar} alt={name} />
        <p>{name}</p>
        <p>{role}</p>
        <p>{bio}</p>
      </div>
    );
  }
  
  export default MemberCard;