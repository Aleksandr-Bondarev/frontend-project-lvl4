/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import { deleteChannelMessages } from './messagesSlice.js';

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
    },
    setModalRenameChannelStatus: (state, action) => {
      state.isOpen = action.payload.isOpen;
      state.type = action.payload.type;
      state.channelId = action.payload.channelId;
    },
    setModalDeleteChannelStatus: (state, action) => {
      state.isOpen = action.payload.isOpen;
      state.type = action.payload.type;
      state.channelId = action.payload.channelId;
    },
  },
});

export const {
  setModalStatusAndType,
  setModalRenameChannelStatus,
  setModalDeleteChannelStatus,
} = modalsSlice.actions;

export default modalsSlice.reducer;
