'use client'
import { createContext,useContext,useState,useEffect, ReactNode } from "react";
import { onAuthStateChanged, signInWithPopup, User } from "firebase/auth";
import { FirebaseConfig } from "@/config/fbconfig";
import CustomLoader from "@/components/CustomLoader";
import { GoogleAuthProvider } from "firebase/auth";



const GoogleProvider=new GoogleAuthProvider();

type IAuthContext={
    user:User|null,
    initGoogleSignin:()=>void,
    signOut:()=>void
}
const AuthContext=createContext<IAuthContext>({
    user:null,
    initGoogleSignin:()=>{throw new Error("using google signin outside provider")},
    signOut:()=>{throw new Error("using signout outside provider")}
})



export default function AuthProvider({children}:{children:ReactNode}){

    const [user,setUser]=useState<User|null>(null);
    const [loading,setLoading]=useState<boolean>(true);
    const instance=FirebaseConfig.getInstance();


    async function initGoogleSignin(){
        setLoading(true);
        signInWithPopup(instance.getAuth(),GoogleProvider)
        .catch(err=>{
            console.log("error while logging in with google",err)
        })
        .finally(()=>{
            setLoading(false);
        })
    }

    async function signOut(){
        await instance.getAuth().signOut().catch(err=>{
            console.log("error while signin out : ",err);
        })
    }


    useEffect(()=>{
        onAuthStateChanged(instance.getAuth(),(user)=>{
            if(user){
                setUser(user);
            }
            else{
                setUser(null);
            }
            setLoading(false);
        })  
    },[onAuthStateChanged])


    return(
        loading  ? <CustomLoader/> : 
        <AuthContext.Provider value={{user,initGoogleSignin,signOut}}>
            {children}
        </AuthContext.Provider>
    )
}



export function useAuth(){
    return useContext(AuthContext);
}