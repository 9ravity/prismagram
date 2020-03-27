import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    searchPost: async (_, args) => {
      console.log("💟" + args.term);
      const post = prisma.posts({
        where: {
          OR: [
            { location_contains: args.term },
            { caption_contains: args.term }
          ]
        }
      });
      return post;
    }
  }
};
