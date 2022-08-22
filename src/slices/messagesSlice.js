/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import { deleteChannel, setAlreadyExistingChannels } from './channelsSlice.js';

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
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteChannel, (state, action) => {
        const id = action.payload;
        state.messages = state.messages.filter((message) => message.channelId !== id);
    }).addCase(setAlreadyExistingChannels, (state, action) => {
        const { messages } = action.payload;
        state.messages = messages;
    })
  }
});

export const {
  sendNewMessage,
  deleteChannelMessages,
} = messagesSlice.actions;

export default messagesSlice.reducer;
