import { useTheme } from "@/context/themeContext";
import { useUser } from "@/context/UserContext"
import NoFriends from "./NoFriends";

export default function MyFriends(){

    const {userDetails}=useUser();
    const {colors}=useTheme();
    return(
        <main className="p-10">
            {userDetails?.friends?.length > 0 ? <p>asdf</p>:<NoFriends/>}
        </main>
    )
}