export default {
  Post: {
    //////////////////////////// 프래그먼트 사용 하지 말고 parent를 받아서 작업 ///////////////////////////
    files: parent => prisma.post({ id: parent.id }).files(),
    comments: parent => prisma.post({ id: parent.id }).comments(),
    user: ({ id }) => prisma.post({ id }).user(), //이렇게 사용해도 됨, parent에서 id를 찾고, id: id로 찾기
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
        .count(),
    commentCount: parent =>
        prisma
          .commentsConnection({ where: { post: parent.id } })
          .aggregate()
          .count()
  }
};
