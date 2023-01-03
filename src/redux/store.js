import { configureStore } from '@reduxjs/toolkit';
import kanbanReducer from './features/itemSlice';
import tokenReducer from './features/tokenSlice';

export const store = configureStore({
  reducer: {
    token: tokenReducer,
    kanban: kanbanReducer,
  },
});
