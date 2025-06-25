import { FirestoreConfig } from "@/config/firestoreConfig";
import { useMessages } from "@/context/messageContext"
import { collection, DocumentData, getDocs, limit, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import SystemMessage, { ReceivedByMe, SentByMe } from "./IndividualMessage";
import SendMessage from "./SendMessage";
import { addDoc, serverTimestamp } from "firebase/firestore";
import { useAuth } from "@/context/authContext";
import { useUser } from "@/context/UserContext";
import { Poppins } from 'next/font/google';

export const poppins = Poppins({
    subsets: ['latin'],
    weight: ['400', '500', '700'],
    variable: '--font-poppins',
});


export default function Messages() {
    const [loading, setLoading] = useState<boolean>(true)
    const { activeRoom } = useMessages();
    const [roomMessages, setRoomMessages] = useState<DocumentData[]>([]);
    const [message, setMessage] = useState<string>('');
    const { user } = useAuth();
    const { userDetails } = useUser();
    const bottomRef = useRef<HTMLDivElement>(null);
    const loadingRef = useRef<boolean>(null);
    const listenOnRoomsRef = useRef<() => void>(() => { })

    async function handleSendMessage() {
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
                    gender: userDetails.gender
                }
            }
            const newDoc = await addDoc(collection(instance.getDb(), 'Messages'), payload)
            const statePayload = {
                ...payload,
                created_at: new Date()
            }
            setRoomMessages(prev => ([...prev, { id: newDoc.id, ...payload }]))
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
        activeRoom === '' ?
            <div className="w-[70%]">
                <p className="font-medium text-xl text-center py-52">Select a chat to see messages</p>
            </div> :
            loading ? <div className="w-[70%]">
                <p className="font-medium text-xl text-center py-52">Loading...</p>
            </div> :
                <main className="w-[70%] p-5 flex flex-col">
                    <div className={`flex-1 overflow-y-scroll pr-5 ${poppins.className}`}>
                        {
                            roomMessages.map((message, index) => (
                                <div key={index} className="">
                                    {
                                        message.type === 'system_generated' ? <SystemMessage message={message} /> :
                                            message.sent_by === user?.uid ? <SentByMe message={message} /> : <ReceivedByMe message={message} />
                                    }
                                </div>
                            ))
                        }
                        <div ref={bottomRef}></div>
                    </div>
                    <SendMessage message={message} setMessage={setMessage} handleSendMessage={handleSendMessage} />
                </main>
    )
}