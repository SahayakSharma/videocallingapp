'use client'
import { useAuth } from "@/context/authContext";
import { useTheme } from "@/context/themeContext"
import { FcGoogle } from "react-icons/fc";

export default function Page() {
    const {initGoogleSignin}=useAuth();
    const {colors}=useTheme();
    return (
        <div className='w-full h-screen flex justify-center items-center'>
            <section className="rounded-md ">
                <div className="flex gap-5 px-10 py-3 rounded-xl font-bold text-xl cursor-pointer" style={{backgroundColor:colors.primary,color:colors.text}}
                    onClick={()=>initGoogleSignin()}
                >
                    <FcGoogle size={30}/>
                    <p>SignIn With Gmail Account</p>
                </div>
            </section>
        </div>
    )
}