import { useTheme } from "@/context/themeContext"
import { ChangeEvent } from "react";

export default function TextInput({placeholder,className,onChangeAction,type,value}:{placeholder?:string,className?:string,onChangeAction:(e:ChangeEvent<HTMLInputElement>)=>void,type?:string,value:any}){
    const {colors}=useTheme();

    return(
        <input type={type || 'text'} placeholder={placeholder} style={{backgroundColor:colors.inputBackground,color:colors.text,outlineColor:colors.border}} className={`px-7 py-3 rounded-md ${className}`} onChange={(e)=>onChangeAction(e)} value={value}/>
    )
}