/* eslint functional/no-let: [0] */

import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { switchChannel } from '../slices/channelsSlice.js';
import { setModalStatusAndType } from '../slices/modalsSlice.js';

export const AcknowledgeContext = React.createContext();

export function AcknowledgeContextProvider({ children }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const acknowledgeMessageSending = (response) => {
    let status;

    setTimeout(() => {
      if (status !== 'ok') {
        toast.error(t('errors.connectionFailed'));
      }
    }, 2000);

    status = response.status;
  };

  const acknowledgeChannelCreating = (response) => {
    let status;
    setTimeout(() => {
      if (status !== 'ok') {
        toast.error(t('errors.connectionFailed'));
      }
    }, 2000);

    status = response.status;
    if (status === 'ok') {
      const { name, id } = response.data;
      dispatch(switchChannel({ name, id }));
    }
  };

  const acknowlodgeDeleteChannel = (response) => {
    let status;
    setTimeout(() => {
      if (status !== 'ok') {
        toast.error(t('errors.connectionFailed'));
      }
    }, 2000);

    status = response.status;

    if (status === 'ok') {
      dispatch(setModalStatusAndType({ isOpen: false, type: null }));
      toast.success(t('toasts.channelRemoved'));
    }
  };

  const acknowlodgeRenameChannel = (response) => {
    let status;
    setTimeout(() => {
      if (status !== 'ok') {
        toast.error(t('errors.connectionFailed'));
      }
    }, 2000);

    status = response.status;

    if (status === 'ok') {
      toast.success(t('toasts.channelRenamed'));
    }
  };

  const api = {
    acknowledgeMessageSending,
    acknowledgeChannelCreating,
    acknowlodgeDeleteChannel,
    acknowlodgeRenameChannel,
  };

  const memorizedApi = useMemo(() => api, []);
  return (
    <AcknowledgeContext.Provider value={memorizedApi}>
      {children}
    </AcknowledgeContext.Provider>
  );
}
