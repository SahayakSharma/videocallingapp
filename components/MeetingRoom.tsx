'use client'
import React from 'react'
import { useRef,useState,useEffect } from 'react';
import { Socket } from 'socket.io-client';
import { useSocket } from '@/context/socketProvider';
import { connectToPeer,peers } from '@/helper/signalingLogic';
import VideoPlayer from './VideoPlayer';
import ToggleAudioVideo from './ToggleAudioVideo';


export default function MeetingRoom({roomid}:{roomid:string}) {
  const socketref = useRef<Socket | null>(null)
      const localstreamref = useRef<MediaStream | null>(null);
      const localvideoref = useRef<HTMLVideoElement>(null)
      const [otherVideo, setotherVideo] = useState<MediaStream[]>([]);
      const [videoMap,setvideoMap]=useState<Map<string,{video:MediaStream | undefined,audio:MediaStream | undefined}>>(new Map());
      const socket=useSocket();
      async function handlecallinit() {
          const connection = socket?.socket;
          if(!connection) return;
          socketref.current = connection;
          const stream = await navigator.mediaDevices.getUserMedia({ video: {
            facingMode:"user"
          }, audio: true });
          if (!stream) {
              console.log("stream not present");
              return;
          }
          localstreamref.current = stream;
          if (localvideoref.current) {
              console.log("this is my stream ", stream)
              localvideoref.current.srcObject = stream;
          }
          if (socketref.current) {
              socketref.current.emit("join-room", roomid)
          }
  
          socketref.current?.on("other-users", (otherUsersInTheRoom) => {
              console.log("these are the other users in the room : ", otherUsersInTheRoom)
              otherUsersInTheRoom.forEach(async (peerid: string) => {
                  if (!stream) return;
                  peers[peerid] = connectToPeer({ socket: socketref.current, peerid: peerid, localstream: stream, othervideo: otherVideo, setotheruservideo: setotherVideo,videoMap,setvideoMap });
                  console.log("creating an offer for ", peerid)
                  const offerforuser = await peers[peerid].createOffer();
                  await peers[peerid].setLocalDescription(offerforuser);
                  socketref.current?.emit("offer", { target: peerid, sdp: offerforuser });
              })
          })
          socketref.current?.on("user-joined", (userSocketId) => {
              console.log("user joined with id : ", userSocketId)
  
          })
  
  
          socketref.current?.on("answer", async ({ sender, sdp }: { sender: string, sdp: RTCSessionDescriptionInit }) => {
              await peers[sender].setRemoteDescription(new RTCSessionDescription(sdp));
          })
  
          socketref.current?.on("ice-candidates", async ({ sender, candidate }) => {
            console.log("ice candidates received : ",candidate," from : ",sender)
              if (candidate && peers[sender]) {
                  await peers[sender].addIceCandidate(candidate);
                  console.log("adding ice candidates")
              }
          })
  
          socketref.current?.on("offer", async ({ sender, sdp }: { sender: string, sdp: RTCSessionDescriptionInit }) => {
              console.log("i am ", socketref.current?.id, " and have received offer from ", sender)
              if (!stream) return;
              peers[sender] = connectToPeer({ socket: socketref.current, peerid: sender, localstream: stream, othervideo: otherVideo, setotheruservideo: setotherVideo ,videoMap,setvideoMap})
              await peers[sender].setRemoteDescription(new RTCSessionDescription(sdp));
  
              const answer = await peers[sender].createAnswer();
              await peers[sender].setLocalDescription(answer);
  
              socketref.current?.emit("answer", { target: sender, sdp: answer });
          })
  
          socketref.current?.on("user-left", (userSocketId: string) => {
              const newMap=new Map(videoMap);
              newMap.delete(userSocketId)
              setvideoMap(newMap);
              peers[userSocketId].close();
              delete peers[userSocketId];
          });
          return (() => {
              socketref.current?.disconnect();
          })
      }
      useEffect(() => {
          handlecallinit();
      }, [socket]);
      return (
          <div className='p-2 sm:p-4 md:p-6 lg:p-10 xl:p-14'>
              <div className='grid grid-cols-1 sm:grid-cols-3 grid-rows-2 gap-4 mx-auto'>
                  <video className='rounded-[14px] h-fit border-2 border-purple-600' ref={localvideoref} autoPlay playsInline muted />
                  {
                      Array.from(videoMap.entries()).map(([peerid,tracks])=>{
                          return(
                              tracks.video && <VideoPlayer video={tracks.video} key={peerid} audio={tracks.audio} />
                          )
                      })
                  }
              </div>
              <ToggleAudioVideo localstream={localstreamref.current}/>
          </div>
      )
}
