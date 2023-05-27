import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

interface IParams {
  conversationId?: string;
}
export async function DELETE(
  request: Request,
  { params }: { params: IParams } //params always should be the second argument
) {
  try {
    const { conversationId } = params;
    const currentUser = await getCurrentUser();
    if (!currentUser?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const existingConversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        users: true,
      },
    });
    if (!existingConversation) {
      return new NextResponse("Invalid ID", { status: 400 });
    }

    const deletedConversation = await prisma.conversation.deleteMany({
      where: {
        id: conversationId,
        userIds: {
          hasSome: [currentUser.id],
        },
      },
    });

    return NextResponse.json(deletedConversation);
  } catch (error: any) {
    console.log("ERROR_DELETE_CONVERSATION", error);
    return new NextResponse("Internal Erro", { status: 500 });
  }
}
