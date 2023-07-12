import { configureStore } from '@reduxjs/toolkit';
import { reducer as greetingReducer } from './redux/greetingSlice';

const store = configureStore({
  reducer: {
    greeting: greetingReducer,
  },
});

export default store;
