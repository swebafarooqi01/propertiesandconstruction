import { useParams, Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';

const HouseDetail = () => {
  const { id } = useParams();
  const { getHouseById, loading } = useData();
  const house = getHouseById(id);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!house) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">House Not Found</h2>
          <p className="text-gray-500 mb-6">The house you're looking for doesn't exist.</p>
          <Link to="/houses" className="text-primary hover:text-primary-light font-medium">Back to Houses</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/houses" className="inline-flex items-center text-gray-500 hover:text-primary transition-colors mb-6">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Houses
        </Link>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200/60 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 md:p-8">
            <div>
              <div className="relative rounded-xl overflow-hidden">
                <img
                  src={house.photos?.[0] || 'https://picsum.photos/800/600'}
                  alt={house.name}
                  className="w-full h-80 object-cover"
                />
                {house.hot && (
                  <span className="absolute top-4 left-4 px-4 py-2 bg-accent text-white text-sm font-medium rounded-full">Hot House</span>
                )}
                {house.sold && (
                  <span className="absolute top-4 right-4 px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-full">Sold</span>
                )}
              </div>
              {house.photos?.length > 1 && (
                <div className="grid grid-cols-4 gap-2 mt-4">
                  {house.photos.slice(1, 5).map((photo, index) => (
                    <img key={index} src={photo} alt={`${house.name} ${index + 2}`} className="w-full h-20 object-cover rounded-lg" />
                  ))}
                </div>
              )}
            </div>

            <div>
              <h1 className="text-3xl font-bold text-gray-900">{house.name}</h1>
              <p className="text-3xl font-bold text-primary mt-4">${house.price}</p>

              <div className="flex gap-3 mt-4">
                {house.hot && <span className="px-3 py-1 bg-accent/10 text-accent-dark text-sm font-medium rounded-full">Featured</span>}
                {house.sold ? (
                  <span className="px-3 py-1 bg-red-100 text-red-700 text-sm font-medium rounded-full">Sold</span>
                ) : (
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">Available</span>
                )}
              </div>

              <div className="mt-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">Description</h2>
                <p className="text-gray-600 leading-relaxed">{house.description}</p>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Us</h2>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a href="tel:+15551234567" className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white font-medium rounded-xl hover:bg-primary-light transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Call Now
                  </a>
                  <a href="mailto:info@properties.com" className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent text-white font-medium rounded-xl hover:bg-accent-dark transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Email Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HouseDetail;
