import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';

const Properties = () => {
  const { properties, loading } = useData();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-primary py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white">Properties</h1>
          <p className="mt-2 text-white/70">Browse our collection of premium properties</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {properties.length === 0 ? (
          <div className="text-center py-20">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No properties available</h3>
            <p className="text-gray-500">Check back later for new listings.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <Link
                key={property.id}
                to={`/properties/${property.id}`}
                className="group bg-white rounded-2xl shadow-sm border border-gray-200/60 overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={property.photos?.[0] || 'https://picsum.photos/400/300'}
                    alt={property.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {property.hot && (
                    <span className="absolute top-3 left-3 px-3 py-1 bg-accent text-white text-xs font-medium rounded-full">Hot</span>
                  )}
                  {property.sold && (
                    <span className="absolute top-3 right-3 px-3 py-1 bg-red-500 text-white text-xs font-medium rounded-full">Sold</span>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-gray-900 text-lg line-clamp-1 group-hover:text-primary transition-colors">{property.name}</h3>
                  <p className="text-gray-500 text-sm mt-1 line-clamp-2">{property.description}</p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-primary font-bold text-lg">${property.rate}</span>
                    <span className="text-sm text-gray-400 group-hover:text-accent transition-colors flex items-center gap-1">
                      View Details
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Properties;
