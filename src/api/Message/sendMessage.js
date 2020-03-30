import { isAuthenticated } from "../../middlewares";
import { prisma } from "../../../generated/prisma-client";
import { ROOM_FRAGMENT } from "../../fragments";

export default {
  Mutation: {
    sendMessage: async (_, args, { request }) => {
      isAuthenticated(request);
      const { user } = request;
      const { roomId, message, toId } = args;
      let room;
      if (roomId === undefined) {
        if (user.id !== to) {
          // 자신의 방을 만들지 않음, 카톡 처럼 나에게 메시지 없앰
          room = await prisma.createRoom({
            // 만약 roomId 가 없으면 방을 만들고, user 초대
            participants: {
              connect: [{ id: toId }, { id: user.id }]
            }
          });
        }
      } else {
        room = await prisma.room({ id: roomId }).$fragment(ROOM_FRAGMENT);
      }
      if (!room) {
        throw Error("Room not found");
      }
      const getTo = room.participants.filter(
        participant => participant.id !== user.id
      )[0];
      return await prisma.createMessage({
        text: message,
        from: {
          connect: { id: user.id }
        },
        to: {
          connect: {
            id: roomId ? getTo : toId
          }
        },
        room: {
          connect: {
            id: room.id
          }
        }
      });
    }
  }
};
