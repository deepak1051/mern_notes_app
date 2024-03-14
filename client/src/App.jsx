import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Notes from './components/Notes';
import Register from './components/Register';
import Login from './components/Login';
import New from './components/New';
import EditNote from './components/EditNote';
import AuthLayout from './components/AuthLayout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Notes />} />
        <Route path="new" element={<New />} />
        <Route path="edit/:noteId" element={<EditNote />} />
      </Route>
      <Route element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
    </Routes>
  );
}

export default App;
