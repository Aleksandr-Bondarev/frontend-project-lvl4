/* eslint-disable no-param-reassign */
/* eslint max-len: [0] */

import { createAction, createSlice } from '@reduxjs/toolkit';

export const switchChannel = createAction('switchChannel');

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
  },
  extraReducers: (builder) => {
    builder
    .addCase(switchChannel, (state, action) => {
      const { name } = action.payload;
      const { id } = action.payload;
      state.activeChannelId = id;
      state.activeChannelName = name;
    })
  }
});

export const {
  setAlreadyExistingChannels,
  addNewChannel,
  deleteChannel,
  changeChannelName,
} = channelsSlice.actions;

export default channelsSlice.reducer;
