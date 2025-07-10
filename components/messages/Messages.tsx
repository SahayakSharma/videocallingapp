import { FirestoreConfig } from "@/config/firestoreConfig";
import { useMessages } from "@/context/messageContext"
import { collection, doc, DocumentData, getDoc, getDocs, limit, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import SystemMessage, { ReceivedByMe, SentByMe } from "./IndividualMessage";
import { LuMessagesSquare } from "react-icons/lu";
import SendMessage from "./SendMessage";
import { addDoc, serverTimestamp } from "firebase/firestore";
import { useAuth } from "@/context/authContext";
import { useUser } from "@/context/UserContext";
import { Poppins } from 'next/font/google';
import Image from "next/image";
import { TbLoader3 } from "react-icons/tb";

export const poppins = Poppins({
    subsets: ['latin'],
    weight: ['400', '500', '700'],
    variable: '--font-poppins',
});


export default function Messages() {
    const [loading, setLoading] = useState<boolean>(true)
    const { activeRoom } = useMessages();
    const [roomMessages, setRoomMessages] = useState<DocumentData[]>([]);
    const [roomDetails, setRoomDetails] = useState<DocumentData>()
    const [roomDetailsFetched, setRoomDetailsFetched] = useState<boolean>(false)
    const [message, setMessage] = useState<string>('');
    const { user } = useAuth();
    const { userDetails } = useUser();
    const bottomRef = useRef<HTMLDivElement>(null);
    const loadingRef = useRef<boolean>(null);
    const listenOnRoomsRef = useRef<() => void>(() => { })
    async function handleSendMessage() {
        if (message == '') return;
        const instance = FirestoreConfig.getInstance();
        try {
            const payload = {
                room_id: activeRoom,
                sent_by: user?.uid,
                type: "user_generated",
                payload: message,
                created_at: serverTimestamp(),
                sender_details: {
                    full_name: userDetails.full_name,
                    gender: userDetails.gender,
                    photo_url: user?.photoURL
                }
            }
            const newMsgRef = await addDoc(collection(instance.getDb(), 'Messages'), payload)
            setMessage('')
        }
        catch (err) {
            console.log("error occured while sending message", err);
        }
    }

    async function getRoomMessages() {
        const instance = FirestoreConfig.getInstance();
        try {
            if (activeRoom === '') return;
            setLoading(true);

            const messageSnap = await getDocs(query(collection(instance.getDb(), 'Messages'), where('room_id', "==", activeRoom), orderBy('created_at'), limit(100)));
            const messages: DocumentData[] = []
            messageSnap.docs.map(doc => messages.push({ id: doc.id, ...doc.data() }));
            setRoomMessages(messages);
            setLoading(false);
            const unsubscribe = onSnapshot(query(collection(instance.getDb(), 'Messages'), where('room_id', '==', activeRoom), orderBy('created_at')), (doc) => {
                doc.docChanges().forEach(change => {
                    if (change.type === 'added') {
                        const newMessage = { id: change.doc.id, ...change.doc.data() };
                        setRoomMessages(prev => {
                            const exists = prev.some(room => room.id === newMessage.id);
                            if (!exists) return [...prev, newMessage];
                            return prev;
                        });
                    }
                })
            })
            listenOnRoomsRef.current = unsubscribe;

        }
        catch (err) {
            console.log("error while getting messages")
        }
    }
    useEffect(() => {

        const instance = FirestoreConfig.getInstance();
        (async () => {
            if (activeRoom != "") {
                try {
                    setRoomDetailsFetched(false)
                    const docSnap = await getDoc(doc(collection(instance.getDb(), 'Rooms'), activeRoom))
                    if (docSnap.exists()) {
                        setRoomDetails(docSnap.data());
                    }
                    setRoomDetailsFetched(true)
                }
                catch (err) {
                    console.log("error while fetching room details", err);
                }
            }

        })()
        getRoomMessages();

        return (() => {
            if (listenOnRoomsRef.current) {
                listenOnRoomsRef.current();
            }
        })
    }, [activeRoom])

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [roomMessages]);

    return (
        activeRoom === '' ? (
            <div className="w-[70%] flex flex-col items-center justify-center h-full text-center px-6 pt-52">
                <LuMessagesSquare size={80} className="text-gray-400 mb-4" />
                <h2 className="text-xl font-semibold text-gray-700">No Chat Selected</h2>
                <p className="text-sm text-gray-500 mt-2">Select a chat from the sidebar to view messages here.</p>
            </div>
        ) : loading ? (
            <div className="w-[70%] flex flex-col items-center justify-center h-full text-center px-6 pt-52">
                <TbLoader3 size={50} className="text-blue-500 animate-spin mb-4" />
                <h2 className="text-xl font-semibold text-gray-700">Loading Chat...</h2>
                <p className="text-sm text-gray-500 mt-2">Please wait while we fetch your messages.</p>
            </div>
        ) : (
            <main className="w-[70%] px-5 pb-5 flex flex-col items-center">
                {
                    (roomDetails?.participants_id[0] === user?.uid || roomDetails?.participants_id[1] === user?.uid) && (
                        <div className="w-full border-b border-gray-300 flex gap-4 p-5 items-center">
                            <Image
                                src={
                                    roomDetails?.participants_id[0] === user?.uid
                                        ? roomDetails?.participants_details[roomDetails?.participants_id[1]].photo_url
                                        : roomDetails?.participants_details[roomDetails?.participants_id[0]].photo_url
                                }
                                alt="User avatar"
                                width={50}
                                height={50}
                                className="rounded-full object-cover"
                            />
                            <div>
                                <p className="font-semibold text-xl text-gray-800">
                                    {
                                        roomDetails?.participants_id[0] === user?.uid
                                            ? roomDetails?.participants_details[roomDetails?.participants_id[1]].full_name
                                            : roomDetails?.participants_details[roomDetails?.participants_id[0]].full_name
                                    }
                                </p>
                                <p className="text-sm text-gray-500 px-1">
                                    {
                                        roomDetails?.participants_id[0] === user?.uid
                                            ? roomDetails?.participants_details[roomDetails?.participants_id[1]].gender
                                            : roomDetails?.participants_details[roomDetails?.participants_id[0]].gender
                                    }
                                </p>
                            </div>
                        </div>
                    )
                }

                <div className={`flex-1 w-full overflow-y-scroll pr-4 pt-5 space-y-2 ${poppins.className}`}>
                    {
                        roomMessages.map((message, index) => (
                            <div key={index}>
                                {
                                    message.type === 'system_generated' ? (
                                        <SystemMessage message={message} />
                                    ) : message.sent_by === user?.uid ? (
                                        <SentByMe message={message} />
                                    ) : (
                                        <ReceivedByMe message={message} />
                                    )
                                }
                            </div>
                        ))
                    }
                    <div ref={bottomRef}></div>
                </div>

                <SendMessage
                    message={message}
                    setMessage={setMessage}
                    handleSendMessage={handleSendMessage}
                />
            </main>
        )
    );

}