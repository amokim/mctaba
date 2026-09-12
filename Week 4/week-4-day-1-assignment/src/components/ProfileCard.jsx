const ProfileCard = ({name, title, avatar, location }) => {
    return (
        <div className="profile-card">
            <img className="profile-card-avatar" src={avatar} alt={name} />
            <h2>{name}</h2>
            <p>{title}</p>
            <p>📍 {location}</p>
        </div>
    );
};

export default ProfileCard;