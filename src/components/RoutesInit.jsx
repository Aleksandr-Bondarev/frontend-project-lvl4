import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';
import Login from './Login.jsx';
import NotFound from './NotFound.jsx';
import SignUp from './SignUp.jsx';
import Chat from './Chat.jsx';

function RoutesInit() {
  const { authentificationStatus } = useContext(AuthContext);
  return (
    <Routes>
      <Route path="/" element={authentificationStatus ? <Chat /> : <Navigate to="login" replace />} />
      <Route path="login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
      <Route path="signup" element={<SignUp />} />
    </Routes>
  );
}

export default RoutesInit;
