import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import React, { ReactNode } from 'react'

export default function layout({ children }: { children: ReactNode }) {
  return (
      <main className='w-[100%]'>
        {children}
      </main>
  )
}
