/* eslint-disable no-param-reassign */
/* eslint max-len: [0] */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channels: [],
  activeChannelId: null,
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    initChannels: (state, action) => {
      const { channels } = action.payload;
      state.channels = channels;
    },
    addNewChannel: (state, action) => {
      state.channels.push(action.payload);
    },
    deleteChannel: (state, action) => {
      const id = action.payload;
      state.channels = state.channels.filter((channel) => channel.id !== id);
    },
    changeChannelName: (state, action) => {
      const { name, id } = action.payload;
      const channelToChange = state.channels.find((channel) => channel.id === id);
      channelToChange.name = name;
    },
    switchChannel: (state, action) => {
      const { id } = action.payload;
      state.activeChannelId = id;
    },
  },
});

export const {
  initChannels,
  addNewChannel,
  deleteChannel,
  changeChannelName,
  switchChannel,
} = channelsSlice.actions;

export default channelsSlice.reducer;
