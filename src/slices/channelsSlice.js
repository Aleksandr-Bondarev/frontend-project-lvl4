/* eslint-disable no-param-reassign */
/* eslint max-len: [0] */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channels: [],
  activeChannelId: null,
  activeChannelName: '',
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setAlreadyExistingChannels: (state, action) => {
      state.channels = action.payload;
      console.log(state.channels);
    },
    setActiveChannelId: (state, action) => {
      const id = action.payload;
      state.activeChannelId = id;
    },
    setActiveChannelName: (state, action) => {
      const name = action.payload;
      state.activeChannelName = name;
    },
  },
});

export const { setAlreadyExistingChannels, setActiveChannelId, setActiveChannelName } = channelsSlice.actions;

export default channelsSlice.reducer;
