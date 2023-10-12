import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import concertsReducer from './concertsRedux';
import seatsReducer from './seatsRedux';

const rootReducer = {
  concerts: concertsReducer,
  seats: seatsReducer,
};

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
  devTools: process.env.NODE_ENV !== 'production', 
});

export default store;
