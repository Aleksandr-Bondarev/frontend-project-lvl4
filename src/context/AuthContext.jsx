/* eslint react/jsx-no-constructed-context-values: [0] */

import React, { useState } from 'react';

export const AuthContext = React.createContext();

export function AuthContextProvider({ children }) {
  const getUser = () => localStorage.getItem('username');

  const getToken = () => localStorage.getItem('token');

  const isAuthorized = () => {
    const token = getToken();
    return !!token;
  };

  const [authentificationStatus, setAuthentificationStatus] = useState(isAuthorized());

  const login = ({ token, username }) => {
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
    setAuthentificationStatus(true);
  };

  const logOut = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    setAuthentificationStatus(false);
  };

  return (
    <AuthContext.Provider value={{
      getUser,
      getToken,
      isAuthorized,
      login,
      logOut,
      authentificationStatus,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
}
