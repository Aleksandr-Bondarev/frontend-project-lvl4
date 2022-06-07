import React from 'react';
import { useSelector } from 'react-redux';

function Messages() {
  const chatMessages = useSelector((state) => state.messages);
  console.log(chatMessages);
  useSelector((state) => console.log(state));

  return (
    <div className="text-break mb-2">
      <b>username</b>
      : Chat message
    </div>
  );
}

export default Messages;
