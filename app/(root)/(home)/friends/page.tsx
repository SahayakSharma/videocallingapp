import FriendMenuBar from "@/components/friends/FriendMenuBar";
import FriendsBody from "@/components/friends/FriendsBody";
import { FriendsProvider } from "@/context/friendsContext";

export default function Friends() {
    return (
        <FriendsProvider>
            <div>
                <FriendMenuBar/>
                <FriendsBody/>
            </div>
        </FriendsProvider>
    )
}