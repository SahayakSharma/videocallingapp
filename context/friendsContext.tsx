'use client'
import { FirestoreConfig } from "@/config/firestoreConfig";
import { collection, DocumentData, getDocs, limit, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { createContext, useContext, useState, useEffect, ReactNode, useRef } from "react";
import { useAuth } from "./authContext";



type IFriendContext = {
    activeMenu: string,
    changeActiveMenu: (menuTitle: string) => void,
    allUsersFetched: boolean,
    allUsers: DocumentData[],
    myRequests: IMyRequests,
    myRequestsFetched: boolean,
    removeFromReceivedRequests: (requestId: string) => void,
    myFriends: DocumentData[],
    myFriendsFetched: boolean,
    addToMySentRequests: (payload: DocumentData, id: string) => void
}
type IMyRequests = {
    sentRequests: DocumentData[],
    receivedRequests: DocumentData[],
}

const FriendsContext = createContext<IFriendContext>({
    activeMenu: 'my-friends',
    changeActiveMenu: () => { throw new Error("function invoked outside provider") },
    allUsersFetched: false,
    allUsers: [],
    myRequests: {
        sentRequests: [],
        receivedRequests: []
    },
    myRequestsFetched: false,
    removeFromReceivedRequests: () => { throw new Error("function invoked outside provider") },
    myFriendsFetched: false,
    myFriends: [],
    addToMySentRequests: () => { }
});

export function FriendsProvider({ children }: { children: ReactNode }) {

    const [activeMenu, setActiveMenu] = useState<string>('my-friends');
    const [allUsersFetched, setAllUsersFetched] = useState<boolean>(false);
    const [allUsers, setAllUsers] = useState<DocumentData[]>([]);
    const [myRequests, setMyRequests] = useState<IMyRequests>({
        sentRequests: [],
        receivedRequests: []
    })
    const [myRequestsFetched, setMyRequestsFetched] = useState<boolean>(false);
    const [myFriendsFetched, setMyFriendsFetched] = useState<boolean>(false);
    const [myFriends, setMyFriends] = useState<DocumentData[]>([]);
    const myFriendSusbcriptionRef = useRef<() => void>(() => { })
    const receivedRequestsRef = useRef<() => void>(() => { })
    const { user } = useAuth();

    async function getAllUsers() {
        const instance = FirestoreConfig.getInstance();
        try {
            const userQuery = query(collection(instance.getDb(), 'Users'));
            const usersSnap = await getDocs(userQuery);
            const allUsersOtherThanMe = usersSnap.docs.filter(doc => doc.id != user?.uid);
            const temp = allUsersOtherThanMe.map(user => ({ id: user.id, ...user.data() }))
            setAllUsers(temp);
            setAllUsersFetched(true);
        }
        catch (err) {
            console.log("error while fetching all users", err)
        }
    }

    async function getMyRequests() {
        const instance = FirestoreConfig.getInstance();
        try {
            const sentSnap = await getDocs(query(collection(instance.getDb(), 'FriendRequests'), where('sender_id', '==', user?.uid), orderBy('created_at', 'desc'), limit(5)));
            const receivedSnap = await getDocs(query(collection(instance.getDb(), 'FriendRequests'), where('receiver_id', '==', user?.uid), where('status', '==', 'pending'), orderBy('created_at', 'desc')));
            const sent = sentSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            const received = receivedSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setMyRequests({
                sentRequests: sent,
                receivedRequests: received
            })
            setMyRequestsFetched(true);
            const receivedRequestSusbcription = onSnapshot(query(collection(instance.getDb(), 'FriendRequests'), where('sender_id', '==', user?.uid)), doc => {
                doc.docChanges().forEach(change => {
                    if (change.type == 'added' && myRequestsFetched) {
                        setMyRequests(prev => {
                            const exists = prev.receivedRequests.some(
                                req => req.id === change.doc.id     
                            );

                            if (exists) return prev;             

                            return {
                                ...prev,
                                receivedRequests: [
                                    { id: change.doc.id, ...change.doc.data() },
                                    ...prev.receivedRequests
                                ]
                            };
                        });
                    }
                })
            })
            receivedRequestsRef.current = receivedRequestSusbcription
        }
        catch (err) {
            console.log("error while getting requests", err);
        }
    }

    function removeFromReceivedRequests(requestId: string) {
        const filtered = myRequests.receivedRequests.filter(req => req.id != requestId);
        setMyRequests(prev => ({ ...prev, receivedRequests: filtered }))
    }
    function changeActiveMenu(menuValue: string) {
        setActiveMenu(menuValue);
    }

    async function getMyFriends() {
        try {
            const instance = FirestoreConfig.getInstance();
            const final: DocumentData[] = [];
            const friendSnap = await getDocs(query(collection(instance.getDb(), 'Friends'), where('friends_id', 'array-contains', user?.uid)));
            friendSnap.forEach((doc) => final.push({ id: doc.id, ...doc.data() }));
            setMyFriends(final);
            setMyFriendsFetched(true);
            const friendSubscription = onSnapshot(query(collection(instance.getDb(), 'Friends'), where('friends_id', 'array-contains', user?.uid)), (doc) => {
                doc.docChanges().forEach((change) => {
                    if (change.type === 'added') {
                        setMyFriends(prev => {
                            const exists = prev.some(friend => friend.id === change.doc.id);
                            if (exists) return prev;
                            return [{ id: change.doc.id, ...change.doc.data() }, ...prev];
                        });
                    }
                })
            })
            myFriendSusbcriptionRef.current = friendSubscription;
        }
        catch (err) {
            console.log("error while fetching friends")
        }
    }

    function addToMySentRequests(payload: DocumentData, id: string) {

        setMyRequests(prev => ({ ...prev, sentRequests: [...prev.sentRequests, { id: id, ...payload }] }))
    }

    useEffect(() => {
        if (user) {
            getMyFriends();
            getAllUsers();
            getMyRequests();

            return (() => {
                if (myFriendSusbcriptionRef.current) {
                    myFriendSusbcriptionRef.current();
                }
                if (receivedRequestsRef.current) {
                    receivedRequestsRef.current();
                }
            })
        }
    }, [user])

    return (
        <FriendsContext.Provider value={{ activeMenu, changeActiveMenu, allUsersFetched, allUsers, myRequests, myRequestsFetched, removeFromReceivedRequests, myFriends, myFriendsFetched, addToMySentRequests }}>
            {children}
        </FriendsContext.Provider>
    )
}

export function useFriends() {
    return useContext(FriendsContext);
}