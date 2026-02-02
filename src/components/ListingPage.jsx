import SearchFilter from './SearchFilter';
import ListingCard from './ListingCard';
import EmptyState from './EmptyState';

const ListingPage = ({
  title,
  subtitle,
  data,
  loading,
  linkPrefix,
  priceField = 'rate',
  searchPlaceholder,
  itemLabel,
  fallbackImage,
  emptyIcon,
  emptyTitle = 'No items found',
  emptyDescription = 'Try adjusting your search or filter criteria.'
}) => {
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-primary py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white">{title}</h1>
          <p className="mt-2 text-white/70">{subtitle}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SearchFilter
          data={data}
          priceField={priceField}
          searchPlaceholder={searchPlaceholder}
          itemLabel={itemLabel}
        >
          {({ filteredData, clearFilters }) => (
            <>
              {filteredData.length === 0 ? (
                <EmptyState
                  icon={emptyIcon}
                  title={emptyTitle}
                  description={emptyDescription}
                  onClear={clearFilters}
                />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredData.map((item) => (
                    <ListingCard
                      key={item.id}
                      item={item}
                      linkPrefix={linkPrefix}
                      priceField={priceField}
                      fallbackImage={fallbackImage}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </SearchFilter>
      </div>
    </div>
  );
};

export default ListingPage;
