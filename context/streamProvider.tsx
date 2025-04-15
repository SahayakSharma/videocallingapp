'use client'
import React,{createContext,Dispatch,ReactNode,SetStateAction,useContext, useEffect, useState} from "react";


type streamcontexttype={
    stream:MediaStream|null,
    setstream:Dispatch<SetStateAction<MediaStream|null>>
}
const StreamContext=createContext<streamcontexttype|null>(null);



export const StreamProvider=({children}:{children:ReactNode})=>{
    const [stream,setstream]=useState<MediaStream|null>(null);
    async function getstreamfromdevice(){
        const temp=await navigator.mediaDevices.getUserMedia({video:true,audio:true});
        setstream(temp);
    }
    useEffect(()=>{
        getstreamfromdevice();
    },[])
    return(
        <StreamContext.Provider value={{stream,setstream}}>
            {children}
        </StreamContext.Provider>
    )
}


export const useStream=()=>{
    const streamval=useContext(StreamContext);
    return streamval;
}