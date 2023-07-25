/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

async function getRandomGreeting() {
  try {
    const response = await axios.get('http://localhost:3000/api/random_greeting');
    return response.data.text;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
}

export const fetchRandomGreeting = createAsyncThunk(
  'greeting/fetchRandomGreeting',
  async () => {
    const randomGreeting = await getRandomGreeting();
    return randomGreeting;
  },
);

const greetingSlice = createSlice({
  name: 'greeting',
  initialState: {
    randomGreeting: '',
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRandomGreeting.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRandomGreeting.fulfilled, (state, action) => {
        state.randomGreeting = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchRandomGreeting.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = 'failed';
      });
  },
});

export const { reducer } = greetingSlice;
export default greetingSlice.reducer;
