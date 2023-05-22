import prismm from "@/app/libs/prismadb";

const getMessages = async (conversationId: string) => {
  try {
    const messages = await prismm.message.findMany({
      where: {
        conversationId: conversationId,
      },
      include: {
        sender: true,
        seen: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
    return messages;
  } catch (error: any) {
    return [];
  }
};

export default getMessages;
