'use client'
import { useFriends } from "@/context/friendsContext"
import MyFriends from "./menuItemsBody/MyFriends";
import AddFriends from "./menuItemsBody/AddFriends";
import MyRequets from "./menuItemsBody/MyRequests";
import Updates from "./menuItemsBody/Updates";

export default function FriendsBody(){

    const {activeMenu}=useFriends();

    switch(activeMenu){
        case "my-friends":
            return <MyFriends/>
        case "my-requests":
            return <MyRequets/>
        case "add-friends":
            return <AddFriends/>
        case "updates":
            return <Updates/>
    }
    return <p>Unknown Route</p>
}