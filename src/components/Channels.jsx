/* eslint max-len: [0] */

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { switchChannel } from '../slices/channelsSlice.js';
import { setModalStatusAndType } from '../slices/modalsSlice.js';
import { getChannels, getActiveChannelId } from '../selectorCallbacks.js';

const Channels = () => {
  const { t } = useTranslation();

  const chatChannels = useSelector(getChannels);
  const activeChannelId = useSelector(getActiveChannelId);
  const dispatch = useDispatch();

  return (chatChannels.map((channel) => {
    const switchActiveChannel = () => dispatch(switchChannel({ id: channel.id }));
    const openDeleteModal = () => {
      dispatch(setModalStatusAndType({
        isOpen: true,
        type: 'delete',
        channelId: channel.id,
      }));
    };
    const openRenameModal = () => {
      dispatch(setModalStatusAndType({
        isOpen: true,
        type: 'rename',
        channelId: channel.id,
      }));
    };

    return (
      <li className="nav-item w-100" key={channel.id}>
        <div role="group" className="d-flex dropdown btn-group">
          <button
            type="button"
            id={channel.id}
            className={classNames('w-100', 'rounded-0', 'text-start', 'btn', { 'btn-secondary': channel.id === activeChannelId, 'text-truncate': channel.removable })}
            onClick={switchActiveChannel}
          >
            <span className="me-1">#</span>
            {' '}
            {channel.name}
          </button>
          { channel.removable
      && (
        <Dropdown>
          <Dropdown.Toggle variant="Secondary" id="dropdown-basic" className={classNames('rounded-0', { 'btn-secondary': channel.id === activeChannelId })}>
            <span className="visually-hidden">{t('labels.channelControl')}</span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={openDeleteModal}>
              {t('labels.toDelete')}
            </Dropdown.Item>
            <Dropdown.Item onClick={openRenameModal}>
              {t('labels.toRename')}
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      )}
        </div>
      </li>
    );
  }));
};

export default Channels;
