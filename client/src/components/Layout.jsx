import { Outlet, useNavigate } from 'react-router-dom';
import Header from './Header';
import { useEffect } from 'react';

import { useContext } from 'react';
import { authContext } from '../context/authContext';

export default function Layout() {
  const { token } = useContext(authContext);

  const navigate = useNavigate();
  useEffect(() => {
    if (!token) navigate('/login');
  }, [navigate, token]);

  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}
