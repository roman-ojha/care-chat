import { Server } from "socket.io";
import { SocketHandler } from "./controller/socketController.js";

const handler = new SocketHandler();

export function handleSocket(io: Server) {
  io.on("connect", (socket) => {
    socket.on(
      "send-message",
      async (messageInfo, cb) =>
        await handler.sendMessage(socket, messageInfo, cb)
    );
    // socket.on("join-room", (name, cb) => {
    //   socket.join(name);
    //   cb(`joined on ${name}`);
    // });
  });
}
