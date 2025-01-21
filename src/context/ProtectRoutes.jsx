import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const ProtectedRoute = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/auth/login');
    }
  }, [navigate, token]);

  return token ? <Outlet /> : null;
};

export default ProtectedRoute;
