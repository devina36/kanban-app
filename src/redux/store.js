import { configureStore } from '@reduxjs/toolkit';
// import useReducer from './features/userSlice';
import tokenReducer from './features/tokenSlice';
import itemReducer from './features/itemSlice';

export const store = configureStore({
  reducer: {
    token: tokenReducer,
    item: itemReducer,
  },
});
