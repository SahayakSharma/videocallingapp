'use client'
import { useTheme } from "@/context/themeContext"
import { LuLoaderPinwheel } from "react-icons/lu"

export default function CustomSizeLoader({className}:{className?:string}) {
    const {colors}=useTheme();
    return (
        <div className={`w-full flex items-center justify-center ${className}`}>
            <LuLoaderPinwheel color={colors.text} size={40} className="animate-spin" />
        </div>
    )
}