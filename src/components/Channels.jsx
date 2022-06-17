/* eslint max-len: [0] */

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { setActiveChannelId, setActiveChannelName } from '../slices/channelsSlice.js';
import { setModalRenameChannelStatus, setModalDeleteChannelStatus } from '../slices/modalsSlice.js';

const Channels = () => {
  const { t } = useTranslation();

  const chatChannels = useSelector((state) => state.channels.channels);
  const activeChannelName = useSelector((state) => state.channels.activeChannelName);
  const dispatch = useDispatch();

  const switchChannel = (channelName, channelId) => {
    dispatch(setActiveChannelId(channelId));
    dispatch(setActiveChannelName(channelName));
  };

  const openRenameNodal = (targetChannelName, targetChannelId) => {
    dispatch(setModalRenameChannelStatus({
      isOpen: true,
      previousName: targetChannelName,
      channelId: targetChannelId,
    }));
  };

  const openDeleteModal = (targetChannelId) => {
    dispatch(setModalDeleteChannelStatus({
      isOpen: true,
      channelId: targetChannelId,
    }));
  };

  const channelsList = chatChannels.map((channel) => (
    <li className="nav-item w-100" key={channel.id}>
      <div role="group" className="d-flex dropdown btn-group">
        <button
          type="button"
          id={channel.id}
          className={classNames('w-100', 'rounded-0', 'text-start', 'btn', { 'btn-secondary': channel.name === activeChannelName, 'text-truncate': channel.name !== 'general' && channel.name !== 'random' })}
          onClick={() => switchChannel(channel.name, channel.id)}
        >
          <span className="me-1">#</span>
          {' '}
          {channel.name}
        </button>
        { channel.name !== 'general' && channel.name !== 'random'
      && (
        <Dropdown>
          <Dropdown.Toggle variant="Secondary" id="dropdown-basic">
            <span className="visually-hidden">{t('labels.channelControl')}</span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => {
              openDeleteModal(channel.id);
            }}
            >
              {t('labels.toDelete')}
            </Dropdown.Item>
            <Dropdown.Item onClick={() => {
              openRenameNodal(channel.name, channel.id);
            }}
            >
              {t('labels.toRename')}
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      )}
      </div>
    </li>
  ));
  return channelsList;
};

export default Channels;
