import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { forgotPasswordReducer, profileReducer, userReducer } from './Reducers/UserReducer';
import { addressDetailsReducer, addressReducer, addShippingReducer, shippingReducer } from './Reducers/AddressReducer';

const reducer = combineReducers({
  user: userReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  shipping: shippingReducer,
  newShipping: addShippingReducer,
  address: addressReducer,
  addressDetail: addressDetailsReducer,
});

// Initial state
const initialState = {};

// Create the store
const Store = configureStore({
  reducer: reducer,
  initialState,
  devTools: true,
});

export default Store;
