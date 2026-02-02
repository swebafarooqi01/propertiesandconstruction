import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';

const Home = () => {
  const { getFeaturedProperties, getFeaturedConstructions, getFeaturedHouses, loading } = useData();

  const featuredProperties = getFeaturedProperties();
  const featuredConstructions = getFeaturedConstructions();
  const featuredHouses = getFeaturedHouses();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const ItemCard = ({ item, type, priceField = 'rate' }) => (
    <Link
      to={`/${type}/${item.id}`}
      className="group bg-white rounded-2xl shadow-sm border border-gray-200/60 overflow-hidden hover:shadow-lg transition-all duration-300"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={item.photos?.[0] || 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&h=300&fit=crop'}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {item.hot && (
          <span className="absolute top-3 left-3 px-3 py-1 bg-accent text-white text-xs font-medium rounded-full">
            Hot
          </span>
        )}
        {item.sold && (
          <span className="absolute top-3 right-3 px-3 py-1 bg-red-500 text-white text-xs font-medium rounded-full">
            Sold
          </span>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-semibold text-gray-900 text-lg line-clamp-1 group-hover:text-primary transition-colors">
          {item.name}
        </h3>
        <p className="text-gray-500 text-sm mt-1 line-clamp-2">{item.description}</p>
        <div className="flex items-center justify-between mt-4">
          <span className="text-primary font-bold text-lg">${item[priceField] || item.price}</span>
          <span className="text-sm text-gray-400 group-hover:text-accent transition-colors flex items-center gap-1">
            View Details
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );

  const Section = ({ title, items, type, viewAllLink, priceField }) => (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{title}</h2>
            <p className="text-gray-500 mt-1">Featured listings you might like</p>
          </div>
          <Link
            to={viewAllLink}
            className="hidden sm:flex items-center gap-2 text-primary hover:text-primary-light font-medium transition-colors"
          >
            View All
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
        {items.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-2xl">
            <p className="text-gray-500">No featured items available</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.slice(0, 3).map((item) => (
              <ItemCard key={item.id} item={item} type={type} priceField={priceField} />
            ))}
          </div>
        )}
        <div className="sm:hidden mt-6 text-center">
          <Link
            to={viewAllLink}
            className="inline-flex items-center gap-2 text-primary hover:text-primary-light font-medium transition-colors"
          >
            View All
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-primary overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/20 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Find Your Perfect
              <br />
              <span className="text-accent">Property</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-white/70 leading-relaxed max-w-2xl">
              Discover premium properties, ongoing construction projects, and beautiful houses for sale. Your dream home awaits.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                to="/properties"
                className="inline-flex items-center justify-center px-8 py-4 bg-accent hover:bg-accent-light text-white font-medium rounded-xl transition-colors duration-200"
              >
                Browse Properties
              </Link>
              <Link
                to="/houses"
                className="inline-flex items-center justify-center px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl transition-colors duration-200"
              >
                Houses for Sale
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Properties', value: featuredProperties.length + '+' },
              { label: 'Construction Projects', value: featuredConstructions.length + '+' },
              { label: 'Houses', value: featuredHouses.length + '+' },
              { label: 'Happy Clients', value: '500+' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-primary">{stat.value}</p>
                <p className="text-gray-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Sections */}
      <Section
        title="Featured Properties"
        items={featuredProperties}
        type="properties"
        viewAllLink="/properties"
        priceField="rate"
      />

      <div className="bg-gray-50">
        <Section
          title="Construction Projects"
          items={featuredConstructions}
          type="construction"
          viewAllLink="/construction"
          priceField="rate"
        />
      </div>

      <Section
        title="Houses for Sale"
        items={featuredHouses}
        type="houses"
        viewAllLink="/houses"
        priceField="price"
      />

      {/* CTA Section */}
      <section className="bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Ready to Find Your Dream Property?</h2>
            <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
              Browse our extensive collection of properties, construction projects, and houses for sale.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/properties"
                className="inline-flex items-center justify-center px-8 py-4 bg-accent hover:bg-accent-light text-white font-medium rounded-xl transition-colors duration-200"
              >
                Start Exploring
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
