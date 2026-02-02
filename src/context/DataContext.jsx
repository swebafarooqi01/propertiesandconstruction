import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const DataContext = createContext(null);

// Fake data for Properties - Houses, Plazas, Farmhouses
const fakeProperties = [
  { id: '1', name: '10 Marla Modern House - DHA Phase 6', description: 'Stunning 10 marla modern house in DHA Phase 6. 5 bedrooms with attached baths, spacious living areas, and beautiful lawn. Prime location near park.', photos: ['https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1576941089067-2de3c901e126?w=800&h=600&fit=crop'], videos: [], rate: '25,000,000', sold: false, hot: true },
  { id: '2', name: '1 Kanal Luxury Villa - Bahria Town', description: 'Magnificent 1 kanal luxury villa in Bahria Town. 6 bedrooms, swimming pool, home theater, and landscaped garden. Fully furnished with imported fittings.', photos: ['https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop'], videos: [], rate: '85,000,000', sold: false, hot: true },
  { id: '3', name: 'Commercial Plaza - Model Town', description: 'Prime commercial plaza in Model Town. Ground + 3 floors with 15 shops and 8 offices. Fully rented with excellent rental income. Great investment.', photos: ['https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1554435493-93422e8220c8?w=800&h=600&fit=crop'], videos: [], rate: '120,000,000', sold: true, hot: false },
  { id: '4', name: '2 Kanal Farmhouse - Bedian Road', description: 'Beautiful 2 kanal farmhouse on Bedian Road. Lush green lawns, fruit orchard, swimming pool, and BBQ area. Perfect weekend retreat.', photos: ['https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800&h=600&fit=crop'], videos: [], rate: '95,000,000', sold: false, hot: false },
  { id: '5', name: '20 Marla Executive House - Lake City', description: 'Executive 20 marla house in Lake City. Modern architecture, 6 bedrooms, home office, and 3 car garage. Lake view with club access.', photos: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop'], videos: [], rate: '65,000,000', sold: false, hot: true },
  { id: '6', name: 'Shopping Plaza - Main Boulevard', description: 'High-value shopping plaza on main boulevard. 25 shops with escalator and parking. Prime commercial location with heavy footfall.', photos: ['https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop'], videos: [], rate: '180,000,000', sold: true, hot: false },
  { id: '7', name: '4 Acres Farmhouse Estate - Raiwind', description: 'Sprawling 4 acres farmhouse estate on Raiwind Road. Main house, guest house, horse stable, and organic farm. Peaceful countryside living.', photos: ['https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=800&h=600&fit=crop'], videos: [], rate: '150,000,000', sold: false, hot: false },
  { id: '8', name: '1 Kanal Designer House - EME Society', description: 'Architecturally designed 1 kanal house in EME Society. Contemporary interiors, 5 bedrooms, rooftop terrace, and smart home features.', photos: ['https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=600&fit=crop'], videos: [], rate: '75,000,000', sold: false, hot: true },
  { id: '9', name: '8 Kanal Luxury Farmhouse - Barki Road', description: 'Exclusive 8 kanal luxury farmhouse on Barki Road. Mansion with 8 bedrooms, cinema hall, tennis court, and private lake.', photos: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop'], videos: [], rate: '350,000,000', sold: false, hot: false },
  { id: '10', name: '7 Marla Beautiful House - Wapda Town', description: 'Well-maintained 7 marla house in Wapda Town. 4 bedrooms, modern kitchen, and car porch. Family-friendly neighborhood.', photos: ['https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop'], videos: [], rate: '18,000,000', sold: true, hot: false },
  { id: '11', name: '2 Kanal Corner House - Cantt Area', description: 'Premium 2 kanal corner house in Cantt area. Basement + 2 floors, 8 bedrooms, and huge lawn. High-security zone.', photos: ['https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&h=600&fit=crop'], videos: [], rate: '135,000,000', sold: false, hot: true },
  { id: '12', name: 'Office Plaza - Gulberg', description: 'Corporate office plaza in Gulberg. 6 floors with modern offices, conference rooms, and underground parking. Fully air-conditioned.', photos: ['https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop'], videos: [], rate: '250,000,000', sold: false, hot: false },
  { id: '13', name: '15 Marla House - Johar Town', description: 'Spacious 15 marla house in Johar Town Block J. 5 bedrooms, servant quarter, and beautiful garden. Near Expo Center.', photos: ['https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&h=600&fit=crop'], videos: [], rate: '42,000,000', sold: false, hot: false },
  { id: '14', name: '3 Kanal Farmhouse - Sheikhupura', description: 'Elegant 3 kanal farmhouse near Sheikhupura. Country-style architecture, large verandah, fruit trees, and farmland included.', photos: ['https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&h=600&fit=crop'], videos: [], rate: '85,000,000', sold: true, hot: false },
  { id: '15', name: '1 Kanal Smart Home - DHA Phase 8', description: 'Ultra-modern 1 kanal smart home in DHA Phase 8. Automated systems, solar panels, 5 bedrooms, and infinity pool.', photos: ['https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&h=600&fit=crop'], videos: [], rate: '92,000,000', sold: false, hot: true },
];

// Fake data for Construction Projects - Gray Structure, Under Construction, Residential & Commercial
const fakeConstructions = [
  { id: '1', name: '10 Marla Gray Structure House - DHA', description: 'Gray structure house on 10 marla in DHA Phase 5. Double storey with 5 bedrooms layout. Solid construction with quality materials. Ready for finishing.', photos: ['https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=600&fit=crop'], videos: [], rate: '8,500,000', sold: false, hot: true },
  { id: '2', name: 'Commercial Plaza Under Construction - Gulberg', description: '4-storey commercial plaza under construction in Gulberg. 20 shops and 10 offices planned. Prime location with high footfall. 60% complete.', photos: ['https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=800&h=600&fit=crop'], videos: [], rate: '45,000,000', sold: false, hot: true },
  { id: '3', name: '1 Kanal Gray Structure - Bahria Town', description: 'Spacious 1 kanal gray structure in Bahria Town. Modern design with basement parking. 6 bedrooms, servant quarter. Structure 100% complete.', photos: ['https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1581094794329-c8112c4e5190?w=800&h=600&fit=crop'], videos: [], rate: '18,000,000', sold: true, hot: false },
  { id: '4', name: '5 Marla House Under Construction - Johar Town', description: 'Beautiful 5 marla house under construction in Johar Town. 3 bedrooms, 2 bathrooms. Contemporary design with car porch. 40% complete.', photos: ['https://images.unsplash.com/photo-1429497419816-9ca5cfb4571a?w=800&h=600&fit=crop'], videos: [], rate: '4,500,000', sold: false, hot: false },
  { id: '5', name: 'Apartment Building Gray Structure - Model Town', description: '6-storey apartment building gray structure in Model Town. 24 apartments with modern amenities. Lift provision included. Great investment opportunity.', photos: ['https://images.unsplash.com/photo-1517089596392-fb9a9033e05b?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=800&h=600&fit=crop'], videos: [], rate: '85,000,000', sold: false, hot: true },
  { id: '6', name: '7 Marla Under Construction House - Valencia', description: 'Modern 7 marla house under construction in Valencia Town. Spanish style architecture. 4 bedrooms with attached baths. 70% complete.', photos: ['https://images.unsplash.com/photo-1590725140246-20acdee442be?w=800&h=600&fit=crop'], videos: [], rate: '6,800,000', sold: false, hot: false },
  { id: '7', name: 'Commercial Building Gray Structure - Main Road', description: 'Prime commercial building gray structure on main road. Ground + 3 floors. Suitable for offices, clinic, or retail. Excellent visibility.', photos: ['https://images.unsplash.com/photo-1486718448742-163732cd1544?w=800&h=600&fit=crop'], videos: [], rate: '32,000,000', sold: true, hot: false },
  { id: '8', name: '10 Marla House Under Construction - EME', description: 'Elegant 10 marla house under construction in EME Society. Double unit with modern elevation. Imported fittings planned. 50% complete.', photos: ['https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=600&fit=crop'], videos: [], rate: '12,500,000', sold: false, hot: true },
  { id: '9', name: '2 Kanal Gray Structure Villa - Cantt', description: 'Luxurious 2 kanal gray structure villa in Cantt area. Basement + 2 floors. Swimming pool provision. Premium location and construction.', photos: ['https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop'], videos: [], rate: '55,000,000', sold: false, hot: false },
  { id: '10', name: 'Row Houses Under Construction - Lake City', description: '5 marla row houses project in Lake City. 12 units under construction. 3 bedrooms each. Gated community with shared amenities.', photos: ['https://images.unsplash.com/photo-1513467535987-fd81bc7d62f8?w=800&h=600&fit=crop'], videos: [], rate: '3,800,000', sold: false, hot: false },
  { id: '11', name: 'Shopping Mall Gray Structure - Ring Road', description: 'Large shopping mall gray structure on Ring Road. 100+ shop capacity. Food court and cinema hall provisions. Joint venture opportunity.', photos: ['https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&h=600&fit=crop'], videos: [], rate: '150,000,000', sold: false, hot: true },
  { id: '12', name: '8 Marla Under Construction - Wapda Town', description: 'Well-designed 8 marla house under construction in Wapda Town. 4 bedrooms, drawing, dining, kitchen. Quality construction. 65% complete.', photos: ['https://images.unsplash.com/photo-1429497419816-9ca5cfb4571a?w=800&h=600&fit=crop'], videos: [], rate: '7,200,000', sold: true, hot: false },
  { id: '13', name: 'Residential Complex Gray Structure - DHA Phase 8', description: 'Modern residential complex gray structure in DHA Phase 8. 8 luxury apartments. Rooftop amenities planned. Ideal for investment.', photos: ['https://images.unsplash.com/photo-1517089596392-fb9a9033e05b?w=800&h=600&fit=crop'], videos: [], rate: '65,000,000', sold: false, hot: false },
  { id: '14', name: '1 Kanal House Under Construction - Phase 6', description: 'Premium 1 kanal house under construction in DHA Phase 6. Basement, ground, and first floor. Modern architecture. 35% complete.', photos: ['https://images.unsplash.com/photo-1590725140246-20acdee442be?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&h=600&fit=crop'], videos: [], rate: '22,000,000', sold: false, hot: true },
  { id: '15', name: 'Office Building Under Construction - Blue Area', description: 'Corporate office building under construction in Blue Area. 10 floors with modern facilities. Green building design. Pre-leasing available.', photos: ['https://images.unsplash.com/photo-1486718448742-163732cd1544?w=800&h=600&fit=crop'], videos: [], rate: '120,000,000', sold: false, hot: false },
];

// Fake data for Houses for Sale - Completed Houses (10 Marla, Kanal, Acres)
const fakeHouses = [
  { id: '1', name: '10 Marla Fully Furnished House - DHA Phase 5', description: 'Brand new 10 marla house in DHA Phase 5. 5 bedrooms with attached baths, modern kitchen, drawing, dining. Imported fixtures and fittings throughout.', photos: ['https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&h=600&fit=crop'], videos: [], price: '18,500,000', sold: false, hot: true },
  { id: '2', name: '1 Kanal Luxury Bungalow - Bahria Town', description: 'Stunning 1 kanal bungalow in Bahria Town. 6 bedrooms, home theater, swimming pool, and lush garden. Fully air-conditioned with solar backup.', photos: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop'], videos: [], price: '42,000,000', sold: false, hot: true },
  { id: '3', name: '5 Marla Beautiful House - Johar Town', description: 'Well-maintained 5 marla house in Johar Town Block J. 3 bedrooms, 2 bathrooms, kitchen, TV lounge. Near market and schools.', photos: ['https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&h=600&fit=crop'], videos: [], price: '4,850,000', sold: true, hot: false },
  { id: '4', name: '2 Kanal Farmhouse - Bedian Road', description: 'Luxurious 2 kanal farmhouse on Bedian Road. 4 bedrooms, huge lawn, BBQ area, servant quarters. Perfect weekend getaway near city.', photos: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop'], videos: [], price: '65,000,000', sold: false, hot: true },
  { id: '5', name: '7 Marla Corner House - Valencia Town', description: 'Beautiful 7 marla corner house in Valencia Town. 4 bedrooms, extra space due to corner. Modern elevation with quality construction.', photos: ['https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&h=600&fit=crop'], videos: [], price: '8,750,000', sold: false, hot: false },
  { id: '6', name: '10 Marla Brand New House - EME Society', description: 'Newly built 10 marla house in EME Society. Double storey, 5 beds, Italian kitchen, wooden flooring. Near park and commercial area.', photos: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop'], videos: [], price: '16,500,000', sold: false, hot: true },
  { id: '7', name: '8 Marla House - Wapda Town', description: 'Comfortable 8 marla house in Wapda Town Phase 1. 4 bedrooms, servant room, car porch. Family-friendly neighborhood.', photos: ['https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop'], videos: [], price: '7,200,000', sold: true, hot: false },
  { id: '8', name: '1 Kanal House - Cantt Area', description: 'Premium 1 kanal house in Cantt area. Basement + 2 floors, 7 bedrooms, home office, gym room. High security neighborhood.', photos: ['https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop'], videos: [], price: '55,000,000', sold: false, hot: false },
  { id: '9', name: '5 Marla New House - Model Town', description: 'Fresh construction 5 marla house in Model Town. 3 bedrooms, 3 bathrooms, modern design. Ready to move in with all utilities.', photos: ['https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=800&h=600&fit=crop'], videos: [], price: '5,500,000', sold: false, hot: false },
  { id: '10', name: '20 Marla Executive House - DHA Phase 6', description: 'Elegant 20 marla house in DHA Phase 6. 6 bedrooms, study room, large lawn, 3 car garage. Ideal for large family.', photos: ['https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=600&fit=crop'], videos: [], price: '38,000,000', sold: false, hot: true },
  { id: '11', name: '3 Acre Estate House - Raiwind', description: 'Magnificent 3 acre estate in Raiwind. Main house, guest house, staff quarters, orchard, and horse stable. Countryside living.', photos: ['https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800&h=600&fit=crop'], videos: [], price: '85,000,000', sold: true, hot: false },
  { id: '12', name: '10 Marla House - Lake City', description: 'Modern 10 marla house in Lake City Sector M-3. 5 bedrooms, scenic views, gated community. Club membership included.', photos: ['https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=800&h=600&fit=crop'], videos: [], price: '15,000,000', sold: false, hot: false },
  { id: '13', name: '6 Marla House - Gulberg', description: 'Prime location 6 marla house in Gulberg. 4 bedrooms, commercial potential. Near MM Alam Road and Liberty Market.', photos: ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop'], videos: [], price: '12,000,000', sold: false, hot: false },
  { id: '14', name: '2 Kanal Modern Villa - DHA Phase 7', description: 'Ultra-modern 2 kanal villa in DHA Phase 7. Smart home system, infinity pool, home cinema. Architectural masterpiece.', photos: ['https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop'], videos: [], price: '95,000,000', sold: false, hot: true },
  { id: '15', name: '5 Marla Renovated House - Township', description: 'Fully renovated 5 marla house in Township Sector A. 3 bedrooms, new plumbing and electrical. Immediate possession.', photos: ['https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop'], videos: [], price: '3,500,000', sold: true, hot: false },
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
