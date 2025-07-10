import { useTheme } from "@/context/themeContext";
import { toJsDate } from "@/helper/time";
import { DocumentData } from "firebase/firestore";
import Image from "next/image";

export default function SystemMessage({ message }: { message: DocumentData }) {
    const { colors } = useTheme();

    return (
        <div className="w-fit mx-auto text-center font-light space-y-1">
            <p className="text-[10px] text-gray-400">
                {toJsDate(message.crated_at).toISOString().slice(0, 10)}
            </p>
            <p
                className="inline-block px-3 py-1 text-[12px] rounded-full shadow-sm"
                style={{
                    backgroundColor: colors.inputBackground,
                    color: colors.text,
                }}
            >
                {message.payload}
            </p>
        </div>
    );
}


export function SentByMe({ message }: { message: DocumentData }) {
    const { colors } = useTheme();

    return (
        <div className="flex w-full justify-end my-3 items-end gap-2">
            <div
                className="max-w-[60%] px-4 py-2 rounded-xl shadow-sm"
                style={{
                    backgroundColor: colors.chatBubbleSelf,
                    color: colors.text,
                    borderTopRightRadius: 4,
                }}
            >
                <p className="text-[15px] leading-snug break-words">{message.payload}</p>
                <p className="text-[10px] text-gray-400 text-right mt-1">
                    {toJsDate(message.crated_at).toISOString().slice(11, 16)}
                </p>
            </div>

            <Image
                src={message.sender_details.photo_url}
                alt="Sender Avatar"
                width={25}
                height={25}
                className="rounded-full w-[30px] h-[30px] object-cover border border-gray-300"
            />
        </div>
    );
}


export function ReceivedByMe({ message }: { message: DocumentData }) {
    const { colors } = useTheme();

    return (
        <div className="flex w-full justify-start my-3 items-end gap-2">
            <div
                className="max-w-[60%] px-4 py-2 rounded-xl shadow-sm"
                style={{
                    backgroundColor: colors.chatBubbleOther,
                    color: colors.text,
                    borderTopLeftRadius: 4,
                }}
            >
                <p className="text-[15px] leading-snug break-words">{message.payload}</p>
                <p className="text-[10px] text-gray-400 text-right mt-1">
                    {toJsDate(message.crated_at).toISOString().slice(11, 16)}
                </p>
            </div>

            <Image
                src={message.sender_details.photo_url}
                alt="Sender Avatar"
                width={25}
                height={25}
                className="rounded-full w-[30px] h-[30px] object-cover border border-gray-300"
            />
        </div>
    );
}