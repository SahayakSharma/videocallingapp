import CustomSizeLoader from "@/components/customComponents/CustomSizeLoader";
import { FirestoreConfig } from "@/config/firestoreConfig";
import { useAuth } from "@/context/authContext";
import { useFriends } from "@/context/friendsContext";
import { useTheme } from "@/context/themeContext"
import { useUser } from "@/context/UserContext";
import { addDoc, collection, doc, DocumentData, getDocs, query, serverTimestamp, updateDoc, where } from "firebase/firestore";
import { useState } from "react";
import { BsPersonCircle } from "react-icons/bs";
import { IoPersonAdd } from "react-icons/io5";
import { MdReport } from "react-icons/md";
export default function UserCard({ User }: { User: DocumentData }) {
    const { colors } = useTheme();
    const { userDetails } = useUser();
    const { user } = useAuth();
    const { changeActiveMenu,addToMySentRequests } = useFriends();
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
                gender: userDetails?.gender
            },
            receiver_details: {
                full_name: User?.full_name,
                gender: User?.gender
            },
            created_at: serverTimestamp(),
            status: 'pending'
        }
        try {
            const prevRec = await getDocs(query(collection(instance.getDb(), 'FriendRequests'), where('sender_id', '==', user?.uid), where('receiver_id', '==', User?.id)))
            if (prevRec.docs.length > 0) {
                throw new Error("Request already sent")
            }
            const newRec=await addDoc(collection(instance.getDb(), 'FriendRequests'), payload)
            alert('friend request sent')
            const newPayload={
                ...payload,
                created_at:new Date()
            }
            addToMySentRequests(newPayload,newRec.id);
            changeActiveMenu('my-requests')
        }
        catch (err) {
            console.log("error while adding friend", err);
            setLoading(false);
        }
    }
    return (
        <main className="w-full px-10 py-5 rounded-md flex justify-between items-center" style={{ backgroundColor: colors.background }}>
            <div className="h-full flex gap-7 items-center">
                <BsPersonCircle size={50} />
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
    return (
        <main className="w-full px-10 py-5 rounded-md flex justify-between items-center" style={{ backgroundColor: colors.background }}>
            <div className="h-full flex gap-7 items-center">
                <BsPersonCircle size={50} />
                <span>
                    <p className="font-medium text-xl">{request.receiver_details?.full_name}</p>
                    <p className="font-light text-[15px]" style={{ color: colors.secondary }}>{request.receiver_details?.gender}</p>
                </span>
            </div>
            <div className="">
                <p className="px-5 py-2 rounded-md font-bold text-white capitalize" style={{ backgroundColor: request.status === 'pending' ? 'orange' : request.status === 'accepted' ? 'green' : 'red' }}>{request.status}</p>
            </div>
        </main>
    )
}
export function ReceivedRequestCard({ request }: { request: DocumentData }) {
    const { colors } = useTheme();
    const [processing, setProcessing] = useState({
        accepting: false,
        rejecting: false
    })
    const {user}=useAuth();
    const {userDetails}=useUser();handleRequestAccept
    const {removeFromReceivedRequests}=useFriends();
    async function handleRequestAccept() {
        if (processing.accepting || processing.rejecting) return;
        const instance = FirestoreConfig.getInstance();
        setProcessing(prev => ({ ...prev, accepting: true }));
        try {
            if(!user) return;
            await updateDoc(doc(instance.getDb(), 'FriendRequests', request.id), {
                status: 'accepted'
            })
            const roomRef=await addDoc(collection(instance.getDb(),'Rooms'),{
                participants_id:[user?.uid,request.sender_id],
                room_name:[userDetails.full_name,request.sender_details.full_name].join('_'),
                room_type:'one-to-one',
                participants_details:{
                    [user?.uid]:{
                        full_name:userDetails.full_name,
                        gender:userDetails.gender
                    },
                    [request.sender_id]:request.sender_details
                },
                created_at:serverTimestamp()
            })
            const friendRef=await addDoc(collection(instance.getDb(),'Friends'),{
                friends_id:[user?.uid,request.sender_id],
                friends_details:{
                    [user?.uid]:{
                        full_name:userDetails.full_name,
                        gender:userDetails.gender
                    },
                    [request.sender_id]:request.sender_details
                },
                associated_room_id:roomRef.id,
                created_at:serverTimestamp()
            })
            const initialMessageRef=await addDoc(collection(instance.getDb(),'Messages'),{
                room_id:roomRef.id,
                payload:"The room was created",
                sent_by:null,
                type:"system_generated",
                created_at:serverTimestamp()
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
        <main className="w-full px-10 py-5 rounded-md flex justify-between items-center" style={{ backgroundColor: colors.background }}>
            <div className="h-full flex gap-7 items-center">
                <BsPersonCircle size={50} />
                <span>
                    <p className="font-medium text-xl">{request.sender_details?.full_name}</p>
                    <p className="font-light text-[15px]" style={{ color: colors.secondary }}>{request.sender_details?.gender}</p>
                </span>
            </div>
            <div className="flex gap-5">
                <p className="px-5 py-2 bg-green-500 rounded-md text-white font-bold cursor-pointer" onClick={handleRequestAccept}>{processing.accepting ? 'Accepting... ' : 'Accept'}</p>
                <p className="px-5 py-2 bg-red-500 rounded-md text-white font-bold cursor-pointer" onClick={handleRequestReject}>{processing.rejecting ? 'Rejecting...':'Reject'}</p>
            </div>
        </main>
    )
}