import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react'

export default function VideoPlayer({video,audio}:{video:MediaStream,audio:MediaStream | undefined}) {
    const videoref=useRef<HTMLVideoElement>(null);
    const audioref=useRef<HTMLAudioElement>(null);
    const [mute,setmute]=useState<boolean>(false);
    useEffect(()=>{
        if(videoref.current && video){
            console.log("assingning stream...")
            videoref.current.srcObject=video;
        }
        if(audioref.current && audio){
            audioref.current.srcObject=audio;
        }
    },[video,audio])
  return (
    <div>
        <video className='rounded-[14px] h-fit border-2 border-purple-600' ref={videoref} autoPlay playsInline muted={mute}></video>
        {
            audio && <audio autoPlay playsInline ref={audioref}/>
        }
        <div className='relative bottom-[460px] left-[20px] gap-3 hidden'>
            {audio?.getAudioTracks()[0].enabled ? <Image src={"/images/mic-on.svg"} alt="image here" width={20} height={20} className='invert'/> : <Image src={"/images/mic-off.svg"} alt="image here" width={20} height={20} className='invert'/>}
            {video?.getVideoTracks()[0].enabled ? <Image src={"/images/cam-on.svg"} alt="image here" width={20} height={20} className='invert'/> : <Image src={"/images/cam-off.svg"} alt="image here" width={20} height={20} className='invert'/>}
        </div>
    </div>
  )
}
