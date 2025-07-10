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
  <div className="bg-dark-1 sticky left-0 top-0 h-screen px-4 py-8 text-white text-[16px] lg:flex lg:flex-col gap-4 hidden">
    {sidebarRoautes.map((route, index) => {
      const isActive = path === route.route;
      return (
        <div
          key={index}
          onClick={() => router.push(route.route)}
          className={`flex items-center gap-4 px-4 py-3 rounded-lg cursor-pointer transition-all duration-150 ${
            isActive ? 'bg-blue-600 shadow-md' : 'hover:bg-dark-2'
          }`}
        >
          <route.reactIcon size={22} />
          <p className="hidden lg:block whitespace-nowrap font-medium">{route.label}</p>
        </div>
      );
    })}

    <div
      onClick={signOut}
      className="mt-auto px-4 py-3 rounded-lg cursor-pointer text-red-400 hover:bg-dark-2 transition-all duration-150"
    >
      <p className="hidden lg:block font-medium">Sign out</p>
    </div>
  </div>
);

}
