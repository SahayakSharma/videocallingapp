import { Dispatch, SetStateAction, useMemo, useState } from "react";
import TextInput from "../customComponents/TextInput";
import { useTheme } from "@/context/themeContext";
import { RiSendPlaneFill } from "react-icons/ri";
import { TbLoader3 } from "react-icons/tb";
import { useMessages } from "@/context/messageContext";
import { useAuth } from "@/context/authContext";
import { useUser } from "@/context/UserContext";
import {  Poppins } from 'next/font/google';

export const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-poppins',
});

export default function SendMessage({message,setMessage,handleSendMessage}:{message:string,setMessage:Dispatch<SetStateAction<string>>,handleSendMessage:()=>void}){
    const {colors}=useTheme();
    const [sending,setSending]=useState<boolean>(false);
    const {activeRoom}=useMessages();
    const {user}=useAuth();
    const {userDetails}=useUser();

    async function sendMessage(){
        setSending(true);
        handleSendMessage();
        setSending(false);
    }
    
    return(
        <main className={`w-full h-[70px] flex gap-2 items-center ${poppins.className}`}>
            <TextInput placeholder="Enter message to send" className="w-[90%] h-full" onChangeAction={(e)=>{setMessage(e.target.value)}} value={message}/>
            <div className="w-[10%] h-full rounded-md flex items-center justify-center cursor-pointer" style={{backgroundColor:colors.primary,}} onClick={sendMessage }>
                {
                    sending ? <TbLoader3 size={30} color={colors.text} className="animate-spin"/> : <RiSendPlaneFill size={30} color={colors.text}/>
                }
            </div>
        </main>
    )
}