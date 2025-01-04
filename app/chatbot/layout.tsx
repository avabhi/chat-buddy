import { BOT_USER_ID } from "@/utils/constants";
import getParticularConversation from "../actions/getParticularUserConversation";
import getUsers from "../actions/getUsers";
import Sidebar from "../components/sidebar/Sidebar";
import ConversationList from "./components/ConversationList";

export default async function ConversationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const conversations = await getParticularConversation(BOT_USER_ID);
  const users = await getUsers();
  return (
    //@ts-expect-error server component
    <Sidebar>
      <ConversationList initialItems={conversations} users={users} />
      {children}
    </Sidebar>
  );
}
