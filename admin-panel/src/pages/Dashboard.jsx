import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useData } from '../context/DataContext';

const Dashboard = () => {
  const { properties, constructions, houses } = useData();

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
        {
          label: 'Add New',
          to: '/properties/create',
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          ),
          variant: 'primary',
        },
        {
          label: 'Edit',
          to: '/properties/update',
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          ),
          variant: 'secondary',
        },
        {
          label: 'Remove',
          to: '/properties/delete',
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          ),
          variant: 'danger',
        },
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
        {
          label: 'Add New',
          to: '/construction/create',
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          ),
          variant: 'primary',
        },
        {
          label: 'Edit',
          to: '/construction/update',
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          ),
          variant: 'secondary',
        },
        {
          label: 'Remove',
          to: '/construction/delete',
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          ),
          variant: 'danger',
        },
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
        {
          label: 'Add New',
          to: '/houses/create',
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          ),
          variant: 'primary',
        },
        {
          label: 'Edit',
          to: '/houses/update',
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          ),
          variant: 'secondary',
        },
        {
          label: 'Remove',
          to: '/houses/delete',
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          ),
          variant: 'danger',
        },
      ],
    },
  ];

  const getButtonClasses = (variant) => {
    const base =
      'flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium transition-all duration-200 cursor-pointer min-h-[44px] focus:outline-none focus:ring-2 focus:ring-offset-2';
    switch (variant) {
      case 'primary':
        return `${base} bg-primary text-white hover:bg-primary-light focus:ring-primary/50`;
      case 'secondary':
        return `${base} bg-accent/10 text-accent-dark hover:bg-accent/20 focus:ring-accent/50`;
      case 'danger':
        return `${base} bg-red-50 text-red-600 hover:bg-red-100 focus:ring-red-500/50`;
      default:
        return base;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <Navbar />

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-primary">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-2xl transform -translate-x-1/2 translate-y-1/2" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                Welcome back
              </h1>
              <p className="mt-2 text-white/70 text-lg max-w-xl leading-relaxed">
                Manage your properties, construction projects, and house listings from one central dashboard.
              </p>
            </div>
            <div className="flex items-center gap-2 text-white/60 text-sm">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 pb-12">
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

        {/* Quick Actions Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
            <p className="text-gray-500 text-sm mt-1">Manage your listings efficiently</p>
          </div>
        </div>

        {/* Section Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {sections.map((section) => (
            <div
              key={section.id}
              className="group bg-white rounded-2xl shadow-sm border border-gray-200/60 overflow-hidden hover:shadow-lg hover:border-gray-300/60 transition-all duration-200"
            >
              {/* Card Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-primary-light text-white shadow-lg shadow-primary/25">
                    {section.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900 truncate">
                        {section.title}
                      </h3>
                      <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                        {section.count} items
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-gray-500 line-clamp-1">{section.description}</p>
                  </div>
                </div>
              </div>

              {/* Card Actions */}
              <div className="p-4 bg-gray-50/50 space-y-3">
                {section.actions.map((action) => (
                  <Link
                    key={action.label}
                    to={action.to}
                    className={getButtonClasses(action.variant)}
                    aria-label={`${action.label} ${section.title}`}
                  >
                    {action.icon}
                    <span>{action.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activity Placeholder */}
        <div className="mt-10 bg-white rounded-2xl shadow-sm border border-gray-200/60 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Overview</h2>
              <p className="text-gray-500 text-sm mt-1">Summary of your inventory</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
              <p className="text-2xl font-bold text-primary">
                {properties.filter((p) => p.sold).length + constructions.filter((c) => c.sold).length + houses.filter((h) => h.sold).length}
              </p>
              <p className="text-sm text-gray-600 mt-1">Total Sold</p>
            </div>
            <div className="p-4 rounded-xl bg-accent/10 border border-accent/20">
              <p className="text-2xl font-bold text-accent-dark">
                {properties.filter((p) => p.hot).length + constructions.filter((c) => c.hot).length + houses.filter((h) => h.hot).length}
              </p>
              <p className="text-sm text-gray-600 mt-1">Hot Listings</p>
            </div>
            <div className="p-4 rounded-xl bg-green-50 border border-green-100">
              <p className="text-2xl font-bold text-green-700">
                {properties.filter((p) => !p.sold).length + constructions.filter((c) => !c.sold).length + houses.filter((h) => !h.sold).length}
              </p>
              <p className="text-sm text-gray-600 mt-1">Available</p>
            </div>
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
              <p className="text-2xl font-bold text-gray-700">
                {properties.length + constructions.length + houses.length}
              </p>
              <p className="text-sm text-gray-600 mt-1">Total Listings</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
