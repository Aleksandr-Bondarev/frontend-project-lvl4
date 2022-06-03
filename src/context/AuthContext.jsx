/* eslint react/jsx-no-constructed-context-values: [0] */

import React from 'react';

export const AuthContext = React.createContext();

export function AuthContextProvider({ children }) {
  const getUser = () => localStorage.getItem('username');

  const getToken = () => localStorage.getItem('token');

  const isAuthorized = () => {
    const token = getToken();
    return !!token;
  };

  const toLogIn = ({ token, username }) => {
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
  };

  const toLogOut = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{
      getUser,
      getToken,
      isAuthorized,
      toLogIn,
      toLogOut,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
}
