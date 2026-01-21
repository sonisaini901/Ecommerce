import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { forgotPasswordReducer, userReducer } from './Reducers/UserReducer';

const reducer = combineReducers({
  user: userReducer,
  forgotPassword: forgotPasswordReducer,
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
