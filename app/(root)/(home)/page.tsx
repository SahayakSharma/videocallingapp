
import HomeCards from '@/components/HomeCards'
import TimeOnHome from '@/components/TimeOnHome'
import React from 'react'

export default function Home() {

  return (
    <main className='flex-1 px-2 md:px-8 py-10'>
      <TimeOnHome/>
      <HomeCards/>
    </main>
  )
}
