import { useFriends } from "@/context/friendsContext";
import { useTheme } from "@/context/themeContext";
import { FaRegFrownOpen } from "react-icons/fa";
import ThemeButton from "@/components/customComponents/ThemeButton";

export function NoRequestsReceived() {
    const {colors}=useTheme();
    const {changeActiveMenu}=useFriends();
    return (
        <main className="w-full flex flex-col items-center gap-5 py-20">
            <FaRegFrownOpen size={50} color="red" />
            <p className="text-[15px] underline" style={{ color: colors.textSecondary }}>No requests received recently</p>
        </main>
    )
}


export function NoRequestSent() {
    const {colors}=useTheme();
    const {changeActiveMenu}=useFriends();
    return (
        <main className="w-full flex flex-col items-center gap-5 py-20">
            <FaRegFrownOpen size={50} color="red" />
            <p className="text-[15px] underline" style={{ color: colors.textSecondary }}>No requests sent recently</p>
             <ThemeButton text="Send Request" onClickAction={()=>{changeActiveMenu('add-friends')}}/>
        </main>
    )
}