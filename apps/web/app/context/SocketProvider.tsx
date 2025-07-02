import React, { createContext, ReactNode, useCallback } from "react";


type SocketProviderProps = {
    children: ReactNode;
};

interface createContextI{
    sendMessage : (msg:string )=>void
}


const SocketContext = createContext<createContextI | null>(null);


const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {

    const sendMessage:createContextI["sendMessage"] = useCallback((msg:string)=>{
        console.log("messahe send")
    },[])

    return (
        <SocketContext.Provider value={{ sendMessage }}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketProvider;