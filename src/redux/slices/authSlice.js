import { createSlice } from '@reduxjs/toolkit';

const loadUserFromLocalStorage = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: loadUserFromLocalStorage(), isLoggedIn: !!loadUserFromLocalStorage() },
  reducers: {
    signup: (state, action) => {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const existingUser = users.find(user => user.email === action.payload.email);
      if (!existingUser) {
        users.push(action.payload);
        localStorage.setItem('users', JSON.stringify(users));
        state.user = action.payload;
        state.isLoggedIn = true;
        localStorage.setItem('user', JSON.stringify(action.payload));
      }
    },
    login: (state, action) => {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const user = users.find(user => user.email === action.payload.email && user.password === action.payload.password);
      if (user) {
        state.user = user;
        state.isLoggedIn = true;
        localStorage.setItem('user', JSON.stringify(user));
      }
    },
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      localStorage.removeItem('user');
    },
  },
});

export const { signup, login, logout } = authSlice.actions;
export default authSlice.reducer;