import React from 'react';

export const SocketContext = React.createContext();

export function SocketContextProvider ({children, socket}) {

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}