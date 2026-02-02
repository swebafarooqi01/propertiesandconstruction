import { useData } from '../../context/DataContext';
import ListingPage from '../../components/ListingPage';
import { ConstructionIcon } from '../../components/EmptyState';

const Construction = () => {
  const { constructions, loading } = useData();

  return (
    <ListingPage
      title="Construction Projects"
      subtitle="Explore our ongoing and upcoming construction projects"
      data={constructions}
      loading={loading}
      linkPrefix="construction"
      priceField="rate"
      searchPlaceholder="Search construction projects by name or location..."
      itemLabel="projects"
      fallbackImage="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&h=300&fit=crop"
      emptyIcon={<ConstructionIcon />}
      emptyTitle="No projects found"
      emptyDescription="Try adjusting your search or filter criteria."
    />
  );
};

export default Construction;
