'use client'
import { sidebarRoautes } from '@/lib/Sidebarroutes'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

export default function Sidebar() {
  const router=useRouter();
  const path=usePathname();
  return (
    <div className='bg-dark-1 sticky left-0 top-0 h-screen px-4 md:px-6 py-10 text-white text-[20px] lg:flex flex-col gap-5 hidden'>
      {
        sidebarRoautes.map((route,index)=>(
          <div className='w-full font-bold text-white flex gap-4 cursor-pointer px-4 lg:px-8 py-5 rounded-[14px] justify-center lg:justify-normal items-center' key={index} style={{backgroundColor:path===route.route ? "blue":"inherit"}} onClick={()=>{
            router.push(route.route)
          }}>
            <Image src={route.icon} alt='image here' className='invert' width={24} height={24} title={route.label}/>
            <p className='hidden lg:block'>{route.label}</p>
          </div>
        ))
      }
    </div>
  )
}
