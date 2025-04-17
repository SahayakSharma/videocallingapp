'use client'
import { useContext,createContext,ReactNode, useState, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

type ISocketContext={
    socket:Socket | undefined,
}
const SocketContext=createContext<ISocketContext|null>(null);


export const SocketProvider=({children}:{children:ReactNode})=>{
    const [socket,setsocket]=useState<Socket>();
    const socketref=useRef<Socket>(null);
    useEffect(()=>{
        if(!socket){
            const connection=io("https://zincbackendhub.xyz/");
            setsocket(connection);
            socketref.current=connection;
        }
        return(()=>{
            socketref.current?.disconnect();
        })
    },[])

    return(
        <SocketContext.Provider value={{socket}}>
            {children}
        </SocketContext.Provider>
    )
}

export const useSocket=()=>{
    const socket=useContext(SocketContext);
    return socket;
}