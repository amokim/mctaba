const listings = [
    { name: "Cozy Studio Westlands", price: 3500, rating: 4.8, neighborhood: "Westlands", amenities: ["wifi", "kitchen", "parking"] },
    { name: "Modern Apartment Kilimani", price: 6000, rating: 4.9, neighborhood: "Kilimani", amenities: ["wifi", "pool", "gym", "kitchen"] },
    { name: "Budget Room Eastleigh", price: 1500, rating: 4.2, neighborhood: "Eastleigh", amenities: ["wifi"] },
    { name: "Luxury Penthouse Kilimani", price: 15000, rating: 4.7, neighborhood: "Kilimani", amenities: ["wifi", "pool", "gym", "kitchen", "parking", "balcony"] },
    { name: "Garden Cottage Karen", price: 8000, rating: 4.6, neighborhood: "Karen", amenities: ["wifi", "kitchen", "garden", "parking"] },
    { name: "Artist Loft Westlands", price: 4500, rating: 4.5, neighborhood: "Westlands", amenities: ["wifi", "kitchen"] },
    { name: "Family Home Karen", price: 12000, rating: 4.9, neighborhood: "Karen", amenities: ["wifi", "kitchen", "garden", "parking", "pool"] },
    { name: "Studio Near CBD", price: 2000, rating: 3.9, neighborhood: "CBD", amenities: ["wifi"] },
    { name: "Riverside Apartment", price: 5500, rating: 4.4, neighborhood: "Westlands", amenities: ["wifi", "kitchen", "gym"] },
    { name: "Backpacker Hostel Westlands", price: 800, rating: 4.1, neighborhood: "Westlands", amenities: ["wifi"] }
];

const findTopListings = (listings, neighborhood, maxPrice) => {
    const matchedListings = listings
    .filter((listing) => listing.neighborhood === neighborhood && listing.price < maxPrice)
    .sort((a, b) => b.rating - a.rating)
    .map((listing, index) => 
        `${index + 1}. ⭐ ${listing.rating} - ${listing.name} ${listing.neighborhood} (KES ${listing.price.toLocaleString()}/night) - ${listing.amenities.join(', ')}`
    );
    const header = `Top listings in ${neighborhood} under KES ${maxPrice}:`
    return [header, ...matchedListings].join('\n');
};

console.log(findTopListings(listings, "Westlands", 5000));
console.log(findTopListings(listings, "Kilimani", 10000));