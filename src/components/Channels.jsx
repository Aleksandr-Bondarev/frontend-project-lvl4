/* eslint jsx-a11y/control-has-associated-label: [0] */

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { setActiveChannelId, setActiveChannelName } from '../slices/channelsSlice.js';

const Channels = () => {
  const chatChannels = useSelector((state) => state.channels.channels);
  const activeChannelName = useSelector((state) => state.channels.activeChannelName);
  const dispatch = useDispatch();

  const switchChannel = (channelName, channelId) => {
    dispatch(setActiveChannelId(channelId));
    dispatch(setActiveChannelName(channelName));
  };

  const dropdownMenuStyle = {
    position: 'absolute',
    inset: '0px auto auto 0px',
    transform: 'translate(73px, 40px)',
  };

  const showDropdownMenu = (e) => {
    console.log('THIIIIIIIIIS', e);
    e.target.ariaExpanded = 'true';
    e.target.nextSibling.classList.add('show');
    e.target.parentElement.classList.add('show');
    console.log('pareeeeeeeeeeent', e.target.parentElement);
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
          {channel.name}
        </button>
        { channel.name !== 'general' && channel.name !== 'random'
      && (
      <button
        type="button"
        aria-expanded="false"
        className="flex-grow-0 dropdown-toggle dropdown-toggle-split btn"
        onClick={(e) => showDropdownMenu(e)}
      />
      )}
        { channel.name !== 'general' && channel.name !== 'random'
        && (
        <div x-placement="bottom-start" className="dropdown-menu" data-popper-reference-hidden="false" data-popper-escaped="false" data-popper-placement="bottom-start" style={dropdownMenuStyle}>
          <button data-rr-ui-dropdown-item="" className="dropdown-item" type="button" tabIndex="0">Удалить</button>
          <button data-rr-ui-dropdown-item="" className="dropdown-item" type="button" tabIndex="0">Переименовать</button>
        </div>
        )}
      </div>
    </li>
  ));
  return channelsList;
};

export default Channels;
