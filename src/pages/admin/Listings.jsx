import { useSearchParams, Link } from 'react-router-dom';
import AdminNavbar from '../../components/AdminNavbar';
import { useData } from '../../context/DataContext';

const Listings = () => {
  const [searchParams] = useSearchParams();
  const filter = searchParams.get('filter') || 'all';
  const type = searchParams.get('type') || null;
  const { properties, constructions, houses } = useData();

  // Combine all items with their type
  const allItems = [
    ...properties.map((item) => ({ ...item, type: 'property', typeName: 'Property' })),
    ...constructions.map((item) => ({ ...item, type: 'construction', typeName: 'Construction' })),
    ...houses.map((item) => ({ ...item, type: 'house', typeName: 'House' })),
  ];

  // Filter items based on type first, then status
  const getFilteredItems = () => {
    let items = allItems;

    // Filter by type if specified
    if (type) {
      items = items.filter((item) => item.type === type);
    }

    // Then filter by status
    switch (filter) {
      case 'sold':
        return items.filter((item) => item.sold);
      case 'hot':
        return items.filter((item) => item.hot);
      case 'available':
        return items.filter((item) => !item.sold);
      case 'all':
      default:
        return items;
    }
  };

  const filteredItems = getFilteredItems();

  // Get type info for display
  const getTypeInfo = () => {
    switch (type) {
      case 'property':
        return { title: 'Properties', description: 'Manage all property listings' };
      case 'construction':
        return { title: 'Construction', description: 'Manage construction projects' };
      case 'house':
        return { title: 'Houses for Sale', description: 'Manage house listings' };
      default:
        return null;
    }
  };

  // Get filter info for display
  const getFilterInfo = () => {
    const typeInfo = getTypeInfo();
    const baseTitle = typeInfo ? typeInfo.title : 'Listings';

    switch (filter) {
      case 'sold':
        return { title: `Sold ${baseTitle}`, description: typeInfo?.description || 'All items that have been sold', color: 'text-primary', bg: 'bg-primary/10' };
      case 'hot':
        return { title: `Hot ${baseTitle}`, description: typeInfo?.description || 'Featured and trending items', color: 'text-accent-dark', bg: 'bg-accent/10' };
      case 'available':
        return { title: `Available ${baseTitle}`, description: typeInfo?.description || 'Items currently on the market', color: 'text-green-600', bg: 'bg-green-100' };
      case 'all':
      default:
        return { title: typeInfo ? typeInfo.title : 'All Listings', description: typeInfo?.description || 'Complete inventory overview', color: 'text-gray-700', bg: 'bg-gray-100' };
    }
  };

  const filterInfo = getFilterInfo();

  // Build filter URL preserving type parameter
  const buildFilterUrl = (filterKey) => {
    const params = new URLSearchParams();
    if (type) params.set('type', type);
    params.set('filter', filterKey);
    return `/admin/listings?${params.toString()}`;
  };

  // Get the detail page URL based on type
  const getDetailUrl = (item) => {
    switch (item.type) {
      case 'property':
        return `/properties/${item.id}`;
      case 'construction':
        return `/construction/${item.id}`;
      case 'house':
        return `/houses/${item.id}`;
      default:
        return '#';
    }
  };

  // Get the edit page URL based on type
  const getEditUrl = (item) => {
    switch (item.type) {
      case 'property':
        return `/admin/properties/update`;
      case 'construction':
        return `/admin/construction/update`;
      case 'house':
        return `/admin/houses/update`;
      default:
        return '#';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <AdminNavbar />

      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                to="/admin/dashboard"
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </Link>
              <div>
                <h1 className={`text-2xl font-bold ${filterInfo.color}`}>{filterInfo.title}</h1>
                <p className="text-gray-500 text-sm mt-1">{filterInfo.description}</p>
              </div>
            </div>
            <span className={`px-4 py-2 rounded-full text-sm font-semibold ${filterInfo.color} ${filterInfo.bg}`}>
              {filteredItems.length} items
            </span>
          </div>

          {/* Status Filter Tabs */}
          <div className="flex gap-2 mt-4">
            {[
              { key: 'all', label: 'All' },
              { key: 'available', label: 'Available' },
              { key: 'sold', label: 'Sold' },
              { key: 'hot', label: 'Hot' },
            ].map((tab) => (
              <Link
                key={tab.key}
                to={buildFilterUrl(tab.key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filter === tab.key
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {tab.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Listings Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredItems.length === 0 ? (
          <div className="text-center py-16">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900">No listings found</h3>
            <p className="text-gray-500 mt-1">There are no items matching this filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div
                key={`${item.type}-${item.id}`}
                className="bg-white rounded-2xl shadow-sm border border-gray-200/60 overflow-hidden hover:shadow-lg transition-all duration-200"
              >
                {/* Image */}
                <div className="relative h-48 bg-gray-100">
                  {item.photos && item.photos.length > 0 ? (
                    <img
                      src={item.photos[0]}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="px-2 py-1 text-xs font-medium bg-white/90 backdrop-blur-sm rounded-full text-gray-700">
                      {item.typeName}
                    </span>
                    {item.hot && (
                      <span className="px-2 py-1 text-xs font-medium bg-accent text-white rounded-full">
                        Hot
                      </span>
                    )}
                    {item.sold && (
                      <span className="px-2 py-1 text-xs font-medium bg-red-500 text-white rounded-full">
                        Sold
                      </span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 truncate">{item.name}</h3>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">{item.description}</p>

                  <div className="flex items-center justify-between mt-4">
                    <p className="text-lg font-bold text-primary">
                      ${item.rate || item.price}
                    </p>
                    <div className="flex gap-2">
                      <Link
                        to={getDetailUrl(item)}
                        className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                        title="View"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </Link>
                      <Link
                        to={getEditUrl(item)}
                        className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                        title="Edit"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Listings;
