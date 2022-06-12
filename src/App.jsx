import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import RoutesInit from './components/RoutesInit.jsx';
import { AuthContextProvider } from './context/AuthContext.jsx';
import { SocketContextProvider } from './context/SocketContextProvider.jsx';
import { setModalRenameChannelStatus } from './slices/modalsSlice.js';
import { sendNewMessage, deleteChannelMessages } from './slices/messagesSlice.js';
import {
  addNewChannel, deleteChannel, setActiveChannelId, setActiveChannelName, changeChannelName,
} from './slices/channelsSlice.js';
import store from './slices/index.js';

const App = (socket) => {
  socket.on('newMessage', (message) => {
    store.dispatch(sendNewMessage({ message }));
  });

  socket.on('newChannel', (newChannel) => {
    store.dispatch(addNewChannel(newChannel));
  });

  socket.on('removeChannel', (response) => {
    const channelIdToRemove = response.id;
    store.dispatch(deleteChannel(channelIdToRemove));
    store.dispatch(deleteChannelMessages(channelIdToRemove));
    store.dispatch(setActiveChannelId(1));
    store.dispatch(setActiveChannelName('general'));
  });

  socket.on('renameChannel', (response) => {
    console.log('SOCKEEEEEET RESPOOOOOOOONSE', response);
    const { name, id } = response;
    store.dispatch(changeChannelName({ name, id }));
    store.dispatch(setModalRenameChannelStatus({ isOpen: false, previousName: '', channelId: null }));
    const { activeChannelId } = store.getState().channels;
    if (activeChannelId === id) {
      store.dispatch(setActiveChannelName(name));
    }
  });

  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <SocketContextProvider socket={socket}>
          <AuthContextProvider>
            <div className="d-flex flex-column h-100">
              <Navbar />
              <RoutesInit />
            </div>
          </AuthContextProvider>
        </SocketContextProvider>
      </BrowserRouter>
    </Provider>,
    document.getElementById('chat'),
  );
};

export default App;
