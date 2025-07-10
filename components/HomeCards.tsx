'use client'
import { homeCards } from '@/lib/HomeCards'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function HomeCards() {
    const router = useRouter();
    return (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-10 gap-6">
            {homeCards.map((card, index) => (
                <div
                    key={index}
                    onClick={() => router.push(card.route)}
                    className="group px-6 py-6 rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col gap-6"
                >
                    <div
                        className="w-12 h-12 flex items-center justify-center rounded-md"
                        style={{ backgroundColor: `${card.color}22` }}
                    >
                        <Image src={card.icon} alt="icon" width={28} height={28} />
                    </div>
                    <section className="flex flex-col gap-1">
                        <h1 className="text-xl font-semibold text-gray-900">{card.title}</h1>
                        <p className="text-sm text-gray-500 capitalize">{card.description}</p>
                    </section>
                </div>
            ))}
        </div>
    );

}
