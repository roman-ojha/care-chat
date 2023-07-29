import { Server } from "socket.io";
import { prisma } from "./config/prisma.js";

export function handleSocket(io: Server) {
  io.on("connect", (socket) => {
    // console.log(socket);
    socket.on(
      "send-message",
      async (messageInfo: { username: string; message: string }, cb) => {
        const userRes = await prisma.user.findFirst({
          where: {
            username: messageInfo.username,
          },
        });
        if (!userRes) {
          cb({
            success: false,
            msg: "UnAuthorized User",
          });
          return;
        }
        const resCreateChat = await prisma.chat.create({
          data: {
            user_id: userRes.id,
            category_id: 1, // group category
            desc: messageInfo.message,
          },
          select: {
            id: true,
            desc: true,
          },
        });
        socket.broadcast.emit("send-message-client", {
          username: userRes.username,
          message: messageInfo.message,
        });
        // socket.to("group").emit("send-message-client", {
        //   username: userRes.username,
        //   message: messageInfo.message,
        // });
        cb({
          success: true,
          data: resCreateChat,
        });
      }
    );
    // socket.on("join-room", (name, cb) => {
    //   socket.join(name);
    //   cb(`joined on ${name}`);
    // });
  });
}
