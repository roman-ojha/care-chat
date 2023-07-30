import { Request, Response } from "express";
import { prisma } from "../config/prisma.js";
import { response } from "../utils/response.js";

class UserController {
  async createUser(req: Request, res: Response) {
    try {
      const { phone_no_id } = req.body;
      if (!phone_no_id) {
        return res.status(406).send(
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
        return res.status(406).send(
          response({
            success: false,
            msg: "User with given Phone no Id Already been created",
          })
        );
      }
      const resUser = await prisma.user.create({
        data: { phone_no_id },
      });
      return res.send(
        response({ success: true, msg: "User Created Successfully" })
      );
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
