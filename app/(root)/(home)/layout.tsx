'use client'
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import React, { ReactNode, useEffect } from 'react'
import ChildHomeLayout from './ChildHomeLayout'
import { CallProvider } from '@/context/CallContext'
import { useAuth } from '@/context/authContext'
import { useRouter } from 'next/navigation'
import { UserProvider } from '@/context/UserContext'
import { useTheme } from '@/context/themeContext'

export default function layout({ children }: { children: ReactNode }) {

  const { user } = useAuth();
  const router = useRouter();
  const {colors}=useTheme();
  useEffect(() => {
    if (!user) {
      router.replace("/sign-in")
    }
  }, [user])
  return (
    <main className='w-[100%]' style={{backgroundColor:colors.surface}}>
      <UserProvider>
        {/* <Navbar /> */}
        <div className='w-full flex'>
          <Sidebar />
          <CallProvider>
            <ChildHomeLayout>
              {children}
            </ChildHomeLayout>
          </CallProvider>
        </div>
      </UserProvider>
    </main>
  )
}
