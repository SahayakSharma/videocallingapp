import { FunctionComponent } from "react"
import { Plus } from 'lucide-react';
type sidebarroutestype={
    label:string,
    route:string,
    icon:string
}


export const sidebarRoautes:sidebarroutestype[]=[
    {
        label:"Home",
        route:"/",
        icon:"/images/home.svg"
    },
    {
        label:"New Meeting",
        route:"/start-meeting",
        icon:"/images/new.svg"
    },
    {
        label:"Join Meeting",
        route:"/join-meeting",
        icon:"/images/headset.svg"
    },
    {
        label:"Schedule Meeting",
        route:"/schedule-meeting",
        icon:"/images/schedule.svg"
    },
    {
        label:"Recordings",
        route:"/recordings",
        icon:"/images/record.svg"
    },
]