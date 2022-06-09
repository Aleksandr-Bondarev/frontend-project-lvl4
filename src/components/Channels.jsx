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

  const channelsList = chatChannels.map((channel) => (
    <li className="nav-item w-100" key={channel.id}>
      <button
        type="button"
        id={channel.id}
        className={classNames('w-100', 'rounded-0', 'text-start', 'btn', { 'btn-secondary': channel.name === activeChannelName })}
        onClick={() => switchChannel(channel.name, channel.id)}
      >
        <span className="me-1">#</span>
        {channel.name}
      </button>
    </li>
  ));
  return channelsList;
};

export default Channels;
