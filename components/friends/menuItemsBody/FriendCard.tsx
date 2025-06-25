import { useAuth } from "@/context/authContext";
import { useTheme } from "@/context/themeContext";
import { DocumentData } from "firebase/firestore";
import { BsPersonCircle } from "react-icons/bs";
import { LuMessageSquareMore } from "react-icons/lu";
import { MdReportGmailerrorred } from "react-icons/md";
export default function FriendCard({ friend }: { friend: DocumentData }) {
    const { colors } = useTheme();
    const { user } = useAuth();

    return (
        <div className="p-5 rounded-md flex items-center justify-between " style={{ backgroundColor: colors.inputBackground, color: colors.text }}>
            <div className="flex gap-5 items-center">
                <BsPersonCircle size={50} color={colors.text}/>
                {
                    friend.friends_id[0] === user?.uid ? <div>
                        <p className="font-medium text-[20px]">{friend.friends_details[friend.friends_id[1]].full_name}</p>
                        <p className="font-medium text-[13px]" style={{ color: colors.secondary }}>{friend.friends_details[friend.friends_id[1]].gender}</p>
                    </div> :
                        <div>
                            <p className="font-medium text-[20px]">{friend.friends_details[friend.friends_id[0]].full_name}</p>
                            <p className="font-medium text-[13px]" style={{ color: colors.secondary }}>{friend.friends_details[friend.friends_id[0]].gender}</p>
                        </div>
                }
            </div>
            <div className="flex gap-10">
                <LuMessageSquareMore size={40} color="green" className="cursor-pointer" title="Message"/>
                <MdReportGmailerrorred size={40} color="orange" className="cursor-pointer" title="Block & Report"/>
            </div>
        </div>
    )
}