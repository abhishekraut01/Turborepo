"use client";

import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
} from "react";
import { io } from "socket.io-client";

type SocketProviderProps = {
  children: ReactNode;
};

interface createContextI {
  sendMessage: (msg: string) => void;
}

const SocketContext = createContext<createContextI | null>(null);

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  useEffect(() => {
    const _socketio = io("http://localhost:9000/");

    return () => {
      _socketio.disconnect();
    };
  }, []);

  const sendMessage: createContextI["sendMessage"] = useCallback(
    (msg: string) => {
      console.log("messahe send");
    },
    []
  );

  return (
    <SocketContext.Provider value={{ sendMessage }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const state = useContext(SocketContext);
  if (!state) throw new Error("state is undefined");

  return state;
};
