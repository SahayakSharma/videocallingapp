import { useTheme } from "@/context/themeContext"

export default function Label({text,className}:{text:string,className?:string}){
    const {colors}=useTheme();
    return(
        <p style={{color:colors.text}} className={`px-2 font-medium pt-10 pb-2 ${className}`}>{text}</p>
    )
}