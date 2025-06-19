'use client'
import { FirestoreConfig } from "@/config/firestoreConfig";
import { collection, DocumentData, getDocs, query, where } from "firebase/firestore";
import { createContext,useContext,useState,useEffect, ReactNode } from "react";
import { useAuth } from "./authContext";



type IFriendContext={
    activeMenu:string,
    changeActiveMenu:(menuTitle:string)=>void,
    allUsersFetched:boolean,
    allUsers:DocumentData[]
}
const FriendsContext=createContext<IFriendContext>({
    activeMenu:'my-friends',
    changeActiveMenu:()=>{throw new Error("function invoked outside provider")},
    allUsersFetched:false,
    allUsers:[]
});

export function FriendsProvider({children}:{children:ReactNode}){
    
    const [activeMenu,setActiveMenu]=useState<string>('my-friends');
    const [allUsersFetched,setAllUsersFetched]=useState<boolean>(false);
    const [allUsers,setAllUsers]=useState<DocumentData[]>([]);
    const {user}=useAuth();

    async function getAllUsers(){
        const instance=FirestoreConfig.getInstance();
        try{
            const userQuery=query(collection(instance.getDb(),'Users'));
            const usersSnap=await getDocs(userQuery);
            const allUsersOtherThanMe=usersSnap.docs.filter(doc=>doc.id!=user?.uid);
            setAllUsers(allUsersOtherThanMe);
            setAllUsersFetched(true);
        }
        catch(err){ 
            console.log("error while fetching all users",err)
        }
    }
    function changeActiveMenu(menuValue:string){
        setActiveMenu(menuValue);
    }

    useEffect(()=>{
        if(user){
            getAllUsers();
        }
    },[user])
    
    return(
        <FriendsContext.Provider value={{activeMenu,changeActiveMenu,allUsersFetched,allUsers}}>
            {children}
        </FriendsContext.Provider>
    )
}

export function useFriends(){
    return useContext(FriendsContext);
}