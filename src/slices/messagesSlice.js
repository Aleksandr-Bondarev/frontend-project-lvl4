/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: [],
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    sendNewMessage: (state, action) => {
      // console.log('from slice', action);
      // console.log('from slice', action.payload);
      state.messages.push(action.payload.message);
    },
    importExistingMessages: (state, action) => {
      state.messages = action.payload;
    },
  },
});

export const {
  sendNewMessage,
  importExistingMessages,
} = messagesSlice.actions;

export default messagesSlice.reducer;
