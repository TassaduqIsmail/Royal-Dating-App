import { combineReducers } from '@reduxjs/toolkit';
import { authSlice } from '../reducer/authSlice'; // Adjust the import path as needed

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  // Add other reducers if you have them
});

export default rootReducer;
