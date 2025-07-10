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
        !allUsersFetched ? (
            <CustomSizeLoader className="py-[200px]" />
        ) : (
            <main className="p-6 flex justify-center">
                <section className="w-full max-w-2xl">
                    <div
                        className="flex items-center gap-3 px-5 py-3 mb-4 rounded-full border border-gray-300 focus-within:ring-2 ring-blue-400 transition-all"
                        style={{ backgroundColor: colors.inputBackground }}
                    >
                        <IoIosSearch size={24} color={colors.textSecondary} />
                        <input
                            type="text"
                            className="w-full bg-transparent outline-none text-base placeholder:text-gray-500"
                            value={searchQuery}
                            onChange={(e) => setSearchQusery(e.target.value)}
                            placeholder="Search by username"
                        />
                    </div>
                    {searchQuery === '' ? (
                        <p className="text-sm text-gray-600 mb-4 font-medium">People you may know</p>
                    ) : (
                        <p className="text-sm text-gray-700 font-medium mb-4">
                            Search results for <span className="text-blue-600">{`"${searchQuery}"`}</span>
                        </p>
                    )}
                    <div className="flex flex-col gap-3">
                        {
                            filteredUsersAccordingToQuery.map((user, index) => (
                                <UserCard User={user} key={index} />
                            ))
                        }
                    </div>
                    {searchQuery !== '' && filteredUsersAccordingToQuery.length === 0 && (
                        <p className="text-center text-sm text-gray-500 italic mt-6">
                            No user found with this username.
                        </p>
                    )}
                </section>
            </main>
        )
    );



}