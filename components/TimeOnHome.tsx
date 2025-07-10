'use client'

import React, { useEffect, useState } from 'react'

export default function TimeOnHome() {
  const [time, settime] = useState<string>("");

  const date = new Date().toLocaleDateString([], {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    weekday: 'long',
  })
  useEffect(() => {
    const now = new Date();
    settime(now.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }))
    setInterval(() => {
      const now = new Date();
      const timeinstring = now.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      })
      settime(timeinstring)
    }, 10000);
  }, [])
  return (
    <div className="w-full px-8 pt-10 pb-8 rounded-2xl shadow-sm border border-gray-200 bg-gradient-to-br from-white to-gray-50">
      <div className="flex flex-col gap-2">
        <p className="text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight">
          {time}
        </p>
        <p className="text-lg lg:text-xl font-medium text-gray-500">
          {date}
        </p>
      </div>
    </div>
  );


}
