import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import AdminNavbar from '../../components/AdminNavbar';
import { useData } from '../../context/DataContext';

// Gold theme for charts
// Hot (Dark Gold), Available (Gold), Sold (Lighter Gold), Regular (Lightest Gold)
const CHART_COLORS = ['#D4900A', '#FCA311', '#FDBA4A', '#FED683'];

const Dashboard = () => {
  const { properties, constructions, houses } = useData();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Get items for selected category
  const getItemsForCategory = (category) => {
    switch (category) {
      case 'Properties':
        return { items: properties, type: 'property' };
      case 'Construction':
        return { items: constructions, type: 'construction' };
      case 'Houses for Sale':
        return { items: houses, type: 'house' };
      default:
        return { items: [], type: '' };
    }
  };

  const handleCardClick = (categoryTitle) => {
    setSelectedCategory(categoryTitle);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedCategory(null);
  };

  // Separate data for each feature
  const getChartData = (items) => [
    { name: 'Hot', value: items.filter((i) => i.hot).length },
    { name: 'Available', value: items.filter((i) => !i.sold).length },
    { name: 'Sold', value: items.filter((i) => i.sold).length },
    { name: 'Regular', value: items.filter((i) => !i.hot).length },
  ];

  const chartCategories = [
    { title: 'Properties', total: properties.length, data: getChartData(properties) },
    { title: 'Construction', total: constructions.length, data: getChartData(constructions) },
    { title: 'Houses for Sale', total: houses.length, data: getChartData(houses) },
  ];

  const stats = [
    {
      label: 'Total Properties',
      value: properties.length,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      ),
      trend: properties.filter((p) => p.hot).length,
      trendLabel: 'hot',
    },
    {
      label: 'Construction Projects',
      value: constructions.length,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
      ),
      trend: constructions.filter((c) => !c.sold).length,
      trendLabel: 'active',
    },
    {
      label: 'Houses for Sale',
      value: houses.length,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      ),
      trend: houses.filter((h) => h.hot).length,
      trendLabel: 'featured',
    },
  ];

  const sections = [
    {
      id: 'properties',
      title: 'Properties',
      description: 'Manage your property listings',
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      ),
      count: properties.length,
      actions: [
        { label: 'Add New', to: '/admin/properties/create', variant: 'primary' },
        { label: 'Edit', to: '/admin/properties/update', variant: 'secondary' },
        { label: 'Remove', to: '/admin/properties/delete', variant: 'danger' },
      ],
    },
    {
      id: 'construction',
      title: 'Construction',
      description: 'Handle construction projects',
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
      ),
      count: constructions.length,
      actions: [
        { label: 'Add New', to: '/admin/construction/create', variant: 'primary' },
        { label: 'Edit', to: '/admin/construction/update', variant: 'secondary' },
        { label: 'Remove', to: '/admin/construction/delete', variant: 'danger' },
      ],
    },
    {
      id: 'houses',
      title: 'Houses for Sale',
      description: 'Manage house listings',
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      ),
      count: houses.length,
      actions: [
        { label: 'Add New', to: '/admin/houses/create', variant: 'primary' },
        { label: 'Edit', to: '/admin/houses/update', variant: 'secondary' },
        { label: 'Remove', to: '/admin/houses/delete', variant: 'danger' },
      ],
    },
  ];

  const getButtonClasses = (variant) => {
    const base =
      'flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-1';
    switch (variant) {
      case 'primary':
        // Dark navy #14213D
        return `${base} bg-[#14213D] text-white hover:bg-[#0d1628] focus:ring-[#14213D]/50`;
      case 'secondary':
        // Lighter navy
        return `${base} bg-[#2a3f5f] text-white hover:bg-[#1d2d4f] focus:ring-[#2a3f5f]/50`;
      case 'danger':
        // White/gray
        return `${base} bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-300/50`;
      default:
        return base;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <AdminNavbar />

      {/* Main Layout Container */}
      <div className="flex">
        {/* Left Sidebar - Overview */}
        <div className="hidden lg:block w-64 flex-shrink-0 p-4">
          <div className="sticky top-4 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Overview</h2>
              <span className="px-2 py-1 text-xs font-medium bg-primary text-white rounded-full">
                {properties.length + constructions.length + houses.length}
              </span>
            </div>

            {/* Total Sold */}
            <Link
              to="/admin/listings?filter=sold"
              className="block bg-gray-50 rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md hover:bg-gray-100 transition-all duration-200 cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Total Sold</p>
                  <p className="text-2xl font-bold text-gray-800 mt-1">
                    {properties.filter((p) => p.sold).length + constructions.filter((c) => c.sold).length + houses.filter((h) => h.sold).length}
                  </p>
                </div>
                <div className="p-2 rounded-lg bg-gray-200">
                  <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </Link>

            {/* Hot Listings */}
            <Link
              to="/admin/listings?filter=hot"
              className="block bg-gray-50 rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md hover:bg-gray-100 transition-all duration-200 cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Hot Listings</p>
                  <p className="text-2xl font-bold text-gray-800 mt-1">
                    {properties.filter((p) => p.hot).length + constructions.filter((c) => c.hot).length + houses.filter((h) => h.hot).length}
                  </p>
                </div>
                <div className="p-2 rounded-lg bg-gray-200">
                  <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                  </svg>
                </div>
              </div>
            </Link>

            {/* Available */}
            <Link
              to="/admin/listings?filter=available"
              className="block bg-gray-50 rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md hover:bg-gray-100 transition-all duration-200 cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Available</p>
                  <p className="text-2xl font-bold text-gray-800 mt-1">
                    {properties.filter((p) => !p.sold).length + constructions.filter((c) => !c.sold).length + houses.filter((h) => !h.sold).length}
                  </p>
                </div>
                <div className="p-2 rounded-lg bg-gray-200">
                  <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
              </div>
            </Link>

            {/* Total Listings */}
            <Link
              to="/admin/listings?filter=all"
              className="block bg-gray-50 rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md hover:bg-gray-100 transition-all duration-200 cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Total Listings</p>
                  <p className="text-2xl font-bold text-gray-800 mt-1">
                    {properties.length + constructions.length + houses.length}
                  </p>
                </div>
                <div className="p-2 rounded-lg bg-gray-200">
                  <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Center Content */}
        <div className="flex-1 min-w-0">
          {/* Hero Section */}
          <div className="bg-primary mx-4 lg:mx-8 mt-4 rounded-2xl px-6 py-8">
            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              Dashboard
            </h1>
            <p className="mt-1 text-white/70 text-base">
              Manage your properties, construction projects, and house listings
            </p>
          </div>

          <main className="px-4 lg:px-8 py-6">
            <div>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-[#F5EFE6] rounded-xl px-4 py-3 hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-[#14213D]">{stat.value}</span>
                      <span className="text-sm text-gray-600">{stat.label}</span>
                    </div>
                    <div className="p-2 rounded-lg bg-[#14213D] text-[#FCA311]">
                      {stat.icon}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Analytics Section - Pie Charts */}
            <div className="mb-10">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Analytics Overview</h2>
                  <p className="text-gray-500 text-sm mt-1">Sales and featured status breakdown</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {chartCategories.map((category) => (
                  <div
                    key={category.title}
                    onClick={() => handleCardClick(category.title)}
                    className="bg-white rounded-2xl shadow-sm border border-gray-200/60 p-6 hover:shadow-lg hover:border-primary/30 transition-all duration-200 cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">{category.title}</h3>
                      <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-600">
                        {category.total} total
                      </span>
                    </div>

                    {category.total > 0 ? (
                      <div className="flex items-center">
                        {/* Chart */}
                        <div className="w-1/2">
                          <ResponsiveContainer width="100%" height={220}>
                            <PieChart>
                              <Pie
                                data={category.data.filter((d) => d.value > 0)}
                                cx="50%"
                                cy="50%"
                                innerRadius={55}
                                outerRadius={90}
                                paddingAngle={2}
                                dataKey="value"
                              >
                                {category.data.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={CHART_COLORS[index]} />
                                ))}
                              </Pie>
                              <Tooltip
                                formatter={(value, name) => [`${value} items`, name]}
                                contentStyle={{
                                  backgroundColor: 'white',
                                  border: '1px solid #e5e7eb',
                                  borderRadius: '8px',
                                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                                }}
                              />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                        {/* Legend */}
                        <div className="w-1/2 space-y-4 pl-4">
                          <div className="flex items-center gap-2 text-sm">
                            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: '#D4900A' }}></span>
                            <span className="text-gray-600">Hot</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: '#FCA311' }}></span>
                            <span className="text-gray-600">Available</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: '#FDBA4A' }}></span>
                            <span className="text-gray-600">Sold</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: '#FED683' }}></span>
                            <span className="text-gray-600">Regular</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="h-[220px] flex items-center justify-center text-gray-400">
                        No data available
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Overview - Mobile/Tablet (shown below lg breakpoint) */}
            <div className="lg:hidden mb-10">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200/60 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">Overview</h2>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Link to="/admin/listings?filter=sold" className="p-4 rounded-xl bg-gray-50 border border-gray-200 hover:shadow-md hover:bg-gray-100 transition-all">
                    <p className="text-2xl font-bold text-gray-800">
                      {properties.filter((p) => p.sold).length + constructions.filter((c) => c.sold).length + houses.filter((h) => h.sold).length}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">Total Sold</p>
                  </Link>
                  <Link to="/admin/listings?filter=hot" className="p-4 rounded-xl bg-gray-50 border border-gray-200 hover:shadow-md hover:bg-gray-100 transition-all">
                    <p className="text-2xl font-bold text-gray-800">
                      {properties.filter((p) => p.hot).length + constructions.filter((c) => c.hot).length + houses.filter((h) => h.hot).length}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">Hot Listings</p>
                  </Link>
                  <Link to="/admin/listings?filter=available" className="p-4 rounded-xl bg-gray-50 border border-gray-200 hover:shadow-md hover:bg-gray-100 transition-all">
                    <p className="text-2xl font-bold text-gray-800">
                      {properties.filter((p) => !p.sold).length + constructions.filter((c) => !c.sold).length + houses.filter((h) => !h.sold).length}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">Available</p>
                  </Link>
                  <Link to="/admin/listings?filter=all" className="p-4 rounded-xl bg-gray-50 border border-gray-200 hover:shadow-md hover:bg-gray-100 transition-all">
                    <p className="text-2xl font-bold text-gray-800">
                      {properties.length + constructions.length + houses.length}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">Total Listings</p>
                  </Link>
                </div>
              </div>
            </div>

            {/* Quick Actions - Mobile/Tablet (shown below lg breakpoint) */}
            <div className="lg:hidden mt-10">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
                <p className="text-gray-500 text-sm mt-1">Manage your listings</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {sections.map((section) => (
                  <div
                    key={section.id}
                    className="group bg-white rounded-2xl shadow-sm border border-gray-200/60 overflow-hidden hover:shadow-lg hover:border-gray-300/60 transition-all duration-200"
                  >
                    <div className="p-4 border-b border-gray-100">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-primary-light text-white shadow-md shadow-primary/25">
                          {section.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-semibold text-gray-900 truncate">
                            {section.title}
                          </h3>
                          <span className="text-xs text-gray-500">{section.count} items</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 bg-gray-50/50 space-y-2">
                      {section.actions.map((action) => (
                        <Link
                          key={action.label}
                          to={action.to}
                          className={getButtonClasses(action.variant)}
                          aria-label={`${action.label} ${section.title}`}
                        >
                          <span>{action.label}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            </div>
          </main>
        </div>

        {/* Right Sidebar - Quick Actions */}
        <div className="hidden lg:block w-72 flex-shrink-0 p-4 pt-4">
          <div className="sticky top-4 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
              <span className="px-2 py-1 text-xs font-medium bg-primary text-white rounded-full">
                {sections.length}
              </span>
            </div>

            {sections.map((section) => (
              <div
                key={section.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200/60 overflow-hidden hover:shadow-md transition-all duration-200"
              >
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-sm font-semibold text-gray-900">
                      {section.title}
                    </h3>
                    <span className="px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-600 rounded">
                      {section.count}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mb-3">{section.description}</p>
                  <div className="space-y-2">
                    {section.actions.map((action) => (
                      <Link
                        key={action.label}
                        to={action.to}
                        className={`${getButtonClasses(action.variant)} !py-2 !text-sm !rounded-lg`}
                        aria-label={`${action.label} ${section.title}`}
                      >
                        <span>{action.label}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal Popup */}
      {modalOpen && selectedCategory && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 transition-opacity"
            onClick={closeModal}
          />

          {/* Modal */}
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{selectedCategory}</h2>
                  <p className="text-sm text-gray-500 mt-1">
                    {getItemsForCategory(selectedCategory).items.length} items
                  </p>
                </div>
                <button
                  onClick={closeModal}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto max-h-[60vh]">
                {getItemsForCategory(selectedCategory).items.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No items found</p>
                  </div>
                ) : (
                  <div>
                    {/* Table Header */}
                    <div className="flex items-center gap-3 py-2 px-2 border-b border-gray-200 bg-gray-50 rounded-t-lg">
                      <div className="w-12 flex-shrink-0"></div>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide flex-1">Name</p>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide flex-shrink-0 w-24 text-center">Status</p>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide flex-shrink-0 w-28 text-right">Price</p>
                    </div>
                    {/* Table Body */}
                    <div className="divide-y divide-gray-100">
                    {getItemsForCategory(selectedCategory).items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-3 py-3 hover:bg-gray-50 px-2 rounded transition-colors"
                      >
                        {/* Image */}
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                          {item.photos && item.photos.length > 0 ? (
                            <img
                              src={item.photos[0]}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                          )}
                        </div>

                        {/* Name */}
                        <p className="font-medium text-gray-900 truncate flex-1">{item.name}</p>

                        {/* Status */}
                        <div className="flex items-center justify-center gap-1 flex-shrink-0 w-24">
                          {item.hot && (
                            <span className="px-2 py-0.5 text-xs font-medium bg-amber-100 text-amber-700 rounded">
                              Hot
                            </span>
                          )}
                          {item.sold ? (
                            <span className="px-2 py-0.5 text-xs font-medium bg-red-100 text-red-700 rounded">
                              Sold
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 text-xs font-medium bg-green-100 text-green-700 rounded">
                              Available
                            </span>
                          )}
                        </div>

                        {/* Price */}
                        <p className="font-semibold text-gray-900 flex-shrink-0 w-28 text-right">
                          ${item.rate || item.price}
                        </p>
                      </div>
                    ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-end p-4 border-t border-gray-200 bg-gray-50">
                <Link
                  to={`/admin/listings?filter=all`}
                  className="px-4 py-2 text-sm font-medium text-white bg-[#14213D] rounded-lg hover:bg-[#0d1628] transition-colors"
                  onClick={closeModal}
                >
                  View All Listings
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
