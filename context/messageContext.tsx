'use client'
import { FirestoreConfig } from "@/config/firestoreConfig";
import { collection, DocumentData, Firestore, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { createContext,useContext,useState,useEffect, ReactNode } from "react";
import { useAuth } from "./authContext";


type IMessageContext={
    myRooms:DocumentData[],
    myRoomsFetched:boolean,
    activeRoom:string,
    changeActiveRoom:(roomId:string)=>void
}

const MessageContext=createContext<IMessageContext>({
    myRooms:[],
    myRoomsFetched:false,
    activeRoom:'',
    changeActiveRoom:()=>{throw new Error("function called outside provider")}
});


export function MessageProvider({children}:{children:ReactNode}){
    const [myRooms,setMyRooms]=useState<DocumentData[]>([]);
    const [myRoomsFetched,setMyRoomsFetched]=useState<boolean>(false);
    const [activeRoom,setActiveRoom]=useState<string>('');
    const {user}=useAuth();

    async function getMyRooms() {
        const instance=FirestoreConfig.getInstance();
        try{
            const roomSnap=await getDocs(query(collection(instance.getDb(),'Rooms'),where('participants_id','array-contains',user?.uid)));
            const rooms:DocumentData[]=[];
            roomSnap.docs.map(doc=>rooms.push({id:doc.id,...doc.data()}));
            setMyRooms(rooms);
            setMyRoomsFetched(true);
        }
        catch(err){
            console.log("error while fetching rooms")
        }
    }

    function changeActiveRoom(roomId:string){
        setActiveRoom(roomId);
    }
    useEffect(()=>{
        const instance=FirestoreConfig.getInstance();
        getMyRooms();
        const unsubscribe=onSnapshot(query(collection(instance.getDb(),'Rooms'),where('participants_id','array-contains',user?.uid)),(data)=>{
            data.docChanges().forEach((change)=>{
                if(change.type==="added" && myRoomsFetched){
                    const redundency=myRooms.some(a=>a.id===change.doc.id);
                    if(!redundency){
                        setMyRooms(prev=>([...prev,{id:change.doc.id,...change.doc.data()}]));
                    }
                }
            })
        })
        return(()=>{
            unsubscribe();
        })
    },[])
    return(
        <MessageContext.Provider value={{myRooms,myRoomsFetched,activeRoom,changeActiveRoom}}>
            {children}
        </MessageContext.Provider>
    )
}


export function useMessages(){
    return useContext(MessageContext);
}