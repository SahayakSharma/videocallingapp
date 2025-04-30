'use client'
import { UserConfig } from '@/config/dbConfig/userConfig';
import { useUser } from '@clerk/nextjs';
import { DocumentData } from 'firebase/firestore'
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

export default function FindUserTab() {

  const [users, setusers] = useState<DocumentData[]>([]);
  useEffect(() => {
    const temp = UserConfig.getinstance();
    temp.getAllUsers().then((res) => {
      setusers(res);
    });
  }, [])
  return (
    <div className='p-10'>
      <button className='px-3 py-1 bg-green-600 rounded-xl text-white font-bold capitalize'>back</button>
      <input className='w-full outline-none border-white border-2 rounded-md px-8 py-4 text-white font-bold text-[20px] mt-10' placeholder='Enter Name to Search' />
      <div className='w-full mt-10 flex flex-col gap-8'>
        {
          users.map((user, index) => {
            return (
              <div className="px-6 py-2 rounded-md flex items-center" key={index}>
                <Image src={"/images/user.svg"} alt="image here" width={50} height={50} className='rounded-full bg-white'/>
                <p className='text-white px-8 capitalize text-[30px] font-extrabold'>{user.username}</p>
              </div>
            )
          })
        }
      </div>

    </div>
  )
}
