import { createSlice } from '@reduxjs/toolkit';
import { actions as channelsActions } from './channelsSlice.js'; 

const initialState = {
  messages: [],
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (state, { payload }) => {
      state.messages.push(payload); 
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(channelsActions.fetchData.fulfilled, (state, { payload }) => {
        state.messages = payload; 
      });
  },
});

export const { actions } = messagesSlice;
export const { addMessage } = messagesSlice;
export default messagesSlice.reducer;