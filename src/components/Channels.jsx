/* eslint jsx-a11y/control-has-associated-label: [0] */
/* eslint max-len: [0] */

import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { Dropdown } from 'react-bootstrap';
import { setActiveChannelId, setActiveChannelName } from '../slices/channelsSlice.js';
import { setModalRenameChannelStatus } from '../slices/modalsSlice.js';
import { SocketContext } from '../context/SocketContextProvider.jsx';

const Channels = () => {
  const chatChannels = useSelector((state) => state.channels.channels);
  const activeChannelName = useSelector((state) => state.channels.activeChannelName);
  const dispatch = useDispatch();
  const socket = useContext(SocketContext);

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
        <Dropdown>
          <Dropdown.Toggle variant="Secondary" id="dropdown-basic" />

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => {
              socket.emit('removeChannel', { id: channel.id });
            }}
            >
              Удалить
            </Dropdown.Item>
            <Dropdown.Item onClick={(e) => {
              const targetChannelName = e.target.parentNode.parentNode.parentNode.firstChild.textContent.slice(1);
              const targetChannelId = chatChannels.filter((el) => el.name === targetChannelName)[0].id;
              openRenameNodal(targetChannelName, targetChannelId);
            }}
            >
              Переименовать
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
