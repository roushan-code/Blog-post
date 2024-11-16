import { useEffect, useState } from 'react';
import './App.css';
import { useDispatch } from 'react-redux';
import { login, logout } from './store/authSlice';
import authService from './appwrite/auth';
import { Footer, Header } from './components';
import { Outlet } from 'react-router-dom';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getUser()
      .then(userData => {
        // console.log(userData);
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [loading, dispatch]);

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
          <Outlet />
          TODO
        </main>
        <Footer />
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
}

export default App;