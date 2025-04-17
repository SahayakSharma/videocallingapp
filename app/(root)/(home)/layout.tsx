import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import React, { ReactNode } from 'react'
import ChildHomeLayout from './ChildHomeLayout'
import { CallProvider } from '@/context/CallContext'

export default function layout({ children }: { children: ReactNode }) {
  return (
    <main className='w-[100%]'>
      <Navbar />
      <div className='w-full flex'>
        <Sidebar />
        <CallProvider>
        <ChildHomeLayout>
          {children}
        </ChildHomeLayout>
        </CallProvider>
      </div>
    </main>
  )
}
