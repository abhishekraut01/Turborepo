"use client";

import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { io, Socket } from "socket.io-client";

type SocketProviderProps = {
  children: ReactNode;
};

interface MessagePayload {
  message: string;
}

interface SocketContextType {
  sendMessage: (msg: string) => void;
  data: string[];
}

const SocketContext = createContext<SocketContextType | null>(null);

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | undefined>(undefined);
  const [data, setData] = useState<string[]>([]);

  useEffect(() => {
    const _socketio = io("http://localhost:9000", {
      transports: ["websocket"],
    });

    _socketio.on("connect", () => {
      console.log("✅ Socket connected:", _socketio.id);
    });

    _socketio.on("message", (data: MessagePayload) => {
      const res = JSON.parse(data.message);
      setData((prev) => [...prev, res]);
    });

    _socketio.on("disconnect", (reason) => {
      console.log("❌ Socket disconnected:", reason);
    });

    setSocket(_socketio);

    return () => {
      _socketio.disconnect();
      setSocket(undefined);
      console.log("🧹 Socket disconnected on unmount");
    };
  }, []);

  const sendMessage = useCallback(
    (msg: string) => {
      if (socket) {
        socket.emit("event:message", { message: msg });
        console.log("📤 Sent message:", msg);
      } else {
        console.warn("🚫 Cannot send, socket not connected.");
      }
    },
    [socket]
  );

  return (
    <SocketContext.Provider value={{ sendMessage, data }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context)
    throw new Error("useSocket must be used within a SocketProvider");
  return context;
};
