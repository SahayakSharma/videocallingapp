'use client'
import { UserConfig } from '@/config/dbConfig/userConfig';
import { useUser } from '@clerk/nextjs';
import { DocumentData } from 'firebase/firestore';
import Image from 'next/image';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'

export default function ChatTabSidebar({ setactiveChat, changeSidebar }: { setactiveChat: Dispatch<SetStateAction<string | null>>, changeSidebar: Dispatch<SetStateAction<string>> }) {

  const [rooms, setrooms] = useState<DocumentData[]>([]);
  const { isSignedIn, user } = useUser()
  useEffect(() => {
    if (isSignedIn) {
      const userid = user.id;
      const temp = UserConfig.getinstance();
      temp.getUserRooms(userid)
        .then((res) => {
          setrooms(res)
        });
    }
  }, [isSignedIn])
  return (
    <div className='py-10 h-full min-w-[200px]'>
      <section className='flex gap-4 justify-end px-6'>
        <Image src={"/images/users.svg"} alt='image here' width={20} height={20} className=' invert' onClick={()=>changeSidebar("find")}/>
      </section>
      <h1 className='text-[20px] font-extrabold text-white py-4 px-4'>Your Chats</h1>
    </div>
  )
}
