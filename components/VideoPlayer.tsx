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
    <div style={{}}>
        <video className='rounded-[14px] h-[280px] border-2 border-purple-600' ref={videoref} autoPlay playsInline muted={mute}></video>
        {
            audio && <audio autoPlay playsInline ref={audioref}/>
        }
        <button onClick={()=>setmute(!mute)}>{mute ? "unmute" : "mute"}</button>
    </div>
  )
}
