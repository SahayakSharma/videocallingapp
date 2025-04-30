'use client'
import { UserConfig } from '@/config/dbConfig/userConfig';
import { useSocket } from '@/context/socketProvider';
import { IUser } from '@/types/userTypes';
import { useUser } from '@clerk/nextjs'
import React, { ReactNode, useEffect } from 'react'


export default function ChildRootLayout({ children }: { children: ReactNode }) {

    const { isLoaded, isSignedIn, user } = useUser();
    const socket=useSocket();
    useEffect(() => {
        if (isSignedIn) {
            if(socket){
                socket.socket?.emit("identity",{
                    username:user.username,
                    fullName:user.fullName? user.fullName : "unknown",
                    email:user.emailAddresses[0].emailAddress,
                    imageUrl:user.imageUrl
                })
            }
            console.log(user)
            const temp = UserConfig.getinstance();
            const payload:IUser = {
                username: user.username ? user.username : "",
                email:user.emailAddresses[0].emailAddress,
                userid:user.id,
                firstName:user.firstName,
                lastName:user.lastName,
                imageUrl:user.imageUrl,
                hasImage:user.hasImage,
                fullName:user.fullName
            }
            temp.checkUserExistance(payload);
        }
    }, [isSignedIn,socket])
    return (
        <main>
            {children}
        </main>
    )
}
