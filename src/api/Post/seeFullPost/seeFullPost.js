import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeFullPost: async (_, args, { request }) => {
      isAuthenticated(request);
      const { id } = args;
      const post = await prisma.post({ id });

      return {
        post,
        comments,
        files
      };
    }
  }
};
