export const getChannels = (state) => state.channels.channels;
export const getActiveChannelId = (state) => state.channels.activeChannelId;
export const getModalType = (state) => state.modals.type;
export const getModalStatus = (state) => state.modals.isOpen;
export const getChannelIdForModal = (state) => state.modals.channelId;
export const getAllMessages = (state) => state.messages.messages;
