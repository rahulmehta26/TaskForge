import { createSlice } from '@reduxjs/toolkit';

const loadThemeFromLocalStorage = () => {
  const theme = localStorage.getItem('theme');
  return theme || 'light';
};

const themeSlice = createSlice({
  name: 'theme',
  initialState: loadThemeFromLocalStorage(),
  reducers: {
    toggleTheme: (state) => {
      const newTheme = state === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      return newTheme;
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;