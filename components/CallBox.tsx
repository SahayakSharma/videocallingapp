import { useCall } from '@/context/CallContext'
import Image from 'next/image'
import React from 'react'

export default function CallBox() {
  const call=useCall();
  return (
    <div className='text-white border-[1px] border-white w-2xl sticky bottom-6 left-[1200px] rounded-3xl bg-dark-1 px-6 py-18 items-center justify-center flex flex-col gap-14' style={{display:call?.isCallActive ? "flex" : "none"}}>
      <h1 className='font-extrabold text-4xl'>Incoming Call</h1>
      <Image src={"/images/phone-call.svg"} alt='image here' width={70} height={70} className='invert animate-pulse' />
      <div className='w-full flex justify-center gap-30'>
        <button className='px-6 py-4 font-extrabold text-xl bg-blue-600 rounded-3xl'>
            Answer
        </button>
        <button className='px-6 py-4 font-extrabold text-xl bg-red-600 rounded-3xl cursor-pointer' onClick={()=>{
          call?.setisCallActive(false);
        }}>
            Decline
        </button>
      </div>
    </div>
  )
}
