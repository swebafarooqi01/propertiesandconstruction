import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import ProtectedRoute from './components/ProtectedRoute';

// Auth Pages
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';

// Properties Pages
import CreateProperty from './pages/properties/CreateProperty';
import UpdateProperty from './pages/properties/UpdateProperty';
import DeleteProperty from './pages/properties/DeleteProperty';

// Construction Pages
import CreateConstruction from './pages/construction/CreateConstruction';
import UpdateConstruction from './pages/construction/UpdateConstruction';
import DeleteConstruction from './pages/construction/DeleteConstruction';

// Houses Pages
import CreateHouse from './pages/houses/CreateHouse';
import UpdateHouse from './pages/houses/UpdateHouse';
import DeleteHouse from './pages/houses/DeleteHouse';

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            {/* Properties Routes */}
            <Route
              path="/properties/create"
              element={
                <ProtectedRoute>
                  <CreateProperty />
                </ProtectedRoute>
              }
            />
            <Route
              path="/properties/update"
              element={
                <ProtectedRoute>
                  <UpdateProperty />
                </ProtectedRoute>
              }
            />
            <Route
              path="/properties/delete"
              element={
                <ProtectedRoute>
                  <DeleteProperty />
                </ProtectedRoute>
              }
            />

            {/* Construction Routes */}
            <Route
              path="/construction/create"
              element={
                <ProtectedRoute>
                  <CreateConstruction />
                </ProtectedRoute>
              }
            />
            <Route
              path="/construction/update"
              element={
                <ProtectedRoute>
                  <UpdateConstruction />
                </ProtectedRoute>
              }
            />
            <Route
              path="/construction/delete"
              element={
                <ProtectedRoute>
                  <DeleteConstruction />
                </ProtectedRoute>
              }
            />

            {/* Houses Routes */}
            <Route
              path="/houses/create"
              element={
                <ProtectedRoute>
                  <CreateHouse />
                </ProtectedRoute>
              }
            />
            <Route
              path="/houses/update"
              element={
                <ProtectedRoute>
                  <UpdateHouse />
                </ProtectedRoute>
              }
            />
            <Route
              path="/houses/delete"
              element={
                <ProtectedRoute>
                  <DeleteHouse />
                </ProtectedRoute>
              }
            />

            {/* Default Route */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </Router>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
