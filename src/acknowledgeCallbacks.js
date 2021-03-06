/* eslint functional/no-let: [0] */

import { toast } from 'react-toastify';
import i18n from 'i18next';
import store from './slices/index.js';
import { setActiveChannelId, setActiveChannelName } from './slices/channelsSlice.js';
import { setModalDeleteChannelStatus } from './slices/modalsSlice.js';

export const acknowlodgeMessageSending = (response) => {
  let status;

  setTimeout(() => {
    if (status !== 'ok') {
      toast.error(i18n.t('errors.connectionFailed'));
    }
  }, 2000);

  status = response.status;
};

export const acknowledgeChannelCreating = (response) => {
  let status;
  setTimeout(() => {
    if (status !== 'ok') {
      toast.error(i18n.t('errors.connectionFailed'));
    }
  }, 2000);

  status = response.status;
  if (status === 'ok') {
    store.dispatch(setActiveChannelId(response.data.id));
    store.dispatch(setActiveChannelName(response.data.name));
  }
};

export const acknowlodgeDeleteChannel = (response) => {
  let status;
  setTimeout(() => {
    if (status !== 'ok') {
      toast.error(i18n.t('errors.connectionFailed'));
    }
  }, 2000);

  status = response.status;

  if (status === 'ok') {
    store.dispatch(setModalDeleteChannelStatus(false));
    toast.success(i18n.t('toasts.channelRemoved'));
  }
};

export const acknowlodgeRenameChannel = (response) => {
  let status;
  setTimeout(() => {
    if (status !== 'ok') {
      toast.error(i18n.t('errors.connectionFailed'));
    }
  }, 2000);

  status = response.status;

  if (status === 'ok') {
    toast.success(i18n.t('toasts.channelRenamed'));
  }
};
