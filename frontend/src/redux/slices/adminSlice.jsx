import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // sẽ chứa { id, name, email, isAdmin, token } sau khi login
  adminInfo: null,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    adminLogin: (state, action) => {
      const { token, user } = action.payload;
      state.adminInfo = { ...user, token };
    },
    adminLogout: (state) => {
      state.adminInfo = null;
    },
  },
});

export const { adminLogin, adminLogout } = adminSlice.actions;
export default adminSlice.reducer;
