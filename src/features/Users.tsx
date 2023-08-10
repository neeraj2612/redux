import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UsersData } from '../FakeData';

export interface User {
  id: number;
  name: string;
  username: string;
}

export interface UserState {
  value: User[];
}

const initialState: UserState = {
  value: UsersData,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.value.push(action.payload);
    },

    deleteUser: (state, action: PayloadAction<{ id: number }>) => {
      state.value = state.value.filter((user) => user.id !== action.payload.id);
    },

    updateUser: (state, action: PayloadAction<{ id: number; username: string }>) => {
      state.value = state.value.map((user) =>
        user.id === action.payload.id ? { ...user, username: action.payload.username } : user
      );
    },
  },
});

export const { addUser, deleteUser, updateUser } = userSlice.actions;
export default userSlice.reducer;
