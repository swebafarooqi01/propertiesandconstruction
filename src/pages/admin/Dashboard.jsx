import { Link } from 'react-router-dom';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import AdminNavbar from '../../components/AdminNavbar';
import { useData } from '../../context/DataContext';

// Yellow/Gold theme for charts
// Hot (Dark Amber), Available (Amber), Sold (Yellow), Regular (Pale Yellow)
const CHART_COLORS = ['#B45309', '#F59E0B', '#FBBF24', '#FDE68A'];

const Dashboard = () => {
  const { properties, constructions, houses } = useData();

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
        // Dark blue
        return `${base} bg-blue-800 text-white hover:bg-blue-900 focus:ring-blue-800/50`;
      case 'secondary':
        // Lighter blue
        return `${base} bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500/50`;
      case 'danger':
        // Light blue
        return `${base} bg-blue-100 text-blue-800 hover:bg-blue-200 focus:ring-blue-300/50`;
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
          <div className="relative overflow-hidden bg-primary mx-4 lg:mx-8 mt-4 rounded-2xl">
            <div className="absolute inset-0">
              <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-2xl transform -translate-x-1/2 translate-y-1/2" />
            </div>
            <div className="relative px-6 py-8">
              <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                Dashboard
              </h1>
              <p className="mt-1 text-white/70 text-base">
                Manage your properties, construction projects, and house listings
              </p>
            </div>
          </div>

          <main className="px-4 lg:px-8 py-6">
            <div>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-gray-200/60 hover:shadow-md hover:border-gray-300/60 transition-all duration-200"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500 tracking-wide uppercase">
                        {stat.label}
                      </p>
                      <p className="mt-3 text-4xl font-bold text-gray-900">{stat.value}</p>
                      {stat.trend > 0 && (
                        <p className="mt-2 flex items-center gap-1.5 text-sm">
                          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-accent/20">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                          </span>
                          <span className="text-gray-600">
                            {stat.trend} {stat.trendLabel}
                          </span>
                        </p>
                      )}
                    </div>
                    <div className="p-3 rounded-xl bg-primary/5 text-primary">{stat.icon}</div>
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
                    className="bg-white rounded-2xl shadow-sm border border-gray-200/60 p-6 hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">{category.title}</h3>
                      <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-600">
                        {category.total} total
                      </span>
                    </div>

                    {category.total > 0 ? (
                      <>
                        <ResponsiveContainer width="100%" height={200}>
                          <PieChart>
                            <Pie
                              data={category.data.filter((d) => d.value > 0)}
                              cx="50%"
                              cy="50%"
                              innerRadius={50}
                              outerRadius={80}
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
                        <div className="grid grid-cols-2 gap-2 mt-4">
                          <div className="flex items-center gap-2 text-sm">
                            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: '#B45309' }}></span>
                            <span className="text-gray-600">Hot: {category.data[0].value}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: '#F59E0B' }}></span>
                            <span className="text-gray-600">Available: {category.data[1].value}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: '#FBBF24' }}></span>
                            <span className="text-gray-600">Sold: {category.data[2].value}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: '#FDE68A' }}></span>
                            <span className="text-gray-600">Regular: {category.data[3].value}</span>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="h-[200px] flex items-center justify-center text-gray-400">
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
    </div>
  );
};

export default Dashboard;
