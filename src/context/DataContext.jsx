import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const DataContext = createContext(null);

// Fake data for Properties
const fakeProperties = [
  { id: '1', name: 'Sunrise Valley Estate', description: 'A beautiful 5-acre estate with panoramic mountain views, featuring lush gardens and a private lake. Perfect for those seeking tranquility and luxury.', photos: ['https://picsum.photos/seed/prop1/800/600', 'https://picsum.photos/seed/prop1b/800/600'], videos: [], rate: '2,500,000', sold: false, hot: true },
  { id: '2', name: 'Downtown Commercial Plaza', description: 'Prime commercial property in the heart of the business district. 50,000 sq ft of retail and office space with underground parking.', photos: ['https://picsum.photos/seed/prop2/800/600'], videos: [], rate: '8,750,000', sold: false, hot: true },
  { id: '3', name: 'Riverside Agricultural Land', description: '120 acres of fertile farmland with irrigation rights. Includes a barn, storage facilities, and a farmhouse.', photos: ['https://picsum.photos/seed/prop3/800/600', 'https://picsum.photos/seed/prop3b/800/600'], videos: [], rate: '1,200,000', sold: true, hot: false },
  { id: '4', name: 'Hilltop Residential Plot', description: 'Exclusive 2-acre residential plot in a gated community. Ready for construction with all utilities connected.', photos: ['https://picsum.photos/seed/prop4/800/600'], videos: [], rate: '850,000', sold: false, hot: false },
  { id: '5', name: 'Beachfront Development Site', description: '10 acres of pristine beachfront property. Approved for resort development with stunning ocean views.', photos: ['https://picsum.photos/seed/prop5/800/600', 'https://picsum.photos/seed/prop5b/800/600'], videos: [], rate: '15,000,000', sold: false, hot: true },
  { id: '6', name: 'Industrial Warehouse Complex', description: 'Modern warehouse facility with 100,000 sq ft. Features loading docks, climate control, and 24/7 security.', photos: ['https://picsum.photos/seed/prop6/800/600'], videos: [], rate: '4,500,000', sold: true, hot: false },
  { id: '7', name: 'Mountain Retreat Land', description: '25 acres of forested mountain property with natural springs and wildlife. Ideal for eco-resort or private retreat.', photos: ['https://picsum.photos/seed/prop7/800/600'], videos: [], rate: '980,000', sold: false, hot: false },
  { id: '8', name: 'Urban Mixed-Use Development', description: 'Corner lot in emerging neighborhood. Zoned for mixed residential and commercial use. 15,000 sq ft.', photos: ['https://picsum.photos/seed/prop8/800/600', 'https://picsum.photos/seed/prop8b/800/600'], videos: [], rate: '3,200,000', sold: false, hot: true },
  { id: '9', name: 'Vineyard Estate Property', description: '50 acres of established vineyard with production facilities. Includes tasting room and guest cottages.', photos: ['https://picsum.photos/seed/prop9/800/600'], videos: [], rate: '7,500,000', sold: false, hot: false },
  { id: '10', name: 'Lakefront Recreational Land', description: '8 acres with 500ft of lake frontage. Boat dock, sandy beach, and wooded areas. Utilities available.', photos: ['https://picsum.photos/seed/prop10/800/600'], videos: [], rate: '1,750,000', sold: true, hot: false },
  { id: '11', name: 'Tech Park Development Site', description: '30 acres approved for technology campus. Fiber optic infrastructure in place. Near major highway.', photos: ['https://picsum.photos/seed/prop11/800/600', 'https://picsum.photos/seed/prop11b/800/600'], videos: [], rate: '12,000,000', sold: false, hot: true },
  { id: '12', name: 'Historic District Property', description: 'Rare opportunity in protected historic zone. 1.5 acres with renovation permits approved.', photos: ['https://picsum.photos/seed/prop12/800/600'], videos: [], rate: '2,100,000', sold: false, hot: false },
  { id: '13', name: 'Golf Course Adjacent Land', description: '5 acres bordering championship golf course. Approved for luxury home construction.', photos: ['https://picsum.photos/seed/prop13/800/600'], videos: [], rate: '1,450,000', sold: false, hot: false },
  { id: '14', name: 'Airport Business Park Lot', description: 'Commercial lot in airport business park. Ideal for logistics, aviation services, or corporate HQ.', photos: ['https://picsum.photos/seed/prop14/800/600', 'https://picsum.photos/seed/prop14b/800/600'], videos: [], rate: '5,800,000', sold: true, hot: false },
  { id: '15', name: 'Suburban Shopping Center Site', description: '12 acres zoned for retail development. High traffic area with excellent demographics.', photos: ['https://picsum.photos/seed/prop15/800/600'], videos: [], rate: '9,200,000', sold: false, hot: true },
];

// Fake data for Construction Projects
const fakeConstructions = [
  { id: '1', name: 'Skyline Tower Residences', description: '45-story luxury condominium tower with 200 units. Features rooftop amenities, infinity pool, and smart home technology throughout.', photos: ['https://picsum.photos/seed/con1/800/600', 'https://picsum.photos/seed/con1b/800/600'], videos: [], rate: '85,000,000', sold: false, hot: true },
  { id: '2', name: 'Green Valley Shopping Mall', description: 'Sustainable retail complex with 150 stores, food court, and entertainment center. LEED Gold certification pending.', photos: ['https://picsum.photos/seed/con2/800/600'], videos: [], rate: '120,000,000', sold: false, hot: true },
  { id: '3', name: 'Harbor View Office Complex', description: 'Class A office building with 500,000 sq ft. Waterfront location with modern architecture and parking structure.', photos: ['https://picsum.photos/seed/con3/800/600', 'https://picsum.photos/seed/con3b/800/600'], videos: [], rate: '95,000,000', sold: true, hot: false },
  { id: '4', name: 'Wellness Resort & Spa', description: 'Luxury wellness destination with 100 rooms, spa facilities, yoga pavilions, and organic restaurant.', photos: ['https://picsum.photos/seed/con4/800/600'], videos: [], rate: '45,000,000', sold: false, hot: false },
  { id: '5', name: 'Metro Station Development', description: 'Mixed-use transit-oriented development. 300 residential units, retail space, and direct metro access.', photos: ['https://picsum.photos/seed/con5/800/600', 'https://picsum.photos/seed/con5b/800/600'], videos: [], rate: '150,000,000', sold: false, hot: true },
  { id: '6', name: 'University Student Housing', description: '800-bed student accommodation with study areas, gym, and communal spaces. Near campus location.', photos: ['https://picsum.photos/seed/con6/800/600'], videos: [], rate: '55,000,000', sold: false, hot: false },
  { id: '7', name: 'Medical Center Expansion', description: 'New hospital wing with 200 beds, surgical suites, and diagnostic imaging center.', photos: ['https://picsum.photos/seed/con7/800/600'], videos: [], rate: '180,000,000', sold: true, hot: false },
  { id: '8', name: 'Eco-Friendly Business Park', description: 'Carbon-neutral office campus with solar panels, green roofs, and electric vehicle charging.', photos: ['https://picsum.photos/seed/con8/800/600', 'https://picsum.photos/seed/con8b/800/600'], videos: [], rate: '75,000,000', sold: false, hot: true },
  { id: '9', name: 'Luxury Hotel & Convention Center', description: '5-star hotel with 350 rooms and 50,000 sq ft convention space. Rooftop restaurant and bar.', photos: ['https://picsum.photos/seed/con9/800/600'], videos: [], rate: '200,000,000', sold: false, hot: false },
  { id: '10', name: 'Senior Living Community', description: 'Age-restricted community with 250 independent and assisted living units. Healthcare facilities on-site.', photos: ['https://picsum.photos/seed/con10/800/600'], videos: [], rate: '65,000,000', sold: false, hot: false },
  { id: '11', name: 'Sports Arena Complex', description: 'Multi-purpose arena seating 20,000. Includes training facilities, VIP suites, and entertainment district.', photos: ['https://picsum.photos/seed/con11/800/600', 'https://picsum.photos/seed/con11b/800/600'], videos: [], rate: '350,000,000', sold: false, hot: true },
  { id: '12', name: 'Boutique Hotel Renovation', description: 'Historic building conversion to 75-room boutique hotel. Preserving original architecture with modern amenities.', photos: ['https://picsum.photos/seed/con12/800/600'], videos: [], rate: '28,000,000', sold: true, hot: false },
  { id: '13', name: 'Affordable Housing Project', description: 'Community development with 400 affordable housing units. Playground, community center, and green spaces.', photos: ['https://picsum.photos/seed/con13/800/600'], videos: [], rate: '48,000,000', sold: false, hot: false },
  { id: '14', name: 'Data Center Facility', description: 'State-of-the-art data center with redundant power, cooling, and security systems. 100,000 sq ft.', photos: ['https://picsum.photos/seed/con14/800/600', 'https://picsum.photos/seed/con14b/800/600'], videos: [], rate: '95,000,000', sold: false, hot: true },
  { id: '15', name: 'Waterfront Promenade Development', description: 'Mixed-use waterfront revitalization. Restaurants, retail, public parks, and marina facilities.', photos: ['https://picsum.photos/seed/con15/800/600'], videos: [], rate: '110,000,000', sold: false, hot: false },
];

// Fake data for Houses for Sale
const fakeHouses = [
  { id: '1', name: 'Modern Minimalist Villa', description: '5 bedroom, 4 bathroom contemporary home with open floor plan. Floor-to-ceiling windows, chef\'s kitchen, and infinity pool.', photos: ['https://picsum.photos/seed/house1/800/600', 'https://picsum.photos/seed/house1b/800/600'], videos: [], price: '1,850,000', sold: false, hot: true },
  { id: '2', name: 'Colonial Heritage Estate', description: 'Stately 6 bedroom colonial on 3 acres. Original hardwood floors, updated kitchen, guest house, and horse stable.', photos: ['https://picsum.photos/seed/house2/800/600'], videos: [], price: '2,400,000', sold: false, hot: true },
  { id: '3', name: 'Cozy Craftsman Bungalow', description: 'Charming 3 bedroom home with original built-ins, covered porch, and landscaped garden. Walk to downtown.', photos: ['https://picsum.photos/seed/house3/800/600', 'https://picsum.photos/seed/house3b/800/600'], videos: [], price: '485,000', sold: true, hot: false },
  { id: '4', name: 'Oceanfront Beach House', description: '4 bedroom beachfront property with direct ocean access. Multiple decks, outdoor shower, and garage for boat storage.', photos: ['https://picsum.photos/seed/house4/800/600'], videos: [], price: '3,200,000', sold: false, hot: true },
  { id: '5', name: 'Mountain Cabin Retreat', description: 'Rustic luxury 3 bedroom cabin with stone fireplace, hot tub, and ski-in/ski-out access. Fully furnished.', photos: ['https://picsum.photos/seed/house5/800/600', 'https://picsum.photos/seed/house5b/800/600'], videos: [], price: '975,000', sold: false, hot: false },
  { id: '6', name: 'Urban Penthouse Loft', description: 'Stunning 2 bedroom penthouse with 20ft ceilings, exposed brick, private terrace, and city views.', photos: ['https://picsum.photos/seed/house6/800/600'], videos: [], price: '1,650,000', sold: false, hot: true },
  { id: '7', name: 'Family-Friendly Suburban Home', description: '4 bedroom, 3 bathroom home in top school district. Finished basement, fenced yard, and 2-car garage.', photos: ['https://picsum.photos/seed/house7/800/600'], videos: [], price: '625,000', sold: true, hot: false },
  { id: '8', name: 'Mediterranean Style Villa', description: '5 bedroom villa with terracotta roof, courtyard fountain, wine cellar, and resort-style pool.', photos: ['https://picsum.photos/seed/house8/800/600', 'https://picsum.photos/seed/house8b/800/600'], videos: [], price: '2,100,000', sold: false, hot: false },
  { id: '9', name: 'Renovated Victorian Townhouse', description: '3-story townhouse with period details, modern kitchen, rooftop deck, and private garden.', photos: ['https://picsum.photos/seed/house9/800/600'], videos: [], price: '895,000', sold: false, hot: false },
  { id: '10', name: 'Smart Home Contemporary', description: '4 bedroom fully automated home. Voice-controlled systems, solar panels, EV charging, and home theater.', photos: ['https://picsum.photos/seed/house10/800/600'], videos: [], price: '1,450,000', sold: false, hot: true },
  { id: '11', name: 'Lakeside Log Home', description: 'Handcrafted 4 bedroom log home on private lake. Great room with stone fireplace, dock, and wooded privacy.', photos: ['https://picsum.photos/seed/house11/800/600', 'https://picsum.photos/seed/house11b/800/600'], videos: [], price: '1,275,000', sold: true, hot: false },
  { id: '12', name: 'Desert Modern Oasis', description: 'Architectural 3 bedroom home with desert landscaping, saltwater pool, and mountain views.', photos: ['https://picsum.photos/seed/house12/800/600'], videos: [], price: '1,100,000', sold: false, hot: false },
  { id: '13', name: 'Historic Downtown Condo', description: '2 bedroom condo in converted historic building. High ceilings, exposed beams, and walkable location.', photos: ['https://picsum.photos/seed/house13/800/600'], videos: [], price: '520,000', sold: false, hot: false },
  { id: '14', name: 'Golf Course Estate', description: '6 bedroom estate on 18th fairway. Indoor pool, home gym, theater room, and putting green.', photos: ['https://picsum.photos/seed/house14/800/600', 'https://picsum.photos/seed/house14b/800/600'], videos: [], price: '3,850,000', sold: false, hot: true },
  { id: '15', name: 'Eco-Friendly Tiny Home', description: 'Sustainable 1 bedroom tiny home on 1 acre. Off-grid capable with solar, rainwater collection, and organic garden.', photos: ['https://picsum.photos/seed/house15/800/600'], videos: [], price: '185,000', sold: true, hot: false },
];

export const DataProvider = ({ children }) => {
  const [properties, setProperties] = useState([]);
  const [constructions, setConstructions] = useState([]);
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to load data from localStorage
  const loadDataFromStorage = useCallback(() => {
    const storedProperties = localStorage.getItem('properties');
    const storedConstructions = localStorage.getItem('constructions');
    const storedHouses = localStorage.getItem('houses');

    if (storedProperties) {
      setProperties(JSON.parse(storedProperties));
    } else {
      setProperties(fakeProperties);
      localStorage.setItem('properties', JSON.stringify(fakeProperties));
    }

    if (storedConstructions) {
      setConstructions(JSON.parse(storedConstructions));
    } else {
      setConstructions(fakeConstructions);
      localStorage.setItem('constructions', JSON.stringify(fakeConstructions));
    }

    if (storedHouses) {
      setHouses(JSON.parse(storedHouses));
    } else {
      setHouses(fakeHouses);
      localStorage.setItem('houses', JSON.stringify(fakeHouses));
    }
  }, []);

  useEffect(() => {
    loadDataFromStorage();
    setLoading(false);

    // Listen for storage events (changes from other tabs/windows)
    const handleStorageChange = (event) => {
      if (event.key === 'properties' || event.key === 'constructions' || event.key === 'houses') {
        loadDataFromStorage();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [loadDataFromStorage]);

  const saveToStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  // Properties CRUD
  const addProperty = (property) => {
    const newProperty = { ...property, id: Date.now().toString() };
    const updated = [...properties, newProperty];
    setProperties(updated);
    saveToStorage('properties', updated);
    return newProperty;
  };

  const updateProperty = (id, property) => {
    const updated = properties.map((p) => (p.id === id ? { ...p, ...property } : p));
    setProperties(updated);
    saveToStorage('properties', updated);
  };

  const deleteProperty = (id) => {
    const updated = properties.filter((p) => p.id !== id);
    setProperties(updated);
    saveToStorage('properties', updated);
  };

  // Constructions CRUD
  const addConstruction = (construction) => {
    const newConstruction = { ...construction, id: Date.now().toString() };
    const updated = [...constructions, newConstruction];
    setConstructions(updated);
    saveToStorage('constructions', updated);
    return newConstruction;
  };

  const updateConstruction = (id, construction) => {
    const updated = constructions.map((c) => (c.id === id ? { ...c, ...construction } : c));
    setConstructions(updated);
    saveToStorage('constructions', updated);
  };

  const deleteConstruction = (id) => {
    const updated = constructions.filter((c) => c.id !== id);
    setConstructions(updated);
    saveToStorage('constructions', updated);
  };

  // Houses CRUD
  const addHouse = (house) => {
    const newHouse = { ...house, id: Date.now().toString() };
    const updated = [...houses, newHouse];
    setHouses(updated);
    saveToStorage('houses', updated);
    return newHouse;
  };

  const updateHouse = (id, house) => {
    const updated = houses.map((h) => (h.id === id ? { ...h, ...house } : h));
    setHouses(updated);
    saveToStorage('houses', updated);
  };

  const deleteHouse = (id) => {
    const updated = houses.filter((h) => h.id !== id);
    setHouses(updated);
    saveToStorage('houses', updated);
  };

  // Get featured (hot) items - for public view
  const getFeaturedProperties = () => properties.filter(p => p.hot && !p.sold).slice(0, 6);
  const getFeaturedConstructions = () => constructions.filter(c => c.hot && !c.sold).slice(0, 6);
  const getFeaturedHouses = () => houses.filter(h => h.hot && !h.sold).slice(0, 6);

  // Get single item by ID
  const getPropertyById = (id) => properties.find(p => p.id === id);
  const getConstructionById = (id) => constructions.find(c => c.id === id);
  const getHouseById = (id) => houses.find(h => h.id === id);

  // Manual refresh function
  const refreshData = useCallback(() => {
    setLoading(true);
    loadDataFromStorage();
    setLoading(false);
  }, [loadDataFromStorage]);

  return (
    <DataContext.Provider
      value={{
        properties,
        constructions,
        houses,
        loading,
        // CRUD operations (admin)
        addProperty,
        updateProperty,
        deleteProperty,
        addConstruction,
        updateConstruction,
        deleteConstruction,
        addHouse,
        updateHouse,
        deleteHouse,
        // Read operations (public)
        getFeaturedProperties,
        getFeaturedConstructions,
        getFeaturedHouses,
        getPropertyById,
        getConstructionById,
        getHouseById,
        refreshData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
