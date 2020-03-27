import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeUser: async (_, args) => {
      // 공개된 userProfile -> 인증 필요없음
      const { id } = args;
      const user = await prisma.user({ id });
      const posts = await prisma.user({ id }).posts;
      return {
        user,
        posts
      };
    }
  }
};
