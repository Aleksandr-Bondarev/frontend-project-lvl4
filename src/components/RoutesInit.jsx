import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Login.jsx';
import NotFound from './NotFound.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
