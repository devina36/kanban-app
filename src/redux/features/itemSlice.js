import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  todos: [],
  item: [],
};

export const kanbanSlice = createSlice({
  name: 'kanban',
  initialState,
  reducers: {
    //
    setTodos: (state, action) => {
      state.todos = action.payload;
    },
    setItem: (state, action) => {
      state.item = action.payload;
    },
  },
});

export const { setTodos, setItem } = kanbanSlice.actions;

export default kanbanSlice.reducer;
