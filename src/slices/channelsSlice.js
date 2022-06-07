/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channels: [],
  activeChannelId: null,
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
  },
});

export const { setAlreadyExistingChannels, setActiveChannelId } = channelsSlice.actions;

export default channelsSlice.reducer;
