import { get } from "lodash";
import Sidebar from "../components/sidebar/Sidebar";
import getUsers from "../actions/getUsers";
import UserList from "./components/UserList";
import getParticularConversation from "../actions/getParticularUserConversation";
import { BOT_USER_ID } from "@/utils/constants";
import createConversation from "../actions/createConverstion";

export default async function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const users = await getUsers();
  const conversations = await getParticularConversation(BOT_USER_ID);
  if (!conversations?.[0]?.id) {
    await createConversation(BOT_USER_ID);
  }
  return (
    //@ts-expect-error server component
    <Sidebar>
      <div className="h-full">
        <UserList item={users} />
        {children}
      </div>
    </Sidebar>
  );
}
