import { get } from "lodash";
import Sidebar from "../components/sidebar/Sidebar";
import getUsers from "../actions/getUsers";
import UserList from "./components/UserList";

export default async function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const users = await getUsers();
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
