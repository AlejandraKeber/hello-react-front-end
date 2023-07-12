import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

async function getRandomGreeting() {
  try {
    const response = await axios.get('http://127.0.0.1:3000/api/random_greeting');
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
}

export const fetchRandomGreeting = createAsyncThunk(
  'greeting/fetchRandomGreeting',
  async () => {
    const response = await getRandomGreeting();
    return response.data.text;
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
      .addCase(fetchRandomGreeting.pending, (state) => ({ ...state, status: 'loading' }))
      .addCase(fetchRandomGreeting.fulfilled, (state, action) => ({ ...state, status: 'succeeded', randomGreeting: action.payload }))
      .addCase(fetchRandomGreeting.rejected, (state, action) => ({ ...state, status: 'failed', error: action.error.message }));
  },
});

export const { actions } = greetingSlice;
export const { reducer } = greetingSlice;

export default {
  actions,
  reducer,
  fetchRandomGreeting,
};
