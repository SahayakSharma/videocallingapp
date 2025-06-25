'use client'
import { useFriends } from "@/context/friendsContext";
import { useTheme } from "@/context/themeContext";
import { friendMenuBarContent } from "@/lib/Data"
import { IFriendMenuBarItem } from "@/types/friendsType";

export default function FriendMenuBar(){
    const {activeMenu,changeActiveMenu}=useFriends();
    const {colors}=useTheme();
    const {myRequests}=useFriends();
    return(
        <main className="w-full px-5 py-5 flex gap-10 ">
            {
                friendMenuBarContent.map((item:IFriendMenuBarItem)=>{
                    return(
                        <div key={item.menuId} style={{borderColor:activeMenu===item.menuValue ? colors.border : colors.surface}} className="flex gap-3 px-5 py-5 cursor-pointer items-center border-b-[1px]" onClick={()=>changeActiveMenu(item.menuValue)}>
                            <item.menuIcon size={25} color={colors.text}/>
                            <p className="text-xl" style={{color:colors.text}}>{item.menuTitle}</p>
                            {
                                item.menuValue==="my-requests" && myRequests.receivedRequests.length > 0 && <div className="bg-red-600 w-[20px] h-[20px] flex items-center justify-center rounded-full text-white text-[13px] font-bold">{myRequests.receivedRequests.length}</div>
                            }
                        </div>
                    )
                })
            }
        </main>
    )
}