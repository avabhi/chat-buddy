import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

const getParticularConversation = async (userId:string) => {
    const currentUser = await getCurrentUser();
    if (!currentUser?.id) {
      return [];
    }
  try {
    const conversations = await prisma.conversation.findMany({
      orderBy: {
        lastMessageAt: "desc",
      },
      where: {
        AND: [
          { userIds: { has: currentUser.id } },
          { userIds: { has: userId } }
        ]
      },
      include: {
        users: true,
        messages: {
          include: {
            sender: true,
            seen: true,
          },
        },
      },
    });

    return conversations;
  } catch (error: any) {
    return [];
  }
};

export default getParticularConversation;
