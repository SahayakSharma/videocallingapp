type homecardtype={
    title:string,
    description:string,
    color:string,
    icon:string,
    route:string
}


export const homeCards:homecardtype[]=[
    {
        title:"New Meeting",
        description:"Start an instant meeting",
        color:"#8cb369",
        icon:"/images/plus.svg",
        route:"/start-meeting"
    },
    {
        title:"Join Meeting",
        description:"Join an ongoing meeting",
        color:"#2196f3",
        icon:"/images/new.svg",
        route:"/join-meeting",
    },
    {
        title:"Schedule Meeting",
        color:"#e26d5c",
        description:"Schedule a meeting for later",
        icon:"/images/schedule.svg",
        route:"/schedule-meeting"
    },
    {
        title:"History",
        color:"#fb6107",
        description:"Monitor your meeting history",
        icon:"/images/history.svg",
        route:"/recordings"
    },
]