import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import RoutesInit from './components/RoutesInit.jsx';
import { AuthContextProvider } from './context/AuthContext.jsx';
import { SocketContextProvider } from './context/SocketContextProvider.jsx';
import { sendNewMessage } from './slices/messagesSlice.js';
import store from './slices/index.js';

const app = (socket) => {
  socket.on('newMessage', (message) => {
    store.dispatch(sendNewMessage({ message }));
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
    document.getElementById('chat')
  );
};

export default app;
