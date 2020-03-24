import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    confirmSecret: async (_, args) => {
      const { email, secret } = args;
      const user = await prisma.user({ email }); // email로 user 찾기
      if (user.loginSecret === secret) {
        // jwt
        return "token";
      } else {
        throw Error("Wrong email/secret combination");
      }
    }
  }
};
