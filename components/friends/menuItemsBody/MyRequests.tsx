import CustomSizeLoader from "@/components/customComponents/CustomSizeLoader";
import { useFriends } from "@/context/friendsContext"
import { useTheme } from "@/context/themeContext";
import { NoRequestSent, NoRequestsReceived } from "./NoRequest";
import { ReceivedRequestCard, SentRequestCard } from "./UserCard";

export default function MyRequets(){
    const {myRequests,myRequestsFetched}=useFriends();
    const {colors}=useTheme();
    return (
  !myRequestsFetched ? (
    <CustomSizeLoader className="py-52" />
  ) : (
    <div className="p-6 flex justify-center">
      <div className="w-full max-w-2xl flex flex-col gap-10">
        <section>
          <p className="text-lg font-semibold mb-4" style={{ color: colors.text }}>
            Friend Requests Received
          </p>
          <div className="flex flex-col gap-3">
            {
              myRequests.receivedRequests.length > 0
                ? myRequests.receivedRequests.map((req) => (
                    <ReceivedRequestCard request={req} key={req.id} />
                  ))
                : <NoRequestsReceived />
            }
          </div>
        </section>

        <section>
          <p className="text-lg font-semibold mb-4" style={{ color: colors.text }}>
            Requests You've Sent
          </p>
          <div className="flex flex-col gap-3">
            {
              myRequests.sentRequests.length > 0
                ? myRequests.sentRequests.map((req) => (
                    <SentRequestCard request={req} key={req.id} />
                  ))
                : <NoRequestSent />
            }
          </div>
        </section>
      </div>
    </div>
  )
);

}


