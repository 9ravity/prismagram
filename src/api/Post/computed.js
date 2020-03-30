export default {
  Post: {
    isLiked: async (parent, _, { request }) => {
      const { user } = request;
      const { id } = parent; // image의 id를 받기
      return prisma.$exists.like({
        AND: [
          {
            user: {
              id: user.id
            }
          },
          {
            post: {
              id
            }
          }
        ]
      });
    },
    likeCount: parent =>
      prisma
        .likesConnection({ where: { post: parent.id } })
        .aggregate()
        .count()
  }
};
