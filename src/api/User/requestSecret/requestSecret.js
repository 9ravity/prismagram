import { generateSecret, sendSecretMail } from "../../../utils";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    requestSecret: async (_, args, { request }) => {
      console.log(request.user);
      const { email } = args;
      const loginSecret = generateSecret();
      try {
        const result = await prisma.updateUser({
          data: { loginSecret },
          where: { email },
        });
        if (result) {
          await sendSecretMail(email, loginSecret);
        } else {
          throw Error("Error");
        }
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
};
