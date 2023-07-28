import { Server } from "socket.io";

export function handleSocket(io: Server) {
  io.on("connect", (socket) => {
    console.log(socket);
  });
}
