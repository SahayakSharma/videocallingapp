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
                return friend.person_one_details?.full_name.toLowerCase().includes(searchQuery);
            }
        })
    }, [searchQuery, myFriends])


    return (
        !myFriendsFetched ? (
            <CustomSizeLoader className="py-52" />
        ) : (
            <main className="p-6 flex justify-center">
                <div className="w-full max-w-2xl">
                    <div
                        className="flex items-center gap-3 px-5 py-3 mb-8 rounded-full border border-gray-300 focus-within:ring-2 ring-blue-400 transition-all"
                        style={{ backgroundColor: colors.inputBackground }}
                    >
                        <IoIosSearch size={24} color={colors.textSecondary} />
                        <input
                            type="text"
                            className="w-full bg-transparent outline-none text-base placeholder:text-gray-500"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search by username"
                        />
                    </div>

                    <div className="flex flex-col gap-4">
                        {
                            myFriends.length === 0 ? (
                                <NoFriends />
                            ) : filteredFriends.length === 0 ? (
                                <p className="text-center text-sm text-gray-500 italic">
                                    No friends found with this name.
                                </p>
                            ) : (
                                filteredFriends.map((friend, index) => (
                                    <FriendCard friend={friend} key={index} />
                                ))
                            )
                        }
                    </div>
                </div>
            </main>
        )
    );

}