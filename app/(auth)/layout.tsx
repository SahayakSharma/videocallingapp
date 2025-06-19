'use client'
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";



export default function AuthLayout({children}:{children:ReactNode}){
    const {user}=useAuth();
    const router=useRouter();
    useEffect(()=>{
        if(user){
            router.replace("/start-meeting")
        }
    },[user])
    return(
        <>
            {children}
        </>
    )
}
