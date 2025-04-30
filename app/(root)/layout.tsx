
import { SocketProvider } from '@/context/socketProvider'
import React, { ReactNode } from 'react'
import ChildRootLayout from './ChildRootLayout'

export default function layout({ children }: { children: ReactNode }) {
  return (
    <main className='w-[100%]'>
      <SocketProvider>
        <ChildRootLayout>
          {children}
        </ChildRootLayout>
      </SocketProvider>
    </main>
  )
}
