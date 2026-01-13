import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, adminOnly = false, userOnly = false }) => {
  const token = localStorage.getItem('token');
  const userJson = localStorage.getItem('user');
  const user = userJson ? JSON.parse(userJson) : null;
  const location = useLocation();

  if (!token && (adminOnly || (!adminOnly && !userOnly))) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (adminOnly) {
    if (user?.role !== 'admin' && user?.role !== 'superAdmin') {
      return <Navigate to="/" replace />;
    }
  }

  if (userOnly) {
    if (user?.role === 'admin' || user?.role === 'superAdmin') {
      return <Navigate to="/admin" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
