'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

export default function JoinMeeting() {
  const router=useRouter();
  const [roomid,setroomid]=useState<String>("");
  const handleJoinRoom=()=>{
    router.push(`/meeting/${roomid}`);
  }
  return (
    <main className='flex justify-center items-center text-white h-full'>
      <div className='p-6 shadow-md shadow-[#22223B] rounded-xl flex flex-col gap-5 min-h-80 min-w-2xl bg-dark-1'>
        <h1 className='text-2xl font-bold pb-10 uppercase'>Join Room</h1>
        <h2 className='text-xl font-light'>Enter Room ID</h2>
        <input type="text" className='outline-none border-[1px] border-white px-4 py-2 rounded-sm' placeholder='' spellCheck={false} onChange={(e)=>setroomid(e.target.value)}/>
        <button className='bg-blue-600 rounded-lg px-4 py-2 font-medium cursor-pointer hover:bg-blue-700 mt-8' onClick={handleJoinRoom}>Join Meeting</button>
        <Link href={"/start-meeting"} className='text-blue-300 font-light underline text-center'>{`Start a New Meeting!`}</Link>
      </div>
    </main>
  )
}
