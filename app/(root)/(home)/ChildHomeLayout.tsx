'use client'
import CallBox from '@/components/CallBox';
import { useSocket } from '@/context/socketProvider'
import React, { ReactNode, useEffect } from 'react'

export default function ChildHomeLayout({ children }: { children: ReactNode }) {
    const socket=useSocket();


    useEffect(()=>{
        const connection=socket?.socket;
        if(connection){
            connection.on("call",()=>console.log("call received"));
        }
    },[socket])
    return (
        <div className='w-full'>
            {children}
            <CallBox/>
        </div>
    )
}
