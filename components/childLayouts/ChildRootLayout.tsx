'use client'
import { useTheme } from "@/context/themeContext";
import { ReactNode } from "react";

export default function ChildRootLayout({children}:{children:ReactNode}){

    const {colors}=useTheme();

    return(
        <main style={{backgroundColor:colors.background}} className="w-full min-h-screen">
            {children}
        </main>
    )
}