'use client'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

export default function StartMeeting() {
  const [isAuto, setisAuto] = useState<boolean>(false);
  const [roomID, setroomID] = useState<string>("");
  const [isprocessing, setisprocessing] = useState<boolean>(false);
  const [isValid, setisValid] = useState<boolean>(false);
  const router = useRouter();
  async function handleRoomIdButtonClick() {
    setisprocessing(true);
    setTimeout(() => {
      setisValid(true);
      setisprocessing(false)
    }, 2000);
  }
  return (
  <div className="flex-1 px-4 md:px-10 py-10 flex flex-col items-center">
    <div className="w-full max-w-3xl bg-white shadow-lg rounded-2xl px-8 py-10 border border-gray-200 space-y-8">

      <header className="text-center space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Start a Meeting</h1>
        <p className="text-gray-500 text-base md:text-lg font-light">
          Create a custom room ID or auto-generate one to begin.
        </p>
      </header>


      <section className="space-y-4">
        <input
          type="text"
          className={`w-full rounded-lg border border-gray-300 px-5 py-3 text-lg font-medium shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            isAuto ? 'bg-gray-100 cursor-not-allowed text-gray-500' : 'bg-white text-gray-800'
          }`}
          placeholder="Type your custom room name..."
          value={roomID}
          disabled={isAuto}
          onChange={(e) => {
            if (!isAuto) setroomID(e.target.value);
          }}
        />

        <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
          <input
            type="checkbox"
            className="w-4 h-4 accent-blue-600"
            onChange={(e) => setisAuto(e.target.checked)}
          />
          <span>Auto-generate room ID for me</span>
        </label>

        <button
          onClick={handleRoomIdButtonClick}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-3 font-semibold text-lg flex items-center justify-center transition-all"
        >
          {isprocessing ? (
            <Image
              src="/images/loader.svg"
              alt="Loading"
              width={24}
              height={24}
              className="animate-spin invert"
            />
          ) : isAuto ? 'Generate Room ID' : 'Validate Room ID'}
        </button>
      </section>

      {isValid && (
        <section className="space-y-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50">
              <p className="text-gray-700 font-semibold mb-1">Your Room ID</p>
              <div className="flex items-center justify-between">
                <p className="text-gray-800 font-mono text-base">{roomID}</p>
                <Image
                  src="/images/copy.svg"
                  alt="Copy Room ID"
                  width={20}
                  height={20}
                  className="cursor-pointer opacity-70 hover:opacity-100"
                  onClick={async () => {
                    await navigator.clipboard.writeText(roomID);
                    alert('Room ID Copied!');
                  }}
                />
              </div>
            </div>

            <div className="flex-1 border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50">
              <p className="text-gray-700 font-semibold mb-1">Meeting URL</p>
              <div className="flex items-center justify-between">
                <p className="text-gray-800 font-mono text-sm truncate">
                  {`videocallingapp-one.vercel.app/meeting/${roomID}`}
                </p>
                <Image
                  src="/images/copy.svg"
                  alt="Copy URL"
                  width={20}
                  height={20}
                  className="cursor-pointer opacity-70 hover:opacity-100"
                  onClick={async () => {
                    await navigator.clipboard.writeText(
                      `https://videocallingapp-one.vercel.app/meeting/${roomID}`
                    );
                    alert('Meeting URL Copied!');
                  }}
                />
              </div>
            </div>
          </div>

          <button
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg text-lg font-semibold transition-all"
            onClick={() => router.replace(`/meeting/${roomID}`)}
          >
            Start Meeting
          </button>
        </section>
      )}
    </div>
  </div>
);


}
