import { configureStore } from '@reduxjs/toolkit';
// import useReducer from './features/userSlice';
import tokenReducer from './features/tokenSlice';

export const store = configureStore({
  reducer: {
    token: tokenReducer,
  },
});
