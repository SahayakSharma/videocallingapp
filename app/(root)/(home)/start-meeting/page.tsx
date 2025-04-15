'use client'
import Image from 'next/image';
import React, { useState } from 'react'

export default function StartMeeting() {
  const [isAuto, setisAuto] = useState<boolean>(false);
  const [roomID, setroomID] = useState<string>("room-id-your-xyz");
  const [isprocessing, setisprocessing] = useState<boolean>(false);
  const [isValid, setisValid] = useState<boolean>(false);

  async function handleRoomIdButtonClick() {
    setisprocessing(true);
    setTimeout(() => {
      setisValid(true);
      setisprocessing(false)
    }, 2000);
  }
  return (
    <div className='flex-1 px-2 md:px-8 py-10 flex flex-col gap-10'>
      <div className='bg-[#edede9] p-10 rounded-xl text-black'>
        <h1 className='text-[30px] font-extrabold capitalize py-4'>Create your custom room ID</h1>
        <input type="text" className='w-full outline-none bg-inherit border-[1px] border-[#669bbc] rounded-md py-4 px-6 text-[20px] font-medium placeholder:capitalize' placeholder='Enter your custom rooom id' onChange={(e) => {
          if (!isAuto) setroomID(e.target.value)
        }} value={roomID} style={{ cursor: isAuto ? "not-allowed" : "default" }} disabled={isAuto} />
        <div className='py-8 flex gap-4 items-center'>
          <input type="checkbox" className='bg-dark-2 outline-none w-4 h-4' onChange={(e) => {
            setisAuto(e.target.checked)
          }} />
          <p className='capitalize fontlight text-[15px]'>Auto generate room ID</p>
        </div>
        <button className='w-full bg-blue-600 rounded-xl text-white flex items-center justify-center py-6 text-[30px] font-extrabold cursor-pointer' onClick={handleRoomIdButtonClick}>
          {isprocessing ? <Image src={"/images/loader.svg"} alt='loader image here' width={40} height={40} className='animate-spin invert' /> : !isAuto ? "Validate Room ID" : "Auto Generate Room ID"}
        </button>

        <div className='w-full' style={{ display: isValid ? "block" : "none" }}>
          <div className='flex w-full justify-between py-10'>
            <section className='w-[48%] p-4 border-2 border-[#e0e1dd] rounded-md'>
              <h1 className='text-[20px] font-bold'>Your Room ID</h1>
              <div className='flex items-center gap-4'>
                <p className='py-3 text-[20px] font-light'>{roomID}</p>
                <Image src={"/images/copy.svg"} alt='copy image here' width={25} height={25} className=' opacity-65 cursor-pointer' onClick={async () => {
                  await navigator.clipboard.writeText(roomID)
                  alert("Room ID Copied To Clipboard!")
                }} />
              </div>
            </section>
            <section className='w-[48%] p-4 border-2 border-[#e0e1dd] rounded-md'>
              <h1 className='text-[20px] font-bold'>Meeting URL</h1>
              <div className='flex items-center gap-4'>
                <p className='py-3 text-[20px] font-light'>{`http://localhost:3000/meeting/${roomID}`}</p>
                <Image src={"/images/copy.svg"} alt='copy image here' width={25} height={25} className=' opacity-65 cursor-pointer' onClick={async () => {
                  await navigator.clipboard.writeText(`http://localhost:3000/meeting/${roomID}`)
                  alert("Room ID Copied To Clipboard!")
                }} />
              </div>
            </section>
          </div>
          <button className='w-full bg-blue-600 rounded-xl text-white flex items-center justify-center py-6 text-[30px] font-extrabold cursor-pointer capitalize'>
            Start meeting
          </button>
        </div>
      </div>
    </div>
  )
}
