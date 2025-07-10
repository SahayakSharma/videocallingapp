'use client'
import { useMessages } from '@/context/messageContext'
import React from 'react'
import RoomList from './messages/RoomList';
import Messages from './messages/Messages';
import { TbMessages } from 'react-icons/tb';
import { useTheme } from '@/context/themeContext';

export default function ChatTab() {
  const { myRooms, myRoomsFetched } = useMessages();
  const { colors } = useTheme();

  return (
    !myRoomsFetched ? (
      <main className="w-full min-h-screen flex flex-col justify-center items-center gap-5">
        <TbMessages size={60} color={colors.textSecondary} />
        <h1 className="text-xl font-semibold" style={{ color: colors.text }}>Fetching your messages...</h1>
        <p className="text-sm font-light text-gray-500" style={{ color: colors.textSecondary }}>
          Please wait while we load your conversations.
        </p>
      </main>
    ) : (
      <main className="w-full min-h-screen flex flex-row">
        <RoomList />
        <Messages />
      </main>
    )
  );
}

