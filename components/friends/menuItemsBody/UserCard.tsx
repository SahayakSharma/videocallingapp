import CustomSizeLoader from "@/components/customComponents/CustomSizeLoader";
import { FirestoreConfig } from "@/config/firestoreConfig";
import { useAuth } from "@/context/authContext";
import { useFriends } from "@/context/friendsContext";
import { useTheme } from "@/context/themeContext"
import { useUser } from "@/context/UserContext";
import { addDoc, collection, doc, DocumentData, getDocs, query, serverTimestamp, updateDoc, where } from "firebase/firestore";
import Image from "next/image";
import { useState } from "react";
import { BsPersonCircle } from "react-icons/bs";
import { IoPersonAdd } from "react-icons/io5";
import { MdReport } from "react-icons/md";
export default function UserCard({ User }: { User: DocumentData }) {
    const { colors } = useTheme();
    const { userDetails } = useUser();
    const { user } = useAuth();
    const { changeActiveMenu, addToMySentRequests } = useFriends();
    const [loading, setLoading] = useState<boolean>(false);

    async function handleAddFriend() {
        if (loading) return;
        setLoading(true);
        const instance = FirestoreConfig.getInstance();
        const payload = {
            sender_id: user?.uid,
            receiver_id: User?.id,
            sender_details: {
                full_name: userDetails?.full_name,
                gender: userDetails?.gender,
                photo_url: user?.photoURL
            },
            receiver_details: {
                full_name: User?.full_name,
                gender: User?.gender,
                photo_url: User?.photo_url
            },
            created_at: serverTimestamp(),
            status: 'pending'
        }
        try {
            const prevRec = await getDocs(query(collection(instance.getDb(), 'FriendRequests'), where('sender_id', '==', user?.uid), where('receiver_id', '==', User?.id)))
            if (prevRec.docs.length > 0) {
                throw new Error("Request already sent")
            }
            const newRec = await addDoc(collection(instance.getDb(), 'FriendRequests'), payload)
            alert('friend request sent')
            const newPayload = {
                ...payload,
                created_at: new Date()
            }
            addToMySentRequests(newPayload, newRec.id);
            changeActiveMenu('my-requests')
        }
        catch (err) {
            console.log("error while adding friend", err);
            setLoading(false);
        }
    }
    return (
        <main className="w-full px-5 py-5 rounded-md flex justify-between items-center" style={{ backgroundColor: colors.background }}>
            <div className="h-full flex gap-7 items-center">
                {User.photo_url ? <Image src={User.photo_url} alt="image here" width={70} height={70} className="rounded-full" /> : <BsPersonCircle size={50} />}
                <span>
                    <p className="font-medium text-xl">{User?.full_name}</p>
                    <p className="font-light text-[15px]" style={{ color: colors.secondary }}>{User?.gender}</p>
                </span>
            </div>
            <div className="flex gap-10">
                <IoPersonAdd size={30} color="green" className="cursor-pointer" title="Add Friend" onClick={() => handleAddFriend()} />
                <MdReport size={30} color="red" className="cursor-pointer" title="Report" />
            </div>
        </main>
    )
}


export function SentRequestCard({ request }: { request: DocumentData }) {
    const { colors } = useTheme();

    const getStatusStyles = () => {
        switch (request.status) {
            case 'accepted':
                return 'bg-green-100 text-green-700 border border-green-300';
            case 'rejected':
                return 'bg-red-100 text-red-700 border border-red-300';
            default:
                return 'bg-yellow-100 text-yellow-800 border border-yellow-300';
        }
    };

    return (
        <main
            className="w-full px-6 py-4 rounded-xl flex justify-between items-center border border-gray-200 shadow-sm transition-all duration-150 hover:shadow-md"
            style={{ backgroundColor: colors.background }}
        >
            <div className="flex gap-5 items-center">
                {request.receiver_details?.photo_url ? (
                    <Image
                        src={request.receiver_details.photo_url}
                        alt="Receiver photo"
                        width={60}
                        height={60}
                        className="rounded-full object-cover"
                    />
                ) : (
                    <BsPersonCircle size={50} color={colors.textSecondary} />
                )}

                <div>
                    <p className="text-lg font-semibold" style={{ color: colors.text }}>
                        {request.receiver_details?.full_name}
                    </p>
                    <p className="text-sm font-light" style={{ color: colors.secondary }}>
                        {request.receiver_details?.gender}
                    </p>
                </div>
            </div>

            <div className={`px-4 py-1.5 text-sm font-semibold rounded-md capitalize ${getStatusStyles()}`}>
                {request.status}
            </div>
        </main>
    );
}

export function ReceivedRequestCard({ request }: { request: DocumentData }) {
    const { colors } = useTheme();
    const [processing, setProcessing] = useState({
        accepting: false,
        rejecting: false
    })
    const { user } = useAuth();
    const { userDetails } = useUser();
    const { removeFromReceivedRequests } = useFriends();

    async function handleRequestAccept() {
        if (processing.accepting || processing.rejecting) return;
        const instance = FirestoreConfig.getInstance();
        setProcessing(prev => ({ ...prev, accepting: true }));
        try {
            if (!user) return;
            await updateDoc(doc(instance.getDb(), 'FriendRequests', request.id), {
                status: 'accepted'
            })
            const roomRef = await addDoc(collection(instance.getDb(), 'Rooms'), {
                participants_id: [user?.uid, request.sender_id],
                room_name: [userDetails.full_name, request.sender_details.full_name].join('_'),
                room_type: 'one-to-one',
                participants_details: {
                    [user?.uid]: {
                        full_name: userDetails.full_name,
                        gender: userDetails.gender,
                        photo_url: user?.photoURL
                    },
                    [request.sender_id]: request.sender_details
                },
                created_at: serverTimestamp()
            })
            const friendRef = await addDoc(collection(instance.getDb(), 'Friends'), {
                friends_id: [user?.uid, request.sender_id],
                friends_details: {
                    [user?.uid]: {
                        full_name: userDetails.full_name,
                        gender: userDetails.gender,
                        photo_url: user?.photoURL
                    },
                    [request.sender_id]: request.sender_details
                },
                associated_room_id: roomRef.id,
                created_at: serverTimestamp()
            })
            await addDoc(collection(instance.getDb(), 'Messages'), {
                room_id: roomRef.id,
                payload: "The room was created",
                sent_by: null,
                type: "system_generated",
                created_at: serverTimestamp()
            })
            removeFromReceivedRequests(request.id);
        }
        catch (err) {
            setProcessing(prev => ({ ...prev, accepting: false }));
            console.log("error while accepting request", err);
        }
    }
    async function handleRequestReject() {
        if (processing.rejecting || processing.accepting) return;
        setProcessing(prev => ({ ...prev, rejecting: true }));
        const instance = FirestoreConfig.getInstance();
        try {
            await updateDoc(doc(instance.getDb(), 'FriendRequests', request.id), {
                status: 'rejected'
            })
            removeFromReceivedRequests(request.id);
        }
        catch (err) {
            setProcessing(prev => ({ ...prev, rejecting: false }));
            console.log("error while rejecting request", err);
        }
    }
    return (
        <main
            className="w-full px-6 py-4 rounded-xl flex justify-between items-center border border-gray-200 shadow-sm transition-all duration-150 hover:shadow-md"
            style={{ backgroundColor: colors.background }}
        >
    
            <div className="flex gap-5 items-center">
                {request.sender_details?.photo_url ? (
                    <Image
                        src={request.sender_details.photo_url}
                        alt="Sender photo"
                        width={60}
                        height={60}
                        className="rounded-full object-cover"
                    />
                ) : (
                    <BsPersonCircle size={50} color={colors.textSecondary} />
                )}

                <div>
                    <p className="text-lg font-semibold" style={{ color: colors.text }}>
                        {request.sender_details?.full_name}
                    </p>
                    <p className="text-sm font-light" style={{ color: colors.secondary }}>
                        {request.sender_details?.gender}
                    </p>
                </div>
            </div>

     
            <div className="flex gap-3">
                <button
                    onClick={handleRequestAccept}
                    disabled={processing.accepting}
                    className={`px-4 py-2 rounded-md font-semibold text-white transition-all duration-150 ${processing.accepting
                        ? 'bg-green-400 cursor-wait'
                        : 'bg-green-600 hover:bg-green-700'
                        }`}
                >
                    {processing.accepting ? 'Accepting...' : 'Accept'}
                </button>

                <button
                    onClick={handleRequestReject}
                    disabled={processing.rejecting}
                    className={`px-4 py-2 rounded-md font-semibold text-white transition-all duration-150 ${processing.rejecting
                        ? 'bg-red-400 cursor-wait'
                        : 'bg-red-600 hover:bg-red-700'
                        }`}
                >
                    {processing.rejecting ? 'Rejecting...' : 'Reject'}
                </button>
            </div>
        </main>
    );

}