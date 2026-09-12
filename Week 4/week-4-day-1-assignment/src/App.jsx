import NavBar from "./components/NavBar";
import AlertBox from "./components/AlertBox";
import PriceTag from "./components/PriceTag";
import ProfileCard from "./components/ProfileCard"; 
import StarRating from "./components/StarRating";
import ProductCard from "./components/ProductCard";
import TeamPage from "./components/TeamPage";
import "./App.css"

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Games', href: '#products' },
  { label: 'Reviewers', href: '#reviews' },
  { label: 'Our Team', href: '#team' },
]

const steamArt = (appId) =>
  `https://cdn.cloudflare.steamstatic.com/steam/apps/${appId}/header.jpg`;

const products = [
  {
    image: steamArt(1245620),
    name: 'Elden Ring',
    price: 4500,
    rating: 5,
    inStock: true,
  },
  {
    image: steamArt(1086940),
    name: "Baldur's Gate 3",
    price: 5200,
    rating: 5,
    inStock: true,
  },
  {
    image: steamArt(1145360),
    name: 'Hades',
    price: 1800,
    rating: 5,
    inStock: true,
  },
  {
    image: steamArt(413150),
    name: 'Stardew Valley',
    price: 900,
    rating: 5,
    inStock: true,
  },
  {
    image: steamArt(1174180),
    name: 'Red Dead Redemption 2',
    price: 3600,
    rating: 4,
    inStock: false,
  },
  {
    image: steamArt(367520),
    name: 'Hollow Knight',
    price: 1200,
    rating: 4,
    inStock: true,
  },
  {
    image: steamArt(292030),
    name: 'The Witcher 3: Wild Hunt',
    price: 2200,
    rating: 5,
    inStock: false,
  },
  {
    image: steamArt(374320),
    name: 'Dark Souls III',
    price: 2600,
    rating: 4,
    inStock: true,
  },
];

const reviewers = [
  {
    name: 'Kevin Otieno',
    title: 'Verified Buyer · 340 reviews',
    avatar: 'https://i.pravatar.cc/150?img=12',
    location: 'Nairobi, Kenya',
  },
  {
    name: 'Sharon Chebet',
    title: 'Top Contributor · RPG Specialist',
    avatar: 'https://i.pravatar.cc/150?img=45',
    location: 'Eldoret, Kenya',
  },
  {
    name: 'Mutua Kilonzo',
    title: 'Verified Buyer · 89 reviews',
    avatar: 'https://i.pravatar.cc/150?img=8',
    location: 'Mombasa, Kenya',
  },
];

const supportTeam = [
  {
    name: 'Amina Wanjiku',
    role: 'Lead Platform Engineer',
    avatar: 'https://i.pravatar.cc/150?img=1',
    bio: 'Keeps checkout and downloads running at 2am sale spikes.',
  },
  {
    name: 'Brian Ochieng',
    role: 'Store UI Designer',
    avatar: 'https://i.pravatar.cc/150?img=2',
    bio: 'Designs the storefront so browsing 500+ titles feels effortless.',
  },
  {
    name: 'Cynthia Njeri',
    role: 'Community Manager',
    avatar: 'https://i.pravatar.cc/150?img=3',
    bio: 'Moderates reviews and runs the weekly "What to Play" roundup.',
  },
  {
    name: 'Dennis Kiptoo',
    role: 'Payments Engineer',
    avatar: 'https://i.pravatar.cc/150?img=4',
    bio: 'Built M-Pesa and card checkout so purchases clear in seconds.',
  },
  {
    name: 'Faith Achieng',
    role: 'QA & Compatibility Lead',
    avatar: 'https://i.pravatar.cc/150?img=5',
    bio: 'Verifies every listed game actually runs before it goes live.',
  },
];


function App() {
  return (
    <div id="home">
      <NavBar brand="Game shop" links={navLinks} />
      <div className="header">
        <h1>Welcome to the GameShop</h1>
        <p>Your number one stop choice for the ultimate game experience.</p>
      </div>
      <section className="alerts">
        <AlertBox type="success" message="🎉 Elden Ring added to your library. Enjoy the Lands Between!"/>
        <AlertBox type="warning" message="⚡ Flash Sale: up to 60% off RPGs — ends in 2 hours!"/>
        <AlertBox type="error" message="Payment declined for order #KE-88213 — please update your card." children={<button className="alert-box__action">Retry Payment</button>} />
      </section>
      <section id="products">
        <h2>Featured Products</h2>
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.name} {...product} />
          ))}
        </div>
      </section>
      <section id="reviews">
          <h2>Top Reviewers</h2>
          <div className="reviews-grid">
            {reviewers.map((reviewer) => (
              <ProfileCard key={reviewer.name} {...reviewer} />
            ))}
          </div>
      </section>

      <section id="team">
        <TeamPage
          members={supportTeam}
          title="Meet the GameShop Team"
          memberLabel="The amazing people running GameShop"
        />
      </section>
    </div>
  );
  
};

export default App;