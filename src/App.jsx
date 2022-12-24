import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Home, Login, SignUp } from './pages';
import { getToken } from './redux/features/tokenSlice';

// const getToken = () => {
//   const get = localStorage.getItem('token');
//   const userToken = JSON.parse(get) || '';
//   return userToken;
// };

function App() {
  const navigate = useNavigate();

  const token = useSelector(getToken);

  useEffect(() => {
    token === '' ? navigate('/login') : navigate('/');
  }, [token]);

  return (
    <>
      <Routes>
        <Route path="/*" element={<Home token={token} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
