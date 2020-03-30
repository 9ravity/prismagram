import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";

const EDIT = "EDIT";
const DELETE = "DELETE";

export default {
  Mutation: {
    editPost: async (parent, args, { request }) => {
      isAuthenticated(request);
      const { id, caption, location, action } = args;
      const { user } = request;
      // id 는 args 에서 온것, user.id 는 token에서 추출된 것
      const post = await prisma.$exists.post({ id, user: { id: user.id } }); // user가 등록한 post 존재
      if (post) {
        if (action === EDIT) {
          return prisma.updatePost({
            where: { id },
            data: { caption, location }
          });
        } else if (action === DELETE) {
          return prisma.deletePost({ id });
        }
      } else {
        throw Error("You can't do that");
      }
    }
  }
};
