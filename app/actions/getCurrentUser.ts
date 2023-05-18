import prisma from "@/app/libs/prismadb";
import getSession from "./getSession";

const getCurrentUser = async () => {
  try {
    const session = await getSession();
    if (session?.user?.email) {
      const user = await prisma.user.findUnique({
        where: {
          email: session.user.email as string,
        },
      });
      return user;
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};
export default getCurrentUser;
