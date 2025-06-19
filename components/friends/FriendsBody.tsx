'use client'
import { useFriends } from "@/context/friendsContext"
import MyFriends from "./menuItemsBody/MyFriends";
import AddFriends from "./menuItemsBody/AddFriends";

export default function FriendsBody(){

    const {activeMenu}=useFriends();

    switch(activeMenu){
        case "my-friends":
            return <MyFriends/>
        case "my-requests":
            return <p>These are my requests</p>
        case "add-friends":
            return <AddFriends/>
        case "updates":
            return <p>These are updates</p>
    }
    return <p>Unknown Route</p>
}