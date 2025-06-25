'use client'
import { darkThemeColors, lightThemeColors } from "@/lib/themeColors";
import { createContext,ReactNode,useContext,useEffect,useState } from "react";



type IThemeContext={
    colors:typeof darkThemeColors| typeof lightThemeColors,
    toggleTheme:()=>void
}
const ThemeContext=createContext<IThemeContext>({
    colors:lightThemeColors,
    toggleTheme:()=>{}
})


export function ThemeProvider({children}:{children:ReactNode}){
    const [colors,setColors]=useState<typeof darkThemeColors| typeof lightThemeColors>(lightThemeColors);

    function toggleTheme(){
        if(colors===darkThemeColors) setColors(lightThemeColors);
        else setColors(darkThemeColors);
    }
    return(
        <ThemeContext.Provider value={{colors,toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}


export function useTheme(){
    return useContext(ThemeContext)
}