import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";
export default {
  Mutation: {
    toggleLike: async (_, args, { request }) => {
      isAuthenticated(request);
      const { postId } = args; //파라미터,
      const { user } = request;
      // prisma : check - $exists.like -> 있으면 false, 없으면 true 반환
      try {
        const existingLike = await prisma.$exists.like({
          AND: [
            {
              user: {
                id: user.id
              }
            },
            {
              post: {
                id: postId
              }
            }
          ]
        }); // like 테이블에서 중복 체크
        if (existingLike) {
          //todo 있으면 삭제, 없으면 추가 like 클릭시
        } else {
          await prisma.createLike({
            user: {
              connect: {
                id: user.id
              }
            },
            post: {
              connect: {
                id: postId
              }
            }
          }); // user,post가 like와 연결됨
        }
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    }
  }
};
