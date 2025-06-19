'use client'
import { useFriends } from "@/context/friendsContext";
import { useTheme } from "@/context/themeContext";
import { friendMenuBarContent } from "@/lib/Data"
import { IFriendMenuBarItem } from "@/types/friendsType";

export default function FriendMenuBar(){
    const {activeMenu,changeActiveMenu}=useFriends();
    const {colors}=useTheme();
    return(
        <main className="w-full px-5 py-5 flex gap-10 ">
            {
                friendMenuBarContent.map((item:IFriendMenuBarItem)=>{
                    return(
                        <div key={item.menuId} style={{borderColor:activeMenu===item.menuValue ? colors.border : colors.surface}} className="flex gap-3 px-5 py-5 cursor-pointer items-center border-b-[1px]" onClick={()=>changeActiveMenu(item.menuValue)}>
                            <item.menuIcon size={25} color={colors.text}/>
                            <p className="text-xl" style={{color:colors.text}}>{item.menuTitle}</p>
                        </div>
                    )
                })
            }
        </main>
    )
}