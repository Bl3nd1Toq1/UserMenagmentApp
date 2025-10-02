import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './userSlice';

const rootReducer = combineReducers({
  users: userReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export const persistor = null;
