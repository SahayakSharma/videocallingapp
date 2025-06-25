import { IconType } from "react-icons";
import { FaUserFriends } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { SiGooglemeet } from "react-icons/si";
import { FaCamera } from "react-icons/fa6";
import { BsCalendar2Date } from "react-icons/bs";
import { PiRecordFill } from "react-icons/pi";
import { FaMessage } from "react-icons/fa6";
type sidebarroutestype={
    label:string,
    route:string,
    icon:string,
    reactIcon:IconType
}


export const sidebarRoautes:sidebarroutestype[]=[
    {
        label:"Home",
        route:"/",
        icon:"/images/home.svg",
        reactIcon:FaHome
    },
    {
        label:"Messages",
        route:"/messages",
        icon:"/images/schedule.svg",
        reactIcon:FaMessage
    },
    {
        label:"New Meeting",
        route:"/start-meeting",
        icon:"/images/new.svg",
        reactIcon:SiGooglemeet
    },
    {
        label:"Join Meeting",
        route:"/join-meeting",
        icon:"/images/headset.svg",
        reactIcon:FaCamera
    },
    {
        label:"Social",
        route:"/friends",
        icon:"/images/schedule.svg",
        reactIcon:FaUserFriends
    },
    {
        label:"Schedule Meet",
        route:"/schedule-meeting",
        icon:"/images/schedule.svg",
        reactIcon:BsCalendar2Date
    },
    {
        label:"Recordings",
        route:"/recordings",
        icon:"/images/record.svg",
        reactIcon:PiRecordFill
    },
]