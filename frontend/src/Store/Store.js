import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { forgotPasswordReducer, PaymentKeysReducer, profileReducer, userReducer } from './Reducers/UserReducer';
import { addressDetailsReducer, addressReducer, addShippingReducer, shippingReducer } from './Reducers/AddressReducer';
import { productDetailsReducer, productsReducer } from './Reducers/ProductReducer';
import { cartReducer } from './Reducers/CartReducer';
import { newOrderReducer, paymentAddReducer, orderDetailsReducer, myOrdersReducer } from './Reducers/OrderReducer';
import { addWishlistsReducer, removeWishlistReducer, wishlistsReducer } from './Reducers/WishlistReducer';

const reducer = combineReducers({
  user: userReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  shipping: shippingReducer,
  newShipping: addShippingReducer,
  address: addressReducer,
  addressDetail: addressDetailsReducer,
  products: productsReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
  paymentKey: PaymentKeysReducer,
  payment: paymentAddReducer,
  orderDetails: orderDetailsReducer,
  myOrders: myOrdersReducer,
  newWIshlist: addWishlistsReducer,
  wishlists: wishlistsReducer,
  wishlistItem: removeWishlistReducer,
  productDetails: productDetailsReducer,
});

// Initial state
const preloadedState = {
  cart: {
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
    totalAmount: localStorage.getItem("totalAmount")
      ? JSON.parse(localStorage.getItem('totalAmount'))
      : null,
  },
};

// Create the store
const Store = configureStore({
  reducer: reducer,
  preloadedState,
  devTools: true,
});

export default Store;
