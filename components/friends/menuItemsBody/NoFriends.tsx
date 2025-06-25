import ThemeButton from "@/components/customComponents/ThemeButton";
import { useFriends } from "@/context/friendsContext";
import { useTheme } from "@/context/themeContext";
import { FaRegFrownOpen } from "react-icons/fa";


export default function NoFriends(){
    const {colors}=useTheme();
    const {changeActiveMenu}=useFriends();

    return(
        <main className="w-full flex flex-col items-center gap-5 py-20">
            <FaRegFrownOpen size={50} color="red"/>
            <p className="text-[15px] underline" style={{color:colors.textSecondary}}>You do not have any friends added to your friend list for now</p>
            <ThemeButton text="Find A Friend" onClickAction={()=>{changeActiveMenu('add-friends')}}/>
        </main>
    )
}