import { prisma } from "../../../../generated/prisma-client";
import { generateToken } from "../../../utils";

export default {
  Mutation: {
    confirmSecret: async (_, args) => {
      const { email, secret } = args;
      const user = await prisma.user({ email }); // email로 user 찾기
      if (user.loginSecret === secret) {
        await prisma.updateUser(
          {
            where: {
              id: user.id
            }
          },
          { data: { loginSecret: "" } }
        );

        // todo jwt token 생성
        return generateToken(user.id);
      } else {
        throw Error("Wrong email/secret combination");
      }
    }
  }
};
