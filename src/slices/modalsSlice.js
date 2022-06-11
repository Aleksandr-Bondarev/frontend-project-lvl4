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
    setModalAddChannelStatus: (state, action) => {
      state.addChannel = action.payload;
    },
  },
});

export const { setModalAddChannelStatus } = modalsSlice.actions;

export default modalsSlice.reducer;
