import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { authContext } from '../context/authContext';

export default function Header() {
  const { user, setToken } = useContext(authContext);

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('note_token');
  };
  return (
    <div className="bg-gray-900 flex justify-between px-8 p-4 text-white font-bold items-center">
      <h2 className="italic">
        <Link to="/">NOTES</Link>
      </h2>

      <div>
        {user && user?.username ? (
          <div className="flex gap-3 items-center">
            <span>{user.username}</span>
            <Link to="/new" className="p-2 bg-teal-500 rounded">
              New Note
            </Link>
            <button onClick={handleLogout} className="p-2 bg-red-500 rounded">
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </div>
  );
}
