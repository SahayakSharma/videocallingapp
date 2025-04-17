
import { SocketProvider } from '@/context/socketProvider'
import React, { ReactNode } from 'react'

export default function layout({ children }: { children: ReactNode }) {
  return (
    <main className='w-[100%]'>
      <SocketProvider>
          {children}
      </SocketProvider>
    </main>
  )
}
