import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: null, // { id, name, email, isAdmin, token }
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLogin: (state, action) => {
      const { token, user } = action.payload;
      state.userInfo = { ...user, token }; // Gộp token vào userInfo
    },
    userLogout: (state) => {
      state.userInfo = null;
    },
  },
});

export const { userLogin, userLogout } = userSlice.actions;
export default userSlice.reducer;
