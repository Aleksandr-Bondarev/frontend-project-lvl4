import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import RoutesInit from './components/RoutesInit.jsx';
import { AuthContextProvider } from './context/AuthContext.jsx';
import store from './slices/index.js';

const app = () => {
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <AuthContextProvider>
          <div className="d-flex flex-column h-100">
            <Navbar />
            <RoutesInit />
          </div>
        </AuthContextProvider>
      </BrowserRouter>
    </Provider>,
    document.getElementById('chat')
  );
};

export default app;
