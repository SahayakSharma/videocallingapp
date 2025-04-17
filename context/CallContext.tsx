'use client'

import { useContext,createContext,useState,ReactNode, useEffect, Dispatch, SetStateAction } from "react"
import { useSocket } from "./socketProvider";

type ICallContext={
    isCallActive:boolean,
    status:string,
    secondPerson?:string,
    setisCallActive:Dispatch<SetStateAction<boolean>>
}

const CallContext=createContext<ICallContext | null>(null);

export const CallProvider=({children}:{children:ReactNode})=>{
    const [isCallActive,setisCallActive]=useState<boolean>(false);
    const [status,setstatus]=useState<string>("none");
    const [secondPerson,setSecondPerson]=useState<string>("none");

    const socket=useSocket();

    useEffect(()=>{
        if(socket){
            socket.socket?.on("call",()=>{
                setisCallActive(true);
            })
        }
    },[socket])
    return(
        <CallContext.Provider value={{isCallActive,status,secondPerson,setisCallActive}}>
            {children}
        </CallContext.Provider>
    )
}

export const useCall=()=>{
    const call=useContext(CallContext);
    return call;
}