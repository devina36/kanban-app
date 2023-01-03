import { createSlice } from '@reduxjs/toolkit';

const datatoken = JSON.parse(localStorage.getItem('token')) || '';
const initialState = {
  token: datatoken,
};

export const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem('token', JSON.stringify(state.token));
    },
    deletToken: (state, action) => {
      state.token = '';
      localStorage.removeItem('token');
    },
  },
});

export const getToken = (state) => state.token.token;
export const { setToken, deletToken } = tokenSlice.actions;

export default tokenSlice.reducer;
