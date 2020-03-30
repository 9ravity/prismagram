import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";
import { ROOM_FRAGMENT } from "../../../fragments";

export default {
  Query: {
    seeRoom: async (_, args, { request }) => {
      isAuthenticated(request);
      const { id } = args;
      const { user } = request; // 로그인한 유저
      const existingRoom = await prisma.$exists.room({
        participants_some: {
          id: user.id
        }
      });
      if (existingRoom) {
        return prisma.room({ id }).$fragment(ROOM_FRAGMENT);
      } else {
        throw Error("You can't see this");
      }
    }
  }
};
