import { useTheme } from "@/context/themeContext";
import { toJsDate } from "@/helper/time";
import { DocumentData } from "firebase/firestore";
import Image from "next/image";

export default function SystemMessage({message}:{message:DocumentData}){
    const {colors}=useTheme();

    return(
        <div className="w-fit mx-auto font-light" style={{color:colors.text}}>
            <p className="text-[10px]  text-center">{toJsDate(message.crated_at).toISOString().slice(0,10)}</p>
            <p className="text-center px-2 py-1 rounded-md text-[12px] underline" style={{backgroundColor:colors.inputBackground}}>{message.payload}</p>
        </div>
    )
}


export function SentByMe({message}:{message:DocumentData}){
    const {colors}=useTheme();

    return(
        <div className="flex w-full justify-end my-3 gap-2 items-center">
            <Image src={message.sender_details.photo_url} alt="image here" width={20} height={10} className="rounded-full w-[25px] h-[25px]"/>
            <div className=" px-3 py-2 rounded-md  max-w-[50%] flex items-end gap-2" style={{backgroundColor:colors.chatBubbleSelf,color:colors.text}}>
                <p className="text-[15px] font-normal">{message.payload}</p>
                <p className="text-[11px] font-light">{toJsDate(message.crated_at).toISOString().slice(11,16)}</p>
            </div>
        </div>
    )
}


export function ReceivedByMe({message}:{message:DocumentData}){
    const {colors}=useTheme();

    return(
        <div className="flex w-full justify-start my-3 items-center gap-2">
            <div className=" px-3 py-2 rounded-md  max-w-[50%] flex items-end gap-2" style={{backgroundColor:colors.chatBubbleOther,color:colors.text}}>
                <p className="text-[15px] font-normal">{message.payload}</p>
                <p className="text-[11px] font-light">{toJsDate(message.crated_at).toISOString().slice(11,16)}</p>
            </div>
            <Image src={message.sender_details.photo_url} alt="image here" width={20} height={10} className="rounded-full w-[25px] h-[25px]"/>
        </div>
    )
}