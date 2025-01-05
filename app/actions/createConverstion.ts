import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

const createConversation = async (userId: string) => {
    try {
    
        const currentUser = await getCurrentUser();
        if (!currentUser?.id) {
            return [];
          }
    
        const existingConversations = await prisma.conversation.findMany({
          where: {
            OR: [
              {
                userIds: {
                  equals: [currentUser.id, userId],
                },
              },
              {
                userIds: {
                  equals: [userId, currentUser.id],
                },
              },
            ],
          },
        });
    
        const singleConversation = existingConversations[0];
    
        if (singleConversation) {
          return singleConversation;
        }
    
        const newConversation = await prisma.conversation.create({
          data: {
            users: {
              connect: [
                {
                  id: currentUser.id,
                },
                {
                  id: userId,
                },
              ],
            },
          },
          include: {
            users: true,
          },
        });
    
     return newConversation;
      } catch (error) {
        return [];
      }
}

export default createConversation;