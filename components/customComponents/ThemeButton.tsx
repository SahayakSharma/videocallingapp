import { useTheme } from "@/context/themeContext"

export default function ThemeButton({onClickAction,text,className}:{onClickAction:()=>void,text:string,className?:string}){
    
    const {colors}=useTheme();

    return(
        <div className={`text-center rounded-md px-7 py-2 cursor-pointer ${className}`} style={{backgroundColor:colors.primary,color:colors.text}} onClick={onClickAction}>
            {text}
        </div>
    )
}