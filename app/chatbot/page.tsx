import getCurrentUser from "../actions/getCurrentUser";
import EmptyState from "../components/EmptyState";
import Body from "./components/Body";
import getParticularConversation from "../actions/getParticularUserConversation";
import getConversationById from "../actions/getConversationById";

const ChatPage = async () => {
  const currentUser = await getCurrentUser();
  const result = await getParticularConversation("676130ecb541b7a99e3121c9");

  if (!currentUser) {
    return (
      <div className="lg:pl-80 h-full">
        {" "}
        <div className="h-full flex flex-col">
          <EmptyState />
        </div>
      </div>
    );
  }

  return (
    <div className="lg:pl-80 h-full">
      <Body currentUser={currentUser!} conversations={result} />
    </div>
  );
};

export default ChatPage;
