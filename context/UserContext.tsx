
'use client'
import BasicUserInfo from "@/components/BasicUserInfo";
import CustomLoader from "@/components/CustomLoader";
import { FirestoreConfig } from "@/config/firestoreConfig";
import { collection, doc, DocumentData, getDoc, query, serverTimestamp, setDoc, where } from "firebase/firestore";
import { createContext,useContext,useState,useEffect, ReactNode } from "react";
import { useAuth } from "./authContext";
import { userDetailsValidator } from "@/helper/Validator";



type IUserContext={
    userDetails:DocumentData,
}

const UserContext=createContext<IUserContext>({
    userDetails:{},
})


export function UserProvider({children}:{children:ReactNode}){

    const [userDetails,setUserDetails]=useState<DocumentData>({});
    const [loading,setLoading]=useState<boolean>(true);
    const [recordNotSet,setRecordNotSet]=useState<boolean>(false);
    const {user}=useAuth();

    async function getUserInfo(){
        try{
            if(!user) return;
            setLoading(true);
            const instance=FirestoreConfig.getInstance();
            const docRef=doc(instance.getDb(),'Users',user.uid);
            const docSnap=await getDoc(docRef);
            if(!docSnap.exists()) setRecordNotSet(true);
            else{
                setUserDetails(docSnap.data());
            }
            setLoading(false);
        }
        catch(err){
            console.log("error while fetching user.")
        }
    }
    async function userDetailsInit({fullName,dob,phoneNumber,gender}:{fullName:string,dob:Date,phoneNumber:string,gender:string}){
        setLoading(true);
        if(!user || !user.uid) return;

        const instance=FirestoreConfig.getInstance();
        const payload={
            full_name:fullName,
            dob:dob,
            phone_number:phoneNumber,
            gender:gender,
            email:user?.email,
            created_at:serverTimestamp(),
            updated_at:serverTimestamp(),
        }
        try{
            userDetailsValidator({fullName,dob,gender,phoneNumber});
            await setDoc(doc(instance.getDb(),'Users',user?.uid),payload);
            setUserDetails(payload);
            setRecordNotSet(false);
        }
        catch(err){
            console.log("error while setting user details : ",err);
        }
        finally{
            setLoading(false);
        }
        
    }
    useEffect(()=>{
        if(user) getUserInfo();
    },[user])
    return(
        loading ? <CustomLoader/> : 
        recordNotSet ? <BasicUserInfo userDetailsInit={userDetailsInit}/> : 
        <UserContext.Provider value={{userDetails}}>
            {children}
        </UserContext.Provider>
    )
}


export function useUser(){
    return useContext(UserContext);
}