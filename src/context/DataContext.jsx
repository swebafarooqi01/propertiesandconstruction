import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const DataContext = createContext(null);

// Fake data for Properties - Houses, Plazas, Farmhouses
const fakeProperties = [
  { id: '1', name: 'Modern Family Home - Beverly Hills, CA', description: 'Stunning modern house in Beverly Hills. 5 bedrooms with attached baths, spacious living areas, and beautiful lawn. Prime location near Rodeo Drive.', photos: ['https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1576941089067-2de3c901e126?w=800&h=600&fit=crop'], videos: [], rate: '4,500,000', sold: false, hot: true },
  { id: '2', name: 'Luxury Mansion - Miami Beach, FL', description: 'Magnificent luxury mansion in Miami Beach. 6 bedrooms, swimming pool, home theater, and landscaped garden. Fully furnished with imported fittings.', photos: ['https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop'], videos: [], rate: '8,500,000', sold: false, hot: true },
  { id: '3', name: 'Commercial Plaza - Manhattan, NY', description: 'Prime commercial plaza in Manhattan. Ground + 3 floors with 15 shops and 8 offices. Fully rented with excellent rental income. Great investment.', photos: ['https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1554435493-93422e8220c8?w=800&h=600&fit=crop'], videos: [], rate: '12,000,000', sold: true, hot: false },
  { id: '4', name: 'Ranch Estate - Austin, TX', description: 'Beautiful ranch estate in Austin. Lush green lawns, fruit orchard, swimming pool, and BBQ area. Perfect weekend retreat.', photos: ['https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800&h=600&fit=crop'], videos: [], rate: '2,950,000', sold: false, hot: false },
  { id: '5', name: 'Lakefront Estate - Lake Tahoe, NV', description: 'Executive lakefront house in Lake Tahoe. Modern architecture, 6 bedrooms, home office, and 3 car garage. Lake view with club access.', photos: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop'], videos: [], rate: '6,500,000', sold: false, hot: true },
  { id: '6', name: 'Shopping Center - Los Angeles, CA', description: 'High-value shopping center on Sunset Boulevard. 25 shops with escalator and parking. Prime commercial location with heavy footfall.', photos: ['https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop'], videos: [], rate: '18,000,000', sold: true, hot: false },
  { id: '7', name: 'Country Estate - Napa Valley, CA', description: 'Sprawling 10 acres estate in Napa Valley. Main house, guest house, horse stable, and vineyard. Peaceful countryside living.', photos: ['https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=800&h=600&fit=crop'], videos: [], rate: '15,000,000', sold: false, hot: false },
  { id: '8', name: 'Designer Home - Scottsdale, AZ', description: 'Architecturally designed home in Scottsdale. Contemporary interiors, 5 bedrooms, rooftop terrace, and smart home features.', photos: ['https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=600&fit=crop'], videos: [], rate: '3,750,000', sold: false, hot: true },
  { id: '9', name: 'Luxury Estate - The Hamptons, NY', description: 'Exclusive luxury estate in The Hamptons. Mansion with 8 bedrooms, cinema hall, tennis court, and private beach access.', photos: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop'], videos: [], rate: '25,000,000', sold: false, hot: false },
  { id: '10', name: 'Family Home - Denver, CO', description: 'Well-maintained family home in Denver. 4 bedrooms, modern kitchen, and 2 car garage. Family-friendly neighborhood near parks.', photos: ['https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop'], videos: [], rate: '850,000', sold: true, hot: false },
  { id: '11', name: 'Corner Mansion - Bel Air, CA', description: 'Premium corner mansion in Bel Air. Basement + 2 floors, 8 bedrooms, and huge lawn. Gated community with 24/7 security.', photos: ['https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&h=600&fit=crop'], videos: [], rate: '13,500,000', sold: false, hot: true },
  { id: '12', name: 'Office Tower - Chicago, IL', description: 'Corporate office tower in downtown Chicago. 6 floors with modern offices, conference rooms, and underground parking. Fully air-conditioned.', photos: ['https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop'], videos: [], rate: '25,000,000', sold: false, hot: false },
  { id: '13', name: 'Suburban Home - Seattle, WA', description: 'Spacious suburban home in Seattle. 5 bedrooms, guest suite, and beautiful garden. Near downtown and tech hub.', photos: ['https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&h=600&fit=crop'], videos: [], rate: '1,200,000', sold: false, hot: false },
  { id: '14', name: 'Country Farmhouse - Vermont', description: 'Elegant country farmhouse in Vermont. Colonial-style architecture, large porch, fruit trees, and farmland included.', photos: ['https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&h=600&fit=crop'], videos: [], rate: '1,850,000', sold: true, hot: false },
  { id: '15', name: 'Smart Home - San Francisco, CA', description: 'Ultra-modern smart home in San Francisco. Automated systems, solar panels, 5 bedrooms, and infinity pool with city views.', photos: ['https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&h=600&fit=crop'], videos: [], rate: '5,200,000', sold: false, hot: true },
];

// Fake data for Construction Projects - Gray Structure, Under Construction, Residential & Commercial
const fakeConstructions = [
  { id: '1', name: 'Modern Home Under Construction - Malibu, CA', description: 'Gray structure house in Malibu. Double storey with 5 bedrooms layout. Solid construction with quality materials. Ready for finishing.', photos: ['https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=600&fit=crop'], videos: [], rate: '2,850,000', sold: false, hot: true },
  { id: '2', name: 'Commercial Plaza Under Construction - Houston, TX', description: '4-storey commercial plaza under construction in Houston. 20 shops and 10 offices planned. Prime location with high footfall. 60% complete.', photos: ['https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=800&h=600&fit=crop'], videos: [], rate: '8,500,000', sold: false, hot: true },
  { id: '3', name: 'Luxury Villa Gray Structure - Palm Beach, FL', description: 'Spacious luxury villa gray structure in Palm Beach. Modern design with basement parking. 6 bedrooms, guest suite. Structure 100% complete.', photos: ['https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1581094794329-c8112c4e5190?w=800&h=600&fit=crop'], videos: [], rate: '4,200,000', sold: true, hot: false },
  { id: '4', name: 'Family Home Under Construction - Portland, OR', description: 'Beautiful family home under construction in Portland. 3 bedrooms, 2 bathrooms. Contemporary design with 2 car garage. 40% complete.', photos: ['https://images.unsplash.com/photo-1429497419816-9ca5cfb4571a?w=800&h=600&fit=crop'], videos: [], rate: '650,000', sold: false, hot: false },
  { id: '5', name: 'Apartment Building Gray Structure - Brooklyn, NY', description: '6-storey apartment building gray structure in Brooklyn. 24 apartments with modern amenities. Elevator included. Great investment opportunity.', photos: ['https://images.unsplash.com/photo-1517089596392-fb9a9033e05b?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=800&h=600&fit=crop'], videos: [], rate: '12,000,000', sold: false, hot: true },
  { id: '6', name: 'Spanish Style Home Under Construction - San Diego, CA', description: 'Modern Spanish style house under construction in San Diego. 4 bedrooms with attached baths. Ocean views. 70% complete.', photos: ['https://images.unsplash.com/photo-1590725140246-20acdee442be?w=800&h=600&fit=crop'], videos: [], rate: '1,450,000', sold: false, hot: false },
  { id: '7', name: 'Commercial Building Gray Structure - Atlanta, GA', description: 'Prime commercial building gray structure in Atlanta. Ground + 3 floors. Suitable for offices, clinic, or retail. Excellent visibility.', photos: ['https://images.unsplash.com/photo-1486718448742-163732cd1544?w=800&h=600&fit=crop'], videos: [], rate: '5,500,000', sold: true, hot: false },
  { id: '8', name: 'Executive Home Under Construction - Aspen, CO', description: 'Elegant executive home under construction in Aspen. Modern mountain design with premium finishes planned. 50% complete.', photos: ['https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=600&fit=crop'], videos: [], rate: '3,800,000', sold: false, hot: true },
  { id: '9', name: 'Mansion Gray Structure - Newport Beach, CA', description: 'Luxurious mansion gray structure in Newport Beach. Basement + 2 floors. Swimming pool provision. Premium oceanfront location.', photos: ['https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop'], videos: [], rate: '7,500,000', sold: false, hot: false },
  { id: '10', name: 'Townhouses Under Construction - Nashville, TN', description: 'Townhouse project in Nashville. 12 units under construction. 3 bedrooms each. Gated community with shared amenities.', photos: ['https://images.unsplash.com/photo-1513467535987-fd81bc7d62f8?w=800&h=600&fit=crop'], videos: [], rate: '450,000', sold: false, hot: false },
  { id: '11', name: 'Shopping Mall Gray Structure - Phoenix, AZ', description: 'Large shopping mall gray structure in Phoenix. 100+ shop capacity. Food court and cinema hall provisions. Joint venture opportunity.', photos: ['https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&h=600&fit=crop'], videos: [], rate: '25,000,000', sold: false, hot: true },
  { id: '12', name: 'Suburban Home Under Construction - Charlotte, NC', description: 'Well-designed suburban home under construction in Charlotte. 4 bedrooms, living room, dining, kitchen. Quality construction. 65% complete.', photos: ['https://images.unsplash.com/photo-1429497419816-9ca5cfb4571a?w=800&h=600&fit=crop'], videos: [], rate: '520,000', sold: true, hot: false },
  { id: '13', name: 'Condo Complex Gray Structure - San Jose, CA', description: 'Modern condo complex gray structure in San Jose. 8 luxury units. Rooftop amenities planned. Ideal for tech professionals.', photos: ['https://images.unsplash.com/photo-1517089596392-fb9a9033e05b?w=800&h=600&fit=crop'], videos: [], rate: '9,500,000', sold: false, hot: false },
  { id: '14', name: 'Estate Home Under Construction - Savannah, GA', description: 'Premium estate home under construction in Savannah. Basement, ground, and first floor. Southern architecture. 35% complete.', photos: ['https://images.unsplash.com/photo-1590725140246-20acdee442be?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&h=600&fit=crop'], videos: [], rate: '1,800,000', sold: false, hot: true },
  { id: '15', name: 'Office Tower Under Construction - Dallas, TX', description: 'Corporate office tower under construction in Dallas. 10 floors with modern facilities. Green building design. Pre-leasing available.', photos: ['https://images.unsplash.com/photo-1486718448742-163732cd1544?w=800&h=600&fit=crop'], videos: [], rate: '18,000,000', sold: false, hot: false },
];

// Fake data for Houses for Sale - Completed Houses
const fakeHouses = [
  { id: '1', name: 'Fully Furnished Modern Home - Los Angeles, CA', description: 'Brand new modern home in Los Angeles. 5 bedrooms with attached baths, modern kitchen, open floor plan. Imported fixtures and fittings throughout.', photos: ['https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&h=600&fit=crop'], videos: [], price: '2,850,000', sold: false, hot: true },
  { id: '2', name: 'Luxury Waterfront Home - Miami, FL', description: 'Stunning waterfront home in Miami. 6 bedrooms, home theater, swimming pool, and lush garden. Fully air-conditioned with smart home features.', photos: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop'], videos: [], price: '5,200,000', sold: false, hot: true },
  { id: '3', name: 'Charming Family Home - Austin, TX', description: 'Well-maintained family home in Austin. 3 bedrooms, 2 bathrooms, updated kitchen, cozy living room. Near parks and schools.', photos: ['https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&h=600&fit=crop'], videos: [], price: '485,000', sold: true, hot: false },
  { id: '4', name: 'Ranch Property - Montana', description: 'Luxurious ranch property in Montana. 4 bedrooms, huge lawn, BBQ area, guest house. Perfect countryside retreat with mountain views.', photos: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop'], videos: [], price: '1,650,000', sold: false, hot: true },
  { id: '5', name: 'Corner Lot Home - Phoenix, AZ', description: 'Beautiful corner lot home in Phoenix. 4 bedrooms, extra yard space. Modern southwestern design with quality construction.', photos: ['https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&h=600&fit=crop'], videos: [], price: '875,000', sold: false, hot: false },
  { id: '6', name: 'Brand New Contemporary - San Diego, CA', description: 'Newly built contemporary home in San Diego. 5 bedrooms, Italian kitchen, hardwood flooring. Near beach and downtown.', photos: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop'], videos: [], price: '1,650,000', sold: false, hot: true },
  { id: '7', name: 'Suburban Family Home - Denver, CO', description: 'Comfortable family home in Denver suburbs. 4 bedrooms, finished basement, 2 car garage. Family-friendly neighborhood with great schools.', photos: ['https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop'], videos: [], price: '720,000', sold: true, hot: false },
  { id: '8', name: 'Executive Home - Scottsdale, AZ', description: 'Premium executive home in Scottsdale. Basement + 2 floors, 7 bedrooms, home office, gym. Gated community with golf course.', photos: ['https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop'], videos: [], price: '2,550,000', sold: false, hot: false },
  { id: '9', name: 'New Construction Home - Raleigh, NC', description: 'Fresh construction home in Raleigh. 3 bedrooms, 3 bathrooms, modern open design. Ready to move in with all utilities.', photos: ['https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=800&h=600&fit=crop'], videos: [], price: '550,000', sold: false, hot: false },
  { id: '10', name: 'Executive Estate - Greenwich, CT', description: 'Elegant estate in Greenwich. 6 bedrooms, study, large lawn, 3 car garage. Ideal for executive family living.', photos: ['https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=600&fit=crop'], videos: [], price: '3,800,000', sold: false, hot: true },
  { id: '11', name: 'Country Estate - Kentucky', description: 'Magnificent country estate in Kentucky. Main house, guest house, staff quarters, orchard, and horse stable. True countryside living.', photos: ['https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800&h=600&fit=crop'], videos: [], price: '2,850,000', sold: true, hot: false },
  { id: '12', name: 'Lakefront Home - Lake Tahoe, CA', description: 'Modern lakefront home in Lake Tahoe. 5 bedrooms, scenic views, private dock. Community amenities included.', photos: ['https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=800&h=600&fit=crop'], videos: [], price: '4,500,000', sold: false, hot: false },
  { id: '13', name: 'Urban Townhouse - Boston, MA', description: 'Prime location townhouse in Boston. 4 bedrooms, rooftop deck. Walking distance to downtown and universities.', photos: ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop'], videos: [], price: '1,200,000', sold: false, hot: false },
  { id: '14', name: 'Smart Villa - Silicon Valley, CA', description: 'Ultra-modern smart villa in Silicon Valley. Automated systems, infinity pool, home cinema. Architectural masterpiece.', photos: ['https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop'], videos: [], price: '6,500,000', sold: false, hot: true },
  { id: '15', name: 'Renovated Colonial - Virginia', description: 'Fully renovated colonial home in Virginia. 3 bedrooms, updated plumbing and electrical. Historic charm with modern amenities.', photos: ['https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop'], videos: [], price: '650,000', sold: true, hot: false },
];

// Data version - increment this to force refresh localStorage data
const DATA_VERSION = '4.0';

export const DataProvider = ({ children }) => {
  const [properties, setProperties] = useState([]);
  const [constructions, setConstructions] = useState([]);
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to load data from localStorage
  const loadDataFromStorage = useCallback(() => {
    const storedVersion = localStorage.getItem('dataVersion');

    // If version changed, clear old data and use new fake data
    if (storedVersion !== DATA_VERSION) {
      localStorage.removeItem('properties');
      localStorage.removeItem('constructions');
      localStorage.removeItem('houses');
      localStorage.setItem('dataVersion', DATA_VERSION);
    }

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
