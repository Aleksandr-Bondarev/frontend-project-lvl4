import React from 'react';
import { useSelector } from 'react-redux';

const Channels = () => {
  const chatChannels = useSelector((state) => state.channels.channels);

  const channelsList = chatChannels.map((channel) => (
    <li className="nav-item w-100" key={channel.id}>
      <button type="button" className="w-100 rounded-0 text-start btn">
        <span className="me-1">#</span>
        {channel.name}
      </button>
    </li>
  ));
  return channelsList;
};

export default Channels;
