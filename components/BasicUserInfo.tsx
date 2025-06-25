import { useTheme } from "@/context/themeContext";
import TextInput from "./customComponents/TextInput";
import Label from "./customComponents/Label";
import { useState } from "react";
import ThemeButton from "./customComponents/ThemeButton";
import { IoMdMale,IoMdFemale,IoMdTransgender } from "react-icons/io";
import { useUser } from "@/context/UserContext";
import { useAuth } from "@/context/authContext";
type IUserInfo = {
    fullName: string,
    dob: Date,
    phoneNumber: string,
    gender:string
}

export default function BasicUserInfo({userDetailsInit}:{userDetailsInit:({fullName,dob,phoneNumber,gender}:{fullName:string,dob:Date,phoneNumber:string,gender:string})=>void}) {


    const { colors } = useTheme();
    const [userInfo, setUserInfo] = useState<IUserInfo>({
        fullName: '',
        dob: new Date(),
        phoneNumber: '',
        gender:''
    })
    const {signOut}=useAuth();
    async function handleSubmitDetails(){
        userDetailsInit({fullName:userInfo.fullName,dob:userInfo.dob,phoneNumber:userInfo.phoneNumber,gender:userInfo.gender});
    }
    
    return (
        <main className="w-full h-screen flex items-center justify-center flex-col" style={{ backgroundColor: colors.background }}>
            <div className="w-[80%] md:w-[30%]">
                <Label text="Full Name" className="text-[15px]" />
                <TextInput onChangeAction={(e) => { setUserInfo(prev => ({ ...prev, fullName: e.target.value })) }} placeholder="John Doe" className="w-full" value={userInfo.fullName} />
                <Label text="D.O.B" className="text-[15px]" />
                <TextInput onChangeAction={(e) => { setUserInfo(prev => ({ ...prev, dob: new Date(e.target.value) })) }} className="w-full" type="date" value={userInfo.dob.toISOString().split('T')[0]} />
                <Label text="Phone Number" className="text-[15px]" />
                <TextInput onChangeAction={(e) => { setUserInfo(prev => ({ ...prev, phoneNumber: e.target.value })) }} className="w-full" type="number" value={userInfo.phoneNumber} placeholder="+91 "/>
                <Label text="Select Gender" className="text-[15px]"/>
                <div className="w-full flex justify-around py-5" style={{color:colors.text}}>
                    <div className="w-[80px] h-[80px] flex flex-col gap-1 justify-center items-center rounded-md border-[1px]" style={{backgroundColor:colors.inputBackground,borderWidth:userInfo.gender==='Male' ? 1:0}} onClick={()=>setUserInfo(prev=>({...prev,gender:'Male'}))}>
                        <IoMdMale size={20}/>
                        <p className="text-[15px] font-medium">Male</p>
                    </div>
                    <div className="w-[80px] h-[80px] flex flex-col gap-1 justify-center items-center rounded-md border-[1px]" style={{backgroundColor:colors.inputBackground,borderWidth:userInfo.gender==='Female' ? 1:0}} onClick={()=>setUserInfo(prev=>({...prev,gender:'Female'}))}>
                        <IoMdFemale size={20}/>
                        <p className="text-[15px] font-medium">Female</p>
                    </div>
                    <div className="w-[80px] h-[80px] flex flex-col gap-1 justify-center items-center rounded-md border-[1px]" style={{backgroundColor:colors.inputBackground,borderWidth:userInfo.gender==='Others' ? 1:0}} onClick={()=>setUserInfo(prev=>({...prev,gender:'Others'}))}>
                        <IoMdTransgender size={20}/>
                        <p className="text-[15px] font-medium">Others</p>
                    </div>
                </div>
                <ThemeButton text="Submit Details" onClickAction={handleSubmitDetails} className="font-medium text-xl my-10"/>
                <p className="text-[12px] underline text-center cursor-pointer" onClick={signOut} style={{color:colors.textSecondary}}>Switch Account</p>
            </div>
        </main>
    )
}