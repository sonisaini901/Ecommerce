import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';

const reducer = combineReducers({});

// Initial state
const initialState = {};

// Create the store
const Store = configureStore({
  reducer: reducer,
  initialState,
  devTools: true,
});

export default Store;
