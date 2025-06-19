import { useTheme } from "@/context/themeContext";
import React from "react";
import { LuLoaderPinwheel } from "react-icons/lu";



export default function CustomLoader(){
    const {colors}=useTheme();
    return(
        <div className="w-full h-screen flex items-center justify-center" style={{backgroundColor:colors.background}}>
            <LuLoaderPinwheel color={colors.text} size={40} className="animate-spin"/>
        </div>
    )
}