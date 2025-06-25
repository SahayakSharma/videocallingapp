import CustomSizeLoader from "@/components/customComponents/CustomSizeLoader";
import Label from "@/components/customComponents/Label";
import { useFriends } from "@/context/friendsContext"
import { DocumentData } from "firebase/firestore";
import { useMemo, useState } from "react";
import UserCard from "./UserCard";
import { IoIosSearch } from "react-icons/io";
import { useTheme } from "@/context/themeContext";
export default function AddFriends() {

    const { colors } = useTheme();
    const { allUsers, allUsersFetched } = useFriends();
    const [searchQuery, setSearchQusery] = useState<string>('');
    const filteredUsersAccordingToQuery: DocumentData[] = useMemo(() => {
        if (!allUsersFetched || searchQuery == '') return [];
        const filtered = allUsers.filter(user => user.full_name.toLowerCase().includes(searchQuery.toLowerCase()));
        return filtered.slice(0, 5);
    }, [searchQuery, allUsers])

    return (
        !allUsersFetched ? <CustomSizeLoader className="py-[200px]" /> :
            <main className="p-10">
                <section className="w-[50%]">
                    <div className="flex px-5 py-3 rounded-3xl gap-3 items-center" style={{ backgroundColor: colors.inputBackground }}>
                        <IoIosSearch size={30} color={colors.textSecondary}/>
                        <input type="text" className="w-full outline-none text-xl font-light text-[15px] placeholder:capitalize" value={searchQuery} onChange={(e) => setSearchQusery(e.target.value)} placeholder="search by username"/>
                    </div>
                    <div className="py-5 flex flex-col gap-2">
                        {
                            filteredUsersAccordingToQuery.map((user, index) => {
                                return (
                                    <UserCard User={user} key={index} />
                                )
                            })
                        }
                    </div>
                    {
                        searchQuery!='' && filteredUsersAccordingToQuery.length==0 && <p className="text-center underline">No user found with this username</p>
                    }
                </section>
            </main>
    )
}