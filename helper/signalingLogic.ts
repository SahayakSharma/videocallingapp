import { Socket } from "socket.io-client";
import { Dispatch, SetStateAction } from "react";

export const peers: Record<string, RTCPeerConnection> = {};
const ICE_SERVERS = { iceServers: [{ urls: "stun:stun.l.google.com:19302" }] };

export function connectToPeer({ socket, peerid, localstream, othervideo, setotheruservideo,videoMap,setvideoMap }: { socket: Socket | null, peerid: string, othervideo: MediaStream[], localstream: MediaStream, setotheruservideo: Dispatch<SetStateAction<MediaStream[]>>,videoMap:Map<string,{video:MediaStream | undefined,audio:MediaStream | undefined}>,setvideoMap:Dispatch<SetStateAction<Map<string,{video:MediaStream | undefined,audio:MediaStream | undefined}>>> }): RTCPeerConnection {
    if (socket === null) throw new Error("not connected")
    const pc = new RTCPeerConnection();

    localstream.getTracks().forEach((track)=>{
        pc.addTrack(track,localstream);
    })

    pc.onicecandidate = e => {
        if (e.candidate) {
            socket.emit("ice-candidates", { target: peerid, candidate: e.candidate });
        }
    }

    pc.ontrack = (event) => {
        const newtrack=new MediaStream([event.track]);
        setotheruservideo((prev)=>([...prev,newtrack]))
        const newMap=videoMap;
        const prevtrack=videoMap.get(peerid);
        const prevAudioTrack=prevtrack?.audio;
        const prevVideoTrack=prevtrack?.video;
        if(event.track.kind==="video"){
            newMap.set(peerid,{
                video:newtrack,
                audio:prevAudioTrack
            })
        }
        else if(event.track.kind==="audio"){
            newMap.set(peerid,{
                video:prevVideoTrack,
                audio:newtrack
            })
        }
        setvideoMap(newMap);
    }

    return pc;
}