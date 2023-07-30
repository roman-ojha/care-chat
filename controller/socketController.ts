import { prisma } from "../config/prisma.js";
import { Socket } from "socket.io";

class SocketHandler {
  async sendMessage(
    socket: Socket,
    messageInfo: { phone_no_id: string; message: string; category_id: number },
    cb
  ) {
    const { phone_no_id, message, category_id } = messageInfo;
    if (!phone_no_id) {
      return cb({
        success: false,
        msg: "phone_no_id field is required",
      });
    }
    if (!message) {
      return cb({
        success: false,
        msg: "message field is required",
      });
    }
    if (!category_id) {
      return cb({
        success: false,
        msg: "category_id field is required",
      });
    }
    const userRes = await prisma.user.findFirst({
      where: {
        phone_no_id,
      },
      select: {
        id: true,
        phone_no_id: true,
      },
    });
    if (!userRes) {
      return cb({
        success: false,
        msg: "UnAuthorized User",
      });
    }
    const categoryRes = await prisma.category.findFirst({
      where: {
        id: category_id,
      },
      select: {
        id: true,
        name: true,
      },
    });
    if (!categoryRes) {
      return cb({
        success: false,
        msg: "Give category_id doesn't exist",
      });
    }
    const resCreateChat = await prisma.chat.create({
      data: {
        user_id: userRes.id,
        category_id: category_id,
        desc: message,
      },
      select: {
        id: true,
        desc: true,
      },
    });
    socket.broadcast.emit("send-message-client", {
      user: userRes,
      category: categoryRes,
      message: messageInfo.message,
    });
    return cb({
      success: true,
      data: resCreateChat,
    });
  }
}

export { SocketHandler };
