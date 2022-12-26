import { createSlice } from '@reduxjs/toolkit';
import { itemsApi } from '../../api/axiosClient';

const initialState = {
  item: [],
};

export const itemSlice = createSlice({
  name: 'item',
  initialState,
  reducers: {
    addItem: (state, action) => {
      let content;
      content = {
        target_todo_id: action.payload.todo_id,
        name: action.payload.name,
        progress_percentage: action.payload.progress,
      };
      state.item.push('content');
      console.log(initialState.item);
    },
    editItem: (state, action) => {
      if (action.payload.id) {
        state.item[itemIndex].target_todo_id = parseInt(action.payload.todo_id);
        state.item[itemIndex].name = action.payload.name;
        state.item[itemIndex].progress_percentage = action.payload.progress;
      }
      state.item;
    },
  },
});

export const getItem = (state) => state.item.item;
export const { addItem, editItem, setDatas } = itemSlice.actions;

export default itemSlice.reducer;
