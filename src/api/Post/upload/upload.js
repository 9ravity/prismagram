import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    upload: async (parent, arge, { request }) => {
      isAuthenticated(request);
      const { caption, files } = args;
      const { user } = request;
      const post = await prisma.createPost({
        caption,
        user: {
          connect: { id: user.id }
        }
      }); // post를 만든 유저가 누군지 찾기
      files.forEach(
        async file =>
          await prisma.createFile({
            url: file,
            post: {
              connect: {
                id: post.id
              }
            }
          })
      ); // 위에서 만든 post와 file connect 시키기
      return post;
    }
  }
};
