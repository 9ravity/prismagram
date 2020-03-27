import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";
import { COMMENT_FRAGMENT } from "../../../fragments";

export default {
  Query: {
    seeFullPost: async (_, args, { request }) => {
      isAuthenticated(request);
      const { id } = args;
      const post = await prisma.post({ id });
      const comments = await prisma
        .post({ id })
        .comments()
        .$fragment(COMMENT_FRAGMENT);
      const likeNum = await prisma
        .likesConnection({ where: { post: { id } } })
        .aggregate()
        .count();
      console.log(likeNum);
      return {
        post,
        comments,
        likeCount: likeNum
      };
    }
  }
};
