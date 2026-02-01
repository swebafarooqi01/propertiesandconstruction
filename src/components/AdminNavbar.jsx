import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminNavbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <nav className="bg-primary/95 backdrop-blur-md sticky top-0 z-50 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link
            to="/admin/dashboard"
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-white/20 rounded-lg p-1 -m-1"
            aria-label="Go to Dashboard"
          >
            <div className="p-2 bg-white/10 rounded-lg group-hover:bg-white/15 transition-colors duration-200">
              <svg
                className="w-6 h-6 text-accent"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
            <div className="hidden sm:block">
              <span className="text-lg font-semibold text-white tracking-tight">
                Properties Admin
              </span>
            </div>
          </Link>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* View Site Link */}
            <Link
              to="/"
              className="hidden sm:inline-flex items-center gap-2 text-white/70 hover:text-white px-3 py-2 rounded-lg transition-colors duration-200 text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              View Site
            </Link>

            {user && (
              <>
                {/* User Info */}
                <div className="hidden md:flex items-center gap-3 px-3 py-1.5 rounded-lg bg-white/5">
                  <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                    <span className="text-sm font-medium text-accent">
                      {user.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-white leading-tight">{user.name}</p>
                    <p className="text-xs text-white/50">Administrator</p>
                  </div>
                </div>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white px-4 py-2 rounded-lg transition-colors duration-200 text-sm font-medium min-h-[44px] cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/20"
                  aria-label="Logout"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
