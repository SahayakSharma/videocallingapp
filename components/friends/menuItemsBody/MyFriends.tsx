import { useTheme } from "@/context/themeContext";
import { useUser } from "@/context/UserContext"
import NoFriends from "./NoFriends";
import { useMemo, useState } from "react";
import { useFriends } from "@/context/friendsContext";
import CustomSizeLoader from "@/components/customComponents/CustomSizeLoader";
import FriendCard from "./FriendCard";
import { useAuth } from "@/context/authContext";
import { IoIosSearch } from "react-icons/io";

export default function MyFriends() {

    const { userDetails } = useUser();
    const { colors } = useTheme();
    const { user } = useAuth();
    const { myFriends, myFriendsFetched } = useFriends();
    const [searchQuery, setSearchQuery] = useState<string>('');

    const filteredFriends = useMemo(() => {
        return myFriends.filter(friend => {
            if (searchQuery == '') return true;
            if (friend.person_one_id === user?.uid) {
                return friend.person_two_details.full_name.toLowerCase().includes(searchQuery);
            }
            else {
                return friend.person_one_details.full_name.toLowerCase().includes(searchQuery);
            }
        })
    }, [searchQuery, myFriends])


    return (
        !myFriendsFetched ? <CustomSizeLoader className="py-52" /> :
            <main className="p-10">
                <div className="w-[50%]">
                    <div className="flex px-5 py-3 rounded-3xl gap-3 items-center mb-10" style={{ backgroundColor: colors.inputBackground }}>
                        <IoIosSearch size={30} color={colors.textSecondary} />
                        <input type="text" className="w-full outline-none text-xl font-light text-[15px] placeholder:capitalize" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="search by username"/>
                    </div>
                    {   myFriends.length===0 ? <NoFriends/> : 
                        filteredFriends.length===0 ? <p className="text-center underline text-[13px]">No friends to show with this username</p> : 
                        filteredFriends.map((friend, index) => {
                            return <FriendCard friend={friend} key={index} />
                        })
                    }
                </div>
            </main>
    )
}