'use client'
import { homeCards } from '@/lib/HomeCards'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function HomeCards() {
    const router=useRouter();
  return (
    <div className='w-full grid grid-cols-1 lg:grid-cols-4 mt-10 gap-4'>
        {
            homeCards.map((card,index)=>(
                <div className='px-6 py-8 rounded-[14px] flex flex-col justify-between gap-30 cursor-pointer' style={{backgroundColor:card.color}} key={index} onClick={()=>{
                    router.push(card.route);
                }}>
                    <Image src={card.icon} alt='image here' width={30} height={30}/>
                    <section className='w-full'>
                        <h1 className='font-extrabold text-[30px]'>{card.title}</h1>
                        <h1 className='font-medium text-[20px] capitalize'>{card.description}</h1>
                    </section>
                </div>
            ))
        }
    </div>
  )
}
