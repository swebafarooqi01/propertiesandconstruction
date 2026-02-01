import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('adminUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const signup = (email, password, name) => {
    const existingUser = localStorage.getItem('adminCredentials');
    if (existingUser) {
      throw new Error('Admin account already exists');
    }
    const credentials = { email, password, name };
    localStorage.setItem('adminCredentials', JSON.stringify(credentials));
    const userData = { email, name };
    localStorage.setItem('adminUser', JSON.stringify(userData));
    setUser(userData);
  };

  const login = (email, password) => {
    const storedCredentials = localStorage.getItem('adminCredentials');
    if (!storedCredentials) {
      throw new Error('No admin account found. Please sign up first.');
    }
    const credentials = JSON.parse(storedCredentials);
    if (credentials.email !== email || credentials.password !== password) {
      throw new Error('Invalid email or password');
    }
    const userData = { email, name: credentials.name };
    localStorage.setItem('adminUser', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('adminUser');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
