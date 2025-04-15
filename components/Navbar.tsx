import React from 'react'

export default function Navbar() {
  return (
    <div className='w-full bg-dark-1 px-18 py-4 flex justify-between items-center'>
      <section className=' text-white font-extrabold text-[30px]'>
        <p>Zink</p>
      </section>
      <section>
        <div className='w-[40px] h-[40px] bg-white rounded-full cursor-pointer' title='profile'>
        </div>
      </section>
    </div>
  )
}
