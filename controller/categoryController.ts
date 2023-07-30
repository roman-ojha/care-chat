import { Request, Response } from "express";
import { prisma } from "../config/prisma.js";

class CategoryController {
  async getCategory(req: Request, res: Response) {
    try {
      const categories = await prisma.category.findMany();
      return res.send(categories);
    } catch (err) {
      return res
        .status(500)
        .send({ msg: "Something went wrong, please try again later" });
    }
  }
}

export { CategoryController };
