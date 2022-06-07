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
      state.messages.push(action.payload.messages);
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
