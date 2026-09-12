import StarRating from "./StarRating";
import PriceTag from "./PriceTag";

const ProductCard = ({ image, name, price, rating, inStock }) => {
    return (
        <div className={`product-card ${!inStock ? 'product-card--out-of-stock' : ''}`}>
            <div className="product-card-wrap">
                <img
                    className="product-image"
                    style={ inStock ? undefined : { filter: 'grayscale(100%)' }}
                    src={image}
                    alt={name}
                />
                {!inStock && <span className="product-badge">Out of Stock</span>}
            </div>
            <p className="product-name">{name}</p>
            <StarRating rating={rating} />
            <PriceTag price={price} />
            <button className="product-button" disabled={!inStock}>
                {inStock ? 'Add to Cart' : 'Unavailable'}
            </button>
        </div>
    );
};

export default ProductCard;