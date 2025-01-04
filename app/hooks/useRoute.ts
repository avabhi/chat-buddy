import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { HiChat } from "react-icons/hi";
import { HiArrowLeftOnRectangle, HiUsers } from "react-icons/hi2";
import { signOut } from "next-auth/react";
import useConversation from "./useConversation";
import Bot from "../icons/Bot";
import IconMessagesSquare from "../icons/Messages";
import Users from "../icons/Users";
import IconLogout from "../icons/Logout";

const useRoutes = () => {
  const pathname = usePathname();
  const { conversationId } = useConversation();

  const routes = useMemo(
    () => [
      {
        label: "Chatbot",
        href: "/chatbot",
        icon: Bot,
        active: pathname === "/chatbot",
      },
      {
        label: "Chat",
        href: "/conversations",
        icon: IconMessagesSquare,
        active: pathname === "/conversations" || !!conversationId,
      },
      {
        label: "Users",
        href: "/users",
        icon: Users,
        active: pathname === "/users",
      },
      {
        label: "Logout",
        onClick: () => signOut(),
        href: "#",
        icon: IconLogout,
      },
    ],
    [pathname, conversationId]
  );

  return routes;
};

export default useRoutes;
