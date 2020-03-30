import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeFeed: async (_, __, { request }) => {
      isAuthenticated(request);
      const { user } = request;
      const following = await prisma.user({ id: user.id }).following; // user가 follow하는 사람들
      console.log(following.map(user => user.id).push(user.id)); // +1???? 이유를 모르겠네
      return prisma.posts({
        where: {
          user: {
            id_in: [...following.map(user => user.id), user.id] // follow한 user들과 나의 post를 push 넣어서 결국 follow + 내꺼 feed보기
          }
        },
        orderBy: "createdAt_DESC"
      });
    }
  }
};
