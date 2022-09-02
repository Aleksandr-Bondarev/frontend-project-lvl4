import React, { useMemo } from 'react';

export const SocketContext = React.createContext();

export function SocketContextProvider({ children, socket }) {
  const api = {
    renameChannel: (id, name, cb) => socket.emit('renameChannel', { id, name }, cb),
    removeChannel: (id, cb) => socket.emit('removeChannel', { id }, cb),
    addChannel: ({ name }, cb) => socket.emit('newChannel', { name }, cb),
    addMessage: ({ text, channelId, username }, cb) => socket.emit('newMessage', { text, channelId, username }, cb),
  };

  const memorizedApi = useMemo(() => api, []);

  return (
    <SocketContext.Provider value={memorizedApi}>{children}</SocketContext.Provider>
  );
}
