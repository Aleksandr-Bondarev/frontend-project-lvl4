/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  addChannel: false,
  renameChannel: {
    isOpen: false,
    previousName: '',
    channelId: null,
  },
};

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    setModalAddChannelStatus: (state, action) => {
      state.addChannel = action.payload;
    },
    setModalRenameChannelStatus: (state, action) => {
      state.renameChannel.isOpen = action.payload.isOpen;
      state.renameChannel.previousName = action.payload.previousName;
      state.renameChannel.channelId = action.payload.channelId;
    },
  },
});

export const { setModalAddChannelStatus, setModalRenameChannelStatus } = modalsSlice.actions;

export default modalsSlice.reducer;
