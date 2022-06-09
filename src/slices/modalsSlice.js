/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modalIsOpen: false,
  addChannel: false,
};

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    setModalOpenStatus: (state, action) => {
      state.modalIsOpen = action.payload;
    },
    setModalAddChannelStatus: (state, action) => {
      state.addChannel = action.payload;
    },
  },
});

export const { setModalAddChannelStatus, setModalOpenStatus } = modalsSlice.actions;

export default modalsSlice.reducer;
