import { FaUserFriends } from "react-icons/fa";
import { IFriendMenuBarItem } from "@/types/friendsType";
import { IoMdAdd,IoIosNotifications } from "react-icons/io";
import { FaCodePullRequest } from "react-icons/fa6";

export const friendMenuBarContent:IFriendMenuBarItem[]=[
    {
        menuId:1,
        menuTitle:"My Friends",
        menuValue:"my-friends",
        menuIcon:FaUserFriends
    },
    {
        menuId:2,
        menuTitle:"Add Friends",
        menuValue:"add-friends",
        menuIcon:IoMdAdd
    },
    {
        menuId:3,
        menuTitle:"My Requests",
        menuValue:"my-requests",
        menuIcon:FaCodePullRequest
    },
    {
        menuId:4,
        menuTitle:"Updates",
        menuValue:"updates",
        menuIcon:IoIosNotifications
    }
]