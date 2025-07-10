import { useAuth } from "@/context/authContext";
import { useMessages } from "@/context/messageContext";
import { useTheme } from "@/context/themeContext";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

export default function RoomList() {
    const { colors } = useTheme();
    const { myRooms, activeRoom, changeActiveRoom } = useMessages();
    const active = useSearchParams();
    const { user } = useAuth();

    return (
        <div
            className="w-[30%] p-5 flex flex-col gap-4 overflow-y-auto"
            style={{ backgroundColor: colors.chatBubbleSelf }}
        >
            {
                myRooms.map((room, index) => {
                    const isActive = activeRoom === room.id;
                    const isOneToOne = room.room_type === 'one-to-one';
                    const otherUserId = isOneToOne && room.participants_id.find((id:string) => id !== user?.uid);
                    const otherUser = isOneToOne && otherUserId ? room.participants_details[otherUserId] : null;

                    return (
                        <div
                            key={index}
                            onClick={() => changeActiveRoom(room.id)}
                            className={`rounded-lg px-4 py-3 cursor-pointer flex gap-4 items-center border transition-all duration-200 ${
                                isActive ? 'shadow-md scale-[1.02]' : 'hover:scale-[1.01]'
                            }`}
                            style={{
                                backgroundColor: isActive ? colors.primary : '',
                                borderColor: colors.border,
                            }}
                        >
                            {
                                isOneToOne && otherUser && (
                                    <Image
                                        src={otherUser.photo_url}
                                        alt="User Avatar"
                                        width={60}
                                        height={60}
                                        className="rounded-full ring-2 ring-gray-200"
                                    />
                                )
                            }

                            <div className="flex flex-col justify-center">
                                <p
                                    className="font-semibold text-lg leading-tight"
                                    style={{ color: colors.text }}
                                >
                                    {
                                        isOneToOne && otherUser ? otherUser.full_name : room.room_name
                                    }
                                </p>
                                <p
                                    className="text-sm text-gray-500"
                                    style={{ color: colors.text }}
                                >
                                    {
                                        isOneToOne && otherUser ? otherUser.gender : 'Group'
                                    }
                                </p>
                            </div>
                        </div>
                    );
                })
            }
        </div>
    );
}
