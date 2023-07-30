import { Request, Response } from "express";
import { prisma } from "../config/prisma.js";
import { response } from "../utils/response.js";

class CategoryController {
  async getCategory(req: Request, res: Response) {
    try {
      const categories = await prisma.category.findMany({
        select: {
          id: true,
          name: true,
        },
      });
      return res.send(categories);
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

export { CategoryController };
