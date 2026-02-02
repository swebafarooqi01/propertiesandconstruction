import { useState, useMemo } from 'react';

const SearchFilter = ({
  data,
  priceField = 'rate',
  searchPlaceholder = 'Search...',
  itemLabel = 'items',
  children
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [featuredFilter, setFeaturedFilter] = useState('all');
  const [sortBy, setSortBy] = useState('default');

  const filteredData = useMemo(() => {
    let result = [...data];

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query)
      );
    }

    // Status filter
    if (statusFilter === 'available') {
      result = result.filter((item) => !item.sold);
    } else if (statusFilter === 'sold') {
      result = result.filter((item) => item.sold);
    }

    // Featured filter
    if (featuredFilter === 'hot') {
      result = result.filter((item) => item.hot);
    }

    // Sort
    if (sortBy === 'price-low' || sortBy === 'price-high') {
      result.sort((a, b) => {
        const priceA = parseFloat((a[priceField] || '0').toString().replace(/,/g, ''));
        const priceB = parseFloat((b[priceField] || '0').toString().replace(/,/g, ''));
        return sortBy === 'price-low' ? priceA - priceB : priceB - priceA;
      });
    }

    return result;
  }, [data, searchQuery, statusFilter, featuredFilter, sortBy, priceField]);

  const clearFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setFeaturedFilter('all');
    setSortBy('default');
  };

  const hasActiveFilters = searchQuery || statusFilter !== 'all' || featuredFilter !== 'all' || sortBy !== 'default';

  return (
    <>
      {/* Search and Filter Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200/60 p-4 md:p-6 mb-8">
        {/* Search Bar */}
        <div className="relative mb-4">
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
          />
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            >
              <option value="all">All {itemLabel}</option>
              <option value="available">Available</option>
              <option value="sold">Sold</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Featured</label>
            <select
              value={featuredFilter}
              onChange={(e) => setFeaturedFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            >
              <option value="all">All</option>
              <option value="hot">Hot Deals Only</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            >
              <option value="default">Default</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={clearFilters}
              className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Results Count */}
        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Showing <span className="font-semibold text-gray-900">{filteredData.length}</span> of{' '}
            <span className="font-semibold text-gray-900">{data.length}</span> {itemLabel}
          </p>
          {hasActiveFilters && (
            <span className="text-sm text-primary font-medium">Filters applied</span>
          )}
        </div>
      </div>

      {/* Render children with filtered data */}
      {children({ filteredData, clearFilters, hasActiveFilters })}
    </>
  );
};

export default SearchFilter;
