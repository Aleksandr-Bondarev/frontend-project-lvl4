/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import { changeChannelName } from './channelsSlice.js';

const initialState = {
  isOpen: false,
  type: null,
  channelId: null,
};

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    setModalStatusAndType: (state, action) => {
      state.isOpen = action.payload.isOpen;
      state.type = action.payload.type;
      if (action.payload.channelId) {
        state.channelId = action.payload.channelId;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(changeChannelName, (state) => {
        state.isOpen = false;
        state.type = null;
        state.channelId = null;
      });
  },
});

export const {
  setModalStatusAndType,
} = modalsSlice.actions;

export default modalsSlice.reducer;
