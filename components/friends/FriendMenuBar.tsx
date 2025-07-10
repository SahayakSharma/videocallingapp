'use client'
import { useFriends } from "@/context/friendsContext";
import { useTheme } from "@/context/themeContext";
import { friendMenuBarContent } from "@/lib/Data"
import { IFriendMenuBarItem } from "@/types/friendsType";

export default function FriendMenuBar() {
    const { activeMenu, changeActiveMenu } = useFriends();
    const { colors } = useTheme();
    const { myRequests } = useFriends();
    return (
        <main className="w-full px-5 py-4 flex gap-6 border-b border-gray-300">
            {
                friendMenuBarContent.map((item: IFriendMenuBarItem) => {
                    const isActive = activeMenu === item.menuValue;

                    return (
                        <div
                            key={item.menuId}
                            onClick={() => changeActiveMenu(item.menuValue)}
                            className={`flex items-center gap-3 px-4 py-2 cursor-pointer transition-all duration-150 border-b-2 ${isActive
                                    ? 'border-blue-600 bg-blue-50 rounded-t-md'
                                    : 'border-transparent hover:bg-gray-100 rounded-md'
                                }`}
                        >
                            <item.menuIcon size={22} color={colors.text} />
                            <p className="text-base font-medium" style={{ color: colors.text }}>
                                {item.menuTitle}
                            </p>

                            {item.menuValue === "my-requests" && myRequests.receivedRequests.length > 0 && (
                                <div className="bg-red-600 min-w-[20px] h-[20px] px-1 flex items-center justify-center rounded-full text-white text-xs font-semibold">
                                    {myRequests.receivedRequests.length}
                                </div>
                            )}
                        </div>
                    );
                })
            }
        </main>
    );

}