import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import ProtectedRoute from './components/ProtectedRoute';

// Layouts
import PublicNavbar from './components/PublicNavbar';
import Footer from './components/Footer';

// Public Pages
import Home from './pages/public/Home';
import Properties from './pages/public/Properties';
import PropertyDetail from './pages/public/PropertyDetail';
import Construction from './pages/public/Construction';
import ConstructionDetail from './pages/public/ConstructionDetail';
import Houses from './pages/public/Houses';
import HouseDetail from './pages/public/HouseDetail';

// Admin Pages
import Login from './pages/admin/Login';
import Signup from './pages/admin/Signup';
import Dashboard from './pages/admin/Dashboard';
import CreateProperty from './pages/admin/properties/CreateProperty';
import UpdateProperty from './pages/admin/properties/UpdateProperty';
import DeleteProperty from './pages/admin/properties/DeleteProperty';
import CreateConstruction from './pages/admin/construction/CreateConstruction';
import UpdateConstruction from './pages/admin/construction/UpdateConstruction';
import DeleteConstruction from './pages/admin/construction/DeleteConstruction';
import CreateHouse from './pages/admin/houses/CreateHouse';
import UpdateHouse from './pages/admin/houses/UpdateHouse';
import DeleteHouse from './pages/admin/houses/DeleteHouse';

// Public Layout wrapper
const PublicLayout = ({ children }) => (
  <div className="flex flex-col min-h-screen">
    <PublicNavbar />
    <main className="flex-1">{children}</main>
    <Footer />
  </div>
);

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
            <Route path="/properties" element={<PublicLayout><Properties /></PublicLayout>} />
            <Route path="/properties/:id" element={<PublicLayout><PropertyDetail /></PublicLayout>} />
            <Route path="/construction" element={<PublicLayout><Construction /></PublicLayout>} />
            <Route path="/construction/:id" element={<PublicLayout><ConstructionDetail /></PublicLayout>} />
            <Route path="/houses" element={<PublicLayout><Houses /></PublicLayout>} />
            <Route path="/houses/:id" element={<PublicLayout><HouseDetail /></PublicLayout>} />

            {/* Admin Auth Routes (no protection) */}
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin/signup" element={<Signup />} />

            {/* Admin Protected Routes */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            {/* Admin Properties Routes */}
            <Route
              path="/admin/properties/create"
              element={
                <ProtectedRoute>
                  <CreateProperty />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/properties/update"
              element={
                <ProtectedRoute>
                  <UpdateProperty />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/properties/delete"
              element={
                <ProtectedRoute>
                  <DeleteProperty />
                </ProtectedRoute>
              }
            />

            {/* Admin Construction Routes */}
            <Route
              path="/admin/construction/create"
              element={
                <ProtectedRoute>
                  <CreateConstruction />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/construction/update"
              element={
                <ProtectedRoute>
                  <UpdateConstruction />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/construction/delete"
              element={
                <ProtectedRoute>
                  <DeleteConstruction />
                </ProtectedRoute>
              }
            />

            {/* Admin Houses Routes */}
            <Route
              path="/admin/houses/create"
              element={
                <ProtectedRoute>
                  <CreateHouse />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/houses/update"
              element={
                <ProtectedRoute>
                  <UpdateHouse />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/houses/delete"
              element={
                <ProtectedRoute>
                  <DeleteHouse />
                </ProtectedRoute>
              }
            />

            {/* Redirect /admin to /admin/login */}
            <Route path="/admin" element={<Navigate to="/admin/login" replace />} />

            {/* Catch all - redirect to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
