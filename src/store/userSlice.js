import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    searchQuery: '',
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    addUser: (state, action) => {
      state.users.push({ id: Date.now(), ...action.payload });
    },
    updateUser: (state, action) => {
      const { id, ...updatedData } = action.payload;
      const index = state.users.findIndex(user => user.id === id);
      if (index !== -1) {
        state.users[index] = { ...state.users[index], ...updatedData };
      }
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter(user => user.id !== action.payload);
    },
    clearUsers: (state) => {
      state.users = [];
    },
  },
});

export const { setSearchQuery, addUser, updateUser, deleteUser, clearUsers } = userSlice.actions;
export default userSlice.reducer;
