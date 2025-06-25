
import ChatTab from "@/components/ChatTab";
import { MessageProvider } from "@/context/messageContext";

export default function Messages() {

  return (
    <MessageProvider>
      <ChatTab />
    </MessageProvider>
  )
}
