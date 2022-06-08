/* eslint max-len: [0] */

import React from 'react';
import { useSelector } from 'react-redux';

function Messages() {
  const allChatMessages = useSelector((state) => state.messages.messages);
  const currentChannelId = useSelector((state) => state.channels.activeChannelId);
  const currentChannelMessages = allChatMessages.filter((message) => message.channelId === currentChannelId);

  console.log('from Messages', allChatMessages, currentChannelId, currentChannelMessages);
  useSelector((state) => console.log(state));

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
