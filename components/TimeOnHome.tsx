'use client'

import React, { useEffect, useState } from 'react'

export default function TimeOnHome() {
    const [time,settime]=useState<string>("");
    
    const date=new Date().toLocaleDateString([],{
        day:'2-digit',
        month:'long',
        year:'numeric',
        weekday:'long',
    })
    useEffect(()=>{
        const now=new Date();
        settime(now.toLocaleTimeString([],{
            hour:'2-digit',
            minute:'2-digit',
            hour12:true
        }))
        setInterval(() => {
            const now=new Date();
            const timeinstring=now.toLocaleTimeString([],{
                hour:'2-digit',
                minute:'2-digit',
                hour12:true
            })
            settime(timeinstring)
        }, 10000);
    },[])
    return (
        <div className="w-full bg-cover homebanner px-8 pt-40 pb-10 rounded-[14px] text-white" >
            <p className='font-extrabold text-[50px]'>{time}</p>
            <p className='font-medium text-[20px]'>{date} </p>
        </div>
    )
}
