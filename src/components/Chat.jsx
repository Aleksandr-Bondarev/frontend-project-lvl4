/* eslint no-unused-vars: [0] */

import React, { useContext } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { AuthContext } from '../context/AuthContext.jsx';
import { setAlreadyExistingChannels } from '../slices/channelsSlice.js';

function Chat() {
  const { getToken } = useContext(AuthContext);
  const dispatch = useDispatch();

  const initChat = async () => {
    try {
      const response = await axios({
        method: 'get',
        url: '/api/v1/data',
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      console.log(response);
      const { channels, messages, currentChannelId } = response.data;
      dispatch(setAlreadyExistingChannels(channels));
    } catch {
      console.log('error!');
    }
  };

  initChat();

  return (
    <div className="Toastify">Chat will be here soon</div>
  );
}

export default Chat;
