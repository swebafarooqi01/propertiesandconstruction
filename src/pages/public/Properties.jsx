import { useData } from '../../context/DataContext';
import ListingPage from '../../components/ListingPage';
import { PropertyIcon } from '../../components/EmptyState';

const Properties = () => {
  const { properties, loading } = useData();

  return (
    <ListingPage
      title="Properties"
      subtitle="Browse our collection of premium properties"
      data={properties}
      loading={loading}
      linkPrefix="properties"
      priceField="rate"
      searchPlaceholder="Search properties by name or location..."
      itemLabel="properties"
      fallbackImage="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop"
      emptyIcon={<PropertyIcon />}
      emptyTitle="No properties found"
      emptyDescription="Try adjusting your search or filter criteria."
    />
  );
};

export default Properties;
