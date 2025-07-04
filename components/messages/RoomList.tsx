import { useAuth } from "@/context/authContext";
import { useMessages } from "@/context/messageContext";
import { useTheme } from "@/context/themeContext"
import Image from "next/image";
import { useSearchParams } from "next/navigation";

export default function RoomList() {
    const { colors } = useTheme();
    const { myRooms, activeRoom, changeActiveRoom } = useMessages();
    const active = useSearchParams();
    const { user } = useAuth();
    return (
        <div className="w-[30%] p-5 flex flex-col gap-2" style={{ backgroundColor: colors.chatBubbleSelf }}>
            {
                myRooms.map((room, index) => {
                    return (
                        <div className="rounded-md p-5 cursor-pointer border-[1px] flex gap-7 items-center" key={index} style={{ backgroundColor: activeRoom === room.id ? colors.primary : '', borderColor: colors.border }} onClick={() => changeActiveRoom(room.id)}>
                            {
                                room.room_type === 'one-to-one' ?
                                    room.participants_id[0] === user?.uid ?
                                        <Image src={room.participants_details[room.participants_id[1]].photo_url} alt="image here" width={70} height={70} className="rounded-full" /> :
                                        <Image src={room.participants_details[room.participants_id[0]].photo_url} alt="image here" width={70} height={70} className="rounded-full" />
                                    : null
                            }
                            <div>
                                <p className="font-bold text-xl" style={{ color: colors.text }}>{
                                    room.room_type === 'one-to-one' ?
                                        room.participants_id[0] === user?.uid ?
                                            room.participants_details[room.participants_id[1]].full_name :
                                            room.participants_details[room.participants_id[0]].full_name :
                                        room.room_name
                                }</p>
                                <p className="font-light" style={{ color: colors.text }}>
                                    {
                                        room.room_type === 'one-to-one' ?
                                            room.participants_id[0] === user?.uid ?
                                                room.participants_details[room.participants_id[1]].gender :
                                                room.participants_details[room.participants_id[0]].gender :
                                            'Group'
                                    }
                                </p>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}