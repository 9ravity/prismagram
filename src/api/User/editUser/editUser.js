import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    editUser: async (_, args, { request }) => {
      isAuthenticated(request);
      const { username, email, firstName, lastName, bio } = args;
      const { user } = request;
      try {
        const resultUser = await prisma.updateUser({
          where: {
            id: user.id
          },
          data: {
            username,
            email,
            firstName,
            lastName,
            bio
          }
        });
        return resultUser;
      } catch (error) {
        console.log(error);
        return error;
      }
    }
  }
};
