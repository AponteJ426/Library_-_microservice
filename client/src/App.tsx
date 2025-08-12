import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import LoginForm from './pages/login/login';
import RegisterForm from './pages/login/register';
import Home from './pages/home/home';
import LayoutPanel from './pages/dashboard/LayoutPanel';
import HomeDashboard from './pages/dashboard/views/HomeDashboard';
import Biblioteca from './pages/dashboard/views/biblioteca';
import Favoritos from './pages/dashboard/views/Favoritos';
import { useAuthVerification } from './hooks/useAuthVerification';
import AdminPanel from './pages/dashboard/views/viewsadmin/AdminPanel';
import UserManagement from './pages/dashboard/views/viewsadmin/UserManagement';
import ReportManagement from './pages/dashboard/views/viewsadmin/ReportManagement';
import Support from './pages/dashboard/views/support';
import Suggestion from './pages/dashboard/views/suggestions';

function App() {
  const data: { user: { user?: { role?: string; id?: string } } | null; loading: boolean } = useAuthVerification();
  const [authKey, setAuthKey] = useState(0);
  // Efecto para detectar cambios en la sesión y forzar re-render
  useEffect(() => {
    setAuthKey(prev => prev + 1);
  }, [data?.user?.user?.role, data?.user?.user?.id]);

  if (data.loading) {
    return (
      <Router>
        <Routes>
          <Route path="*" element={<div>Loading...</div>} />
        </Routes>
      </Router>
    )
  }

  return (
    <Router key={authKey}>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />

        {/* Rutas protegidas dentro del panel */}
        {data?.user?.user?.role === "USER" && (
          <Route
            path="/dashboard"
            element={<LayoutPanel />}
          >
            <Route path="home" element={<HomeDashboard />} />
            <Route path="biblioteca" element={<Biblioteca />} />
            <Route path="likedBooks" element={<Favoritos />} />
            <Route path="support" element={<Support />} />
          </Route>
        )}
        {data?.user?.user?.role === "ADMIN" && (
          <Route
            path="/dashboard"
            element={<LayoutPanel />}
          >
            <Route path="home" element={<HomeDashboard />} />
            <Route path="biblioteca" element={<Biblioteca />} />
            <Route path="likedBooks" element={<Favoritos />} />
            <Route path="suggestion" element={<Suggestion />} />
            {/* Rutas de administración */}
            <Route path="admin" element={<AdminPanel />} />
            <Route path="admin/users" element={<UserManagement />} />
            <Route path="admin/reports" element={<ReportManagement />} />
            <Route path="logout" element={<Navigate to="/" />} />

          </Route>
        )}

      </Routes>
    </Router>
  );
}

export default App;
