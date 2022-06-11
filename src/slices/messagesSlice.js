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
      state.messages.push(action.payload.message);
    },
    importExistingMessages: (state, action) => {
      state.messages = action.payload;
    },
    deleteChannelMessages: (state, action) => {
      const id = action.payload;
      state.messages = state.messages.filter((message) => message.channelId !== id);
    },
  },
});

export const {
  sendNewMessage,
  importExistingMessages,
  deleteChannelMessages,
} = messagesSlice.actions;

export default messagesSlice.reducer;
