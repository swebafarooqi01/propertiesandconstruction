import { useData } from '../../context/DataContext';
import ListingPage from '../../components/ListingPage';
import { HouseIcon } from '../../components/EmptyState';

const Houses = () => {
  const { houses, loading } = useData();

  return (
    <ListingPage
      title="Houses for Sale"
      subtitle="Find your perfect dream home"
      data={houses}
      loading={loading}
      linkPrefix="houses"
      priceField="price"
      searchPlaceholder="Search houses by name or location..."
      itemLabel="houses"
      fallbackImage="https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&h=300&fit=crop"
      emptyIcon={<HouseIcon />}
      emptyTitle="No houses found"
      emptyDescription="Try adjusting your search or filter criteria."
    />
  );
};

export default Houses;
