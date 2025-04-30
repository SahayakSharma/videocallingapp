'use client'
import React, { useState } from 'react'
import ChatTabSidebar from './ChatTabSidebar'
import FindUserTab from './FindUserTab';
import ChatSidebarLoader from './ChatSidebarLoader';
import ChatArea from './ChatArea';

export default function ChatTab() {

  const [activeChat, setactiveChat] = useState<string | null>(null);
  const [activeSidebar,setactiveSidebar]=useState<string>("chat");
  const [sidebarLoader,setsidebarLoader]=useState<boolean>(false);
  return (
    <div className=' flex h-full'>
      {sidebarLoader ? <ChatSidebarLoader/> : activeSidebar==="chat" ? <ChatTabSidebar changeSidebar={setactiveSidebar} setactiveChat={setactiveChat} /> : <FindUserTab/>}
      <ChatArea/>
    </div>
  )
}
