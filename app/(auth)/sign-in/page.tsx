'use client'
import { useAuth } from "@/context/authContext";
import { useTheme } from "@/context/themeContext"
import { FcGoogle } from "react-icons/fc";
import { Poppins } from 'next/font/google';

export const poppins = Poppins({
    subsets: ['latin'],
    weight: ['400', '500', '700'],
    variable: '--font-poppins',
});


export default function Page() {
    const {initGoogleSignin}=useAuth();
    const {colors}=useTheme();
    return (
        <div className={`w-full h-screen flex justify-center items-center ${poppins.className}`}>
            <section className="rounded-md ">
                <p className="text-2xl font-normal text-center pb-10">Login to Your Account</p>
                <div className="flex gap-5 px-10 py-3 rounded-xl font-bold text-xl cursor-pointer" style={{backgroundColor:colors.primary,color:colors.text}}
                    onClick={()=>initGoogleSignin()}
                >
                    <FcGoogle size={30}/>
                    <p className="text-white">SignIn With Gmail Account</p>
                </div>
            </section>
        </div>
    )
}