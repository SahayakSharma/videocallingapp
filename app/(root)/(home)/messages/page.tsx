'use client'
import ChatTab from "@/components/ChatTab";
import FindUserTab from "@/components/FindUserTab";
import { useSearchParams } from "next/navigation"

export default function Messages() {
  const searchParams=useSearchParams();
  const tab=searchParams.get("tab");
  const active=searchParams.get("active");

  return (
    <ChatTab/>
  )
}
