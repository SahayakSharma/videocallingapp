import { useSocket } from '@/context/socketProvider';
import { leaveRoom } from '@/helper/signalingLogic';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export default function ToggleAudioVideo({localstream}:{localstream:MediaStream | null}) {

    const [audioVideoStatus,setaudioVideoStatus]=useState<{audio:boolean,video:boolean}>({
        audio:false,
        video:false
    })
    const socket=useSocket();
    const router=useRouter();
    function toggleAudio(){
        if(audioVideoStatus.audio && localstream){
            localstream.getAudioTracks()[0].enabled=false;
            setaudioVideoStatus(()=>({...audioVideoStatus,audio:false}))
        }
        else if(!audioVideoStatus.audio && localstream){
            localstream.getAudioTracks()[0].enabled=true;
            setaudioVideoStatus(()=>({...audioVideoStatus,audio:true}))
        }
    }
    function toggleVideo(){
        if(audioVideoStatus.video && localstream){
            localstream.getVideoTracks()[0].enabled=false;
            setaudioVideoStatus(()=>({...audioVideoStatus,video:false}))
        }
        else if(!audioVideoStatus.video && localstream){
            localstream.getVideoTracks()[0].enabled=true;
            setaudioVideoStatus(()=>({...audioVideoStatus,video:true}))
        }
    }


    useEffect(()=>{
        if(localstream){
            localstream.getVideoTracks()[0].enabled=false;
            localstream.getAudioTracks()[0].enabled=false;
        }
    },[localstream])
  return (
    <div className='sticky left-0 bottom-20 px-30 py-8 rounded-[50px] bg-dark-1 mt-60 w-[50%] mx-auto flex gap-18 justify-around items-center'>
        {
            audioVideoStatus.audio ? <Image src={"/images/mic-on.svg"} alt='image here' width={50} height={50} className='invert' onClick={toggleAudio} title='Mic On'/> : <Image  src={"/images/mic-off.svg"} alt='image here' width={50} height={50} className='invert' onClick={toggleAudio} title='Mic Off'/>
        }
        {
            audioVideoStatus.video ? <Image src={"/images/cam-on.svg"} alt='image here' width={50} height={50} className='invert' onClick={toggleVideo} title='Video On'/> : <Image  src={"/images/cam-off.svg"} alt='image here' width={50} height={50} className='invert' onClick={toggleVideo} title='Video Off'/>
        }
        <Image src={"/images/users.svg"} alt='image here' width={50} height={50} className='invert cursor-pointer' title='View Participants'/>
        <Image src={"/images/hang.svg"} alt='image here' width={50} height={50} className='invert cursor-pointer' title='Hang Up' onClick={()=>{
            if(socket){
                leaveRoom();
                if(localstream){
                    localstream.getTracks().forEach((track)=>track.stop());
                }
                else console.log("no stream present")
                socket.socket?.emit("hang-up",{userid:socket.socket?.id})
                router.replace("/");
            }
        }}/>
    </div>
  )
}
