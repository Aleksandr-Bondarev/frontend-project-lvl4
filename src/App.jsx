import React from 'react';
import ReactDOM from 'react-dom';
import i18n from 'i18next';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import { Provider as ReduxProvider } from 'react-redux';
import { Provider as RollbarProvider } from '@rollbar/react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import resources from './resources/index.js';
import Navbar from './components/Navbar.jsx';
import RoutesInit from './components/RoutesInit.jsx';
import { AuthContextProvider } from './context/AuthContext.jsx';
import { SocketContextProvider } from './context/SocketContextProvider.jsx';
import { AcknowledgeContextProvider } from './context/AcknowledgeContext.jsx';
import { sendNewMessage } from './slices/messagesSlice.js';
import {
  addNewChannel, deleteChannel, changeChannelName,
} from './slices/channelsSlice.js';
import 'react-toastify/dist/ReactToastify.css';
import store from './slices/index.js';

const App = (socket) => {
  i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: 'ru',
      debug: true,
      react: {
        useSuspense: false,
      },
    });
  const rollbarConfig = {
    accessToken: process.env.ROLLBAR_ACCESS_TOKEN,
    captureUncaught: true,
    captureUnhandledRejections: true,
    payload: {
      environment: 'production',
    },
  };

  socket.on('newMessage', (message) => {
    store.dispatch(sendNewMessage({ message }));
  });

  socket.on('newChannel', (newChannel) => {
    store.dispatch(addNewChannel(newChannel));
  });

  socket.on('removeChannel', (response) => {
    const channelIdToRemove = response.id;
    store.dispatch(deleteChannel(channelIdToRemove));
  });

  socket.on('renameChannel', (response) => {
    const { name, id } = response;
    store.dispatch(changeChannelName({ name, id }));
  });

  ReactDOM.render(
    <RollbarProvider config={rollbarConfig}>
      <I18nextProvider i18n={i18n}>
        <ReduxProvider store={store}>
          <BrowserRouter>
            <SocketContextProvider socket={socket}>
              <AuthContextProvider>
                <AcknowledgeContextProvider>
                  <div className="d-flex flex-column h-100">
                    <ToastContainer />
                    <Navbar />
                    <RoutesInit />
                  </div>
                </AcknowledgeContextProvider>
              </AuthContextProvider>
            </SocketContextProvider>
          </BrowserRouter>
        </ReduxProvider>
      </I18nextProvider>
    </RollbarProvider>,
    document.getElementById('chat'),
  );
};

export default App;
