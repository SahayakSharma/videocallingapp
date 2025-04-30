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
        color:"#BAD8B6",
        icon:"/images/plus.svg",
        route:"/start-meeting"
    },
    {
        title:"Join Meeting",
        description:"Join an ongoing meeting",
        color:"#FFECC8",
        icon:"/images/new.svg",
        route:"/join-meeting",
    },
    {
        title:"Schedule Meeting",
        color:"#FFD09B",
        description:"Schedule a meeting for later",
        icon:"/images/schedule.svg",
        route:"/schedule-meeting"
    },
    {
        title:"History",
        color:"#FFB0B0",
        description:"Monitor your meeting history",
        icon:"/images/history.svg",
        route:"/recordings"
    },
]