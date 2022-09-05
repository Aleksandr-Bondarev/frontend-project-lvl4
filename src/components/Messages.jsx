/* eslint max-len: [0] */

import React from 'react';
import { useSelector } from 'react-redux';
import { getAllMessages, getActiveChannelId } from '../selectors.js';

function Messages() {
  const allChatMessages = useSelector(getAllMessages);
  const currentChannelId = useSelector(getActiveChannelId);
  const currentChannelMessages = allChatMessages.filter((message) => message.channelId === currentChannelId);

  const messagesToRender = currentChannelMessages.map((message) => (
    <div className="text-break mb-2" key={message.id}>
      <b>{message.username}</b>
      :
      {' '}
      {message.text}
    </div>
  ));

  return (
    messagesToRender
  );
}

export default Messages;
