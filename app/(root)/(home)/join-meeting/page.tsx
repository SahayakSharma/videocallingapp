'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

export default function JoinMeeting() {
  const router = useRouter();
  const [roomid, setroomid] = useState<string>("");
  const handleJoinRoom = () => {
    router.push(`/meeting/${roomid}`);
  }
  return (
    <main className="flex justify-center items-center h-screen bg-gradient-to-br from-[#e0f7fa] to-[#ffffff] px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md flex flex-col items-center gap-6 border border-gray-200">
        <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">Join a Meeting</h1>

        <div className="w-full">
          <label htmlFor="roomid" className="block text-sm font-medium text-gray-600 mb-1">Room ID</label>
          <input
            id="roomid"
            type="text"
            className="w-full px-4 py-3 border rounded-lg text-gray-800 text-base outline-none focus:ring-2 focus:ring-blue-400 transition-all"
            placeholder="Enter your room ID"
            spellCheck={false}
            value={roomid}
            onChange={(e) => setroomid(e.target.value)}
          />
        </div>

        <button
          onClick={handleJoinRoom}
          disabled={roomid.trim() === ""}
          className={`w-full py-3 text-white rounded-lg font-semibold text-lg transition-all ${roomid.trim() !== ""
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-blue-300 cursor-not-allowed"
            }`}
        >
          Join Meeting
        </button>

        <div className="pt-2">
          <Link
            href="/start-meeting"
            className="text-sm text-blue-600 hover:underline"
          >
            Start a new meeting instead →
          </Link>
        </div>
      </div>
    </main>
  );

}
