import { Routes, Route, useLocation } from 'react-router-dom'
import Layout from './Layout/Layout';
import Home from './Pages/Home/Home';
import PageNotFound from './Pages/PageNotFound/PageNotFound';
import Register from './Layout/Register/Register';
import { useDispatch, useSelector } from 'react-redux';
import { loadPaymentKey, loadUser } from './Store/Actions/UserActions';
import { useEffect } from 'react';
import Login from './Layout/Login/Login';
import ForgotPassword from './Layout/Password/ForgotPassword';
import ResetPassword from './Layout/Password/ResetPassword';
import ProtectedRoute from './ProtectedRoute';
import Dashboard from './Pages/Dashboard/Dashboard';
import AccountSettings from './Pages/Dashboard/AccountSettings/AccountSettings';
import ManageAddress from './Pages/Dashboard/ManageAddress/ManageAddress';
import Wishlists from './Pages/Dashboard/Wishlists/Wishlists';
import MyOrders from './Pages/Dashboard/MyOrders/MyOrders';
import Cart from './Pages/Cart/Cart';
import Checkout from './Pages/Checkout/Checkout';
import Payment from './Pages/Checkout/Payment';
import CheckoutSuccess from './Pages/Checkout/CheckoutSuccess';
import {loadStripe} from '@stripe/stripe-js';
import {
  Elements
} from '@stripe/react-stripe-js';

function App() {

  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const { paymentKey , loading } = useSelector((state) => state.paymentKey);

  useEffect(() => {
    dispatch(loadUser());
    dispatch(loadPaymentKey());
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
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/checkout/payment" element={
            <ProtectedRoute>
              {loading ? null :  paymentKey && (
                <Elements stripe={loadStripe(paymentKey)}>
                  <Payment />
                </Elements>
              )}
            </ProtectedRoute>
          } />

          <Route path="/checkout/summary/:id" element={
            <ProtectedRoute>
              <CheckoutSuccess />
            </ProtectedRoute>
          } />

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

          <Route path="/account/addresses" element={
            <ProtectedRoute>
              <ManageAddress />
            </ProtectedRoute>
          } />

          <Route path="/account/wishlist" element={
            <ProtectedRoute>
              <Wishlists />
            </ProtectedRoute>
          } />

          <Route path="/account/orders" element={
            <ProtectedRoute>
              <MyOrders />
            </ProtectedRoute>
          } />

          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
  );
}

export default App;
