/* eslint no-unused-expressions: [0] */

import React, { useContext } from 'react';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { AuthContext } from '../context/AuthContext.jsx';
import { SocketContext } from '../context/SocketContextProvider.jsx';

function MessageSendingForm() {
  const currentChannelId = useSelector((state) => state.channels.activeChannelId);
  const socket = useContext(SocketContext);
  const { getUser } = useContext(AuthContext);
  const currentUserName = getUser();

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: (e) => {
      e.preventDefault;
      console.log('channel id', currentChannelId);
      console.log('SOCKET!!!', socket);
      console.log(e);
      console.log(e.message);
      console.log({ text: e.message, channelId: currentChannelId });
      socket.emit('newMessage', { text: e.message, channelId: currentChannelId, username: currentUserName });
      document.getElementById('message').value = '';
    },
  });

  return (
    <form noValidate="" className="py-1 border rounded-2" onSubmit={formik.handleSubmit}>
      <div className="input-group has-validation">
        <input
          aria-label="Новое сообщение"
          placeholder="Введите сообщение..."
          id="message"
          className="border-0 p-0 ps-2 form-control"
          onChange={formik.handleChange}
          value={formik.values.message}
        />
        <button type="submit" disabled="" className="btn btn-group-vertical">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
            <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
          </svg>
          <span className="visually-hidden">Отправить</span>
        </button>
      </div>
    </form>
  );
}

export default MessageSendingForm;
