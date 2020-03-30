import { prisma } from "../../../generated/prisma-client";

export default {
  User: {
    fullName: parent => {
      return `${parent.firstName} ${parent.lastName}`;
    },
    isFollowing: (parent, _, { request }) => {
      const { user } = request;
      const { id = parentId } = parent; // parent 의 id 가 parentId변수에 담김 const parentId = parent.id 와 같음
      return prisma.$exists.user({
        AND: [{ id: user.id }, { following_some: parentId }]
      });
    },
    isSelf: (parent, _, { request }) => {
      const { user } = request;
      const { id = parentId } = parent;
      return user.id === parentId;
    }
  }
};
