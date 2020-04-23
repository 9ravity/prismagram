import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeUser: async (_, args) => {
      // 공개된 userProfile -> 인증 필요없음
      const { username } = args;
      return prisma.user({ username });
    },
  },
};
