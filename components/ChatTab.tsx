'use client'
import { useMessages } from '@/context/messageContext'
import React, { useState } from 'react'
import RoomList from './messages/RoomList';
import Messages from './messages/Messages';


export default function ChatTab() {
  const {myRooms,myRoomsFetched}=useMessages();

  return (
    !myRoomsFetched ? <p className='text-center py-52 font-medium text-xl'>Fetching your data...</p> : 
    <main className='w-full min-h-screen flex flex-row'>
      <RoomList/>
      <Messages/>
    </main>
  )
}
