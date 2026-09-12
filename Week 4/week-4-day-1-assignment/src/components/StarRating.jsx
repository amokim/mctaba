const StarRating = ({rating, maxStars=5 }) => {
    const stars = Array(maxStars).fill("★").fill("☆", rating);
    return (
         <span>{stars.join("")}</span>
    );
};

export default StarRating;