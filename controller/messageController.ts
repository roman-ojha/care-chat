import { Request, Response } from "express";
import { prisma } from "../config/prisma.js";
import { response } from "../utils/response.js";

class MessageController {
  async getMessage(req: Request, res: Response) {
    try {
      const category_id = parseInt(req.params.category_id);
      const messages = await prisma.chat.findMany({
        where: {
          category_id: category_id,
        },
        select: {
          user: {
            select: {
              id: true,
            },
          },
          id: true,
          desc: true,
        },
        take: 20,
        orderBy: {
          created_at: "desc",
        },
      });
      return res.send(messages);
    } catch (err) {
      return res
        .status(500)
        .send(
          response({
            success: false,
            msg: "Something went wrong please try again later",
          })
        );
    }
  }
}

export { MessageController };
