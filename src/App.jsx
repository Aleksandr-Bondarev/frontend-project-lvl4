import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import RoutesInit from './components/RoutesInit.jsx';

const app = () => {
  ReactDOM.render(
    <BrowserRouter>
      <div className="d-flex flex-column h-100">
        <Navbar />
        <RoutesInit />
      </div>
    </BrowserRouter>,
    document.getElementById('chat'),
  );
};

export default app;
