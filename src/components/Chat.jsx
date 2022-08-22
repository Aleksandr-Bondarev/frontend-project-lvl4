import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useRollbar } from '@rollbar/react';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/AuthContext.jsx';
import { switchChannel } from '../slices/channelsSlice.js';
import { setAlreadyExistingChannels } from '../slices/channelsSlice.js';
import { setModalStatusAndType } from '../slices/modalsSlice.js';
import Channels from './Channels.jsx';
import Messages from './Messages.jsx';
import MessageSendingForm from './MessageSendingForm.jsx';
import ModalsManager from './modals/ModalsManager.jsx';

const getPlural = (num) => {
  if (num < 15) return num;
  if (String(num).slice(-2) < 15) return String(num).slice(-2);
  return String(num).slice(-1);
};

function Chat() {
  const { getToken, logOut } = useContext(AuthContext);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const rollbar = useRollbar();
  const currentChannelName = useSelector((state) => state.channels.activeChannelName);
  const channelId = useSelector((state) => state.channels.activeChannelId);
  const typeOfOpenedModal = useSelector((state) => state.modals.type);
  const channelIdForModal = useSelector((state) => state.modals.channelId);

  const allChatMessages = useSelector((state) => state.messages.messages);
  const messagesInCurrentChannel = allChatMessages
    .filter((message) => message.channelId === channelId);
  const countOfCurrentMessages = messagesInCurrentChannel.length;
  const i18nPlurals = getPlural(countOfCurrentMessages);

  const initChat = async () => {
    try {
      const response = await axios({
        method: 'get',
        url: '/api/v1/data',
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      const { channels, messages, currentChannelId } = response.data;
      dispatch(switchChannel({ name: channels[currentChannelId - 1].name, id: currentChannelId}));
      dispatch(setAlreadyExistingChannels({ channels, messages }));
    } catch (e) {
      if (e.response.status === 401) {
        logOut();
        return;
      }
      toast.error(t('errors.connectionFailed'));
      rollbar.error(e);
    }
  };

  useEffect(() => {
    initChat();
  }, []);

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <ModalsManager modalType={ typeOfOpenedModal } channelId={ channelIdForModal } />
      <div className="row h-100 bg-white flex-md-row">
        <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
          <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
            <span>{t('labels.channels')}</span>
            <button
              type="button"
              className="p-0 text-primary btn btn-group-vertical"
              onClick={() => {
                dispatch(setModalStatusAndType({ isOpen: true, type: 'add' }));
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
              </svg>
              <span className="visually-hidden">+</span>
            </button>
          </div>
          <ul className="nav flex-column nav-pills nav-fill px-2">
            <Channels />
          </ul>
        </div>
        <div className="col p-0 h-100">
          <div className="d-flex flex-column h-100">
            <div className="bg-light mb-4 p-3 shadow-sm small">
              <p className="m-0">
                <b>
                  #
                  {currentChannelName}
                </b>
              </p>
              <span className="text-muted">
                {countOfCurrentMessages}
                {' '}
                {t(`messagesCount.${i18nPlurals}`)}
              </span>
            </div>
            <div id="messages-box" className="chat-messages overflow-auto px-5 ">
              <Messages />
            </div>
            <div className="mt-auto px-5 py-3">
              <MessageSendingForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
