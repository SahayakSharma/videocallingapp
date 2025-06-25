'use client'
import { useAuth } from '@/context/authContext'
import { sidebarRoautes } from '@/lib/Sidebarroutes'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

export default function Sidebar() {
  const router=useRouter();
  const path=usePathname();
  const {signOut}=useAuth();
  return (
    <div className='bg-dark-1 sticky left-0 top-0 h-screen px-4 md:px-5 py-10 text-white text-[20px] lg:flex lg:flex-col gap-5 hidden'>
      {
        sidebarRoautes.map((route,index)=>(
          <div className='font-bold text-white flex gap-5 cursor-pointer px-4 lg:px-8 py-5 rounded-[14px] justify-center lg:justify-normal items-center' key={index} style={{backgroundColor:path===route.route ? "blue":"inherit"}} onClick={()=>{
            router.push(route.route)
          }}>
            <route.reactIcon size={25}/>
            <p className='hidden lg:block whitespace-nowrap'>{route.label}</p>
          </div>
        ))
      }
      <p onClick={signOut}>Signout</p>
    </div>
  )
}
