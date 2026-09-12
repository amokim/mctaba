const PriceTag = ({ price, currency="KES", discount }) => {
    const discountPresent = Boolean(discount);
    const discountedPrice = (price * (1 - discount / 100)).toFixed(2);
    return (
        <>
            {!discountPresent ? (
                <p>{currency} {price}</p>
            ) : (
                <p>
                    {currency} {discountedPrice} {" "}
                    <span>{currency} {price} (-{discount}%).</span>
                </p>
            )}
        </>
    );
};

export default PriceTag;