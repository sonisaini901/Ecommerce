import { Routes, Route, useLocation } from 'react-router-dom'
import Layout from './Layout/Layout';
import Home from './Pages/Home/Home';
import PageNotFound from './Pages/PageNotFound/PageNotFound';
import Register from './Layout/Register/Register';
import { useDispatch } from 'react-redux';
import { loadUser } from './Store/Actions/UserActions';
import { useEffect } from 'react';
import Login from './Layout/Login/Login';
import ForgotPassword from './Layout/Password/ForgotPassword';
import ResetPassword from './Layout/Password/ResetPassword';
import ProtectedRoute from './ProtectedRoute';
import Dashboard from './Pages/Dashboard/Dashboard';
import AccountSettings from './Pages/Dashboard/AccountSettings/AccountSettings';

function App() {

  const dispatch = useDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  // always scroll to top on route/path change
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  }, [pathname])

  return (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/password/forgot" element={<ForgotPassword />} />
          <Route path="/password/reset/:token" element={<ResetPassword />} />

          {/* Dashboard */}
          <Route path="/account" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />

          <Route path="/account/settings" element={
            <ProtectedRoute>
              <AccountSettings />
            </ProtectedRoute>
          } />

          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
  );
}

export default App;
