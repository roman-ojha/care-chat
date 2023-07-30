import { Request, Response } from "express";
import { prisma } from "../config/prisma.js";
import { response } from "../utils/response.js";

class UserController {
  async createUser(req: Request, res: Response) {
    try {
      const { phone_no_id } = req.body;
      if (!phone_no_id) {
        return res.status(400).send(
          response({
            success: true,
            msg: "Phone no Id is required",
          })
        );
      }
      const isUser = await prisma.user.findFirst({
        where: { phone_no_id: phone_no_id },
      });
      if (isUser) {
        return res.status(400).send(
          response({
            success: false,
            msg: "Phone no Id Already exist please use another one",
          })
        );
      }
      const resUser = await prisma.user.create({
        data: { phone_no_id: "x" },
      });
      return res.send({
        username: `CARE-${resUser.id}-${resUser.phone_no_id}`,
      });
    } catch (err) {
      return res.status(500).send(
        response({
          success: false,
          msg: "Something went wrong, please try again later",
        })
      );
    }
  }
}

export { UserController };
