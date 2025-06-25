import CustomSizeLoader from "@/components/customComponents/CustomSizeLoader";
import { useFriends } from "@/context/friendsContext"
import { useTheme } from "@/context/themeContext";
import { NoRequestSent, NoRequestsReceived } from "./NoRequest";
import { ReceivedRequestCard, SentRequestCard } from "./UserCard";

export default function MyRequets(){
    const {myRequests,myRequestsFetched}=useFriends();
    const {colors}=useTheme();
    return(
        !myRequestsFetched ? <CustomSizeLoader className="py-52"/> : 
        <div className="p-10">
            <p className="font-medium text-xl" style={{color:colors.text}}>Received</p>
            <div className="w-[50%] py-5 flex flex-col gap-2">
                {myRequests.receivedRequests.length > 0 ? myRequests.receivedRequests.map((req,index)=>{
                    return(
                        <ReceivedRequestCard request={req} key={index}/>
                    )
                }) : <NoRequestsReceived/>}
            </div>
            <p className="font-medium text-xl" style={{color:colors.text}}>My Requests</p> 
            <div className="w-[50%] py-5 flex flex-col gap-2">
                {myRequests.sentRequests.length > 0 ? myRequests.sentRequests.map((req,index)=>{
                    return(
                        <SentRequestCard request={req} key={index}/>
                    )
                }) : <NoRequestSent/>}
            </div>
        </div>
    )
}


