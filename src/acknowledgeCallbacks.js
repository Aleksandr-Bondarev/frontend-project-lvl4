import store from './slices/index.js';
import { setActiveChannelId, setActiveChannelName } from './slices/channelsSlice.js';

export const acknowlodgeMessageSending = (response) => {
  if (!response) {
    console.log('Check your connection');
  }
};

export const acknowledgeChannelCreating = (response) => {
  if (!response) {
    console.log('Check your connection');
  }
  store.dispatch(setActiveChannelId(response.data.id));
  store.dispatch(setActiveChannelName(response.data.name));
};
