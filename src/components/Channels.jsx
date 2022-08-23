/* eslint max-len: [0] */

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { switchChannel } from '../slices/channelsSlice.js';
import { setModalStatusAndType } from '../slices/modalsSlice.js';

const Channels = () => {
  const { t } = useTranslation();

  const chatChannels = useSelector((state) => state.channels.channels);
  const activeChannelId = useSelector((state) => state.channels.activeChannelId);
  console.log('active channel id', activeChannelId);
  const dispatch = useDispatch();

  const openRenameModal = (targetChannelId) => {
    dispatch(setModalStatusAndType({
      isOpen: true,
      type: 'rename',
      channelId: targetChannelId,
    }));
  };

  const openDeleteModal = (targetChannelId) => {
    dispatch(setModalStatusAndType({
      isOpen: true,
      type: 'delete',
      channelId: targetChannelId,
    }));
  };

  const channelsList = chatChannels.map((channel) => (
    <li className="nav-item w-100" key={channel.id}>
      <div role="group" className="d-flex dropdown btn-group">
        <button
          type="button"
          id={channel.id}
          className={classNames('w-100', 'rounded-0', 'text-start', 'btn', { 'btn-secondary': channel.id === activeChannelId, 'text-truncate': channel.name !== 'general' && channel.name !== 'random' })}
          onClick={() => dispatch(switchChannel({ name: channel.name, id: channel.id }))}
        >
          <span className="me-1">#</span>
          {' '}
          {channel.name}
        </button>
        { channel.name !== 'general' && channel.name !== 'random'
      && (
        <Dropdown>
          <Dropdown.Toggle variant="Secondary" id="dropdown-basic" className={classNames('rounded-0', { 'btn-secondary': channel.id === activeChannelId })}>
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
              openRenameModal(channel.id);
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
