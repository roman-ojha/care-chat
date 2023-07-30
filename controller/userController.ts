import { Request, Response } from "express";
import { prisma } from "../config/prisma.js";

class UserController {
  async createUser(req: Request, res: Response) {
    try {
      const { phone_no_id } = req.body;
      if (!phone_no_id) {
        return res.status(400).send({ msg: "Phone no Id is required" });
      }
      const checkUser = await prisma.user.findFirst({
        where: { phone_no_id: phone_no_id },
      });
      if (checkUser) {
        return res
          .status(400)
          .send({ msg: "Phone no Id Already exist please use another one" });
      }
      const resUser = await prisma.user.create({
        data: { phone_no_id: "x" },
      });
      return res.send({
        username: `CARE-${resUser.id}-${resUser.phone_no_id}`,
      });
    } catch (err) {
      return res
        .status(500)
        .send({ msg: "Something went wrong, please try again later" });
    }
  }
}

export { UserController };
