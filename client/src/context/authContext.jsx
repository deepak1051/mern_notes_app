import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const authContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem('note_token')) || null
  );

  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    // if (!token) return navigate('/login');
    const fetchData = async () => {
      try {
        const { data } = await axios.get('/api/users/verify', {
          headers: { Authorization: `Bearer ${token}` },
        });

        // setToken(data);
        setUser(data);
      } catch (error) {
        // setToken(null);
        // localStorage.removeItem('note_token');
        // navigate('/login');
        setUser(null);
      }
    };

    fetchData();
  }, [navigate, token]);

  console.log(user);

  return (
    <authContext.Provider value={{ token, setToken, user }}>
      {children}
    </authContext.Provider>
  );
};
