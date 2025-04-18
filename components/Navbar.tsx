import React from 'react'
import { SignedIn ,UserButton } from '@clerk/nextjs'
export default function Navbar() {
  return (
    <div className='w-full bg-dark-1 px-18 py-4 flex justify-between items-center'>
      <section className=' text-white font-extrabold text-[30px]'>
        <p>Zink</p>
      </section>
      <section>
        <SignedIn>
          <UserButton/>
        </SignedIn>
      </section>
    </div>
  )
}
