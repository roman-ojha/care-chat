import express from "express";
import { prisma } from "../config/prisma.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const categories = await prisma.category.findMany();
    return res.send(categories);
  } catch (err) {
    return res
      .status(500)
      .send({ msg: "Something went wrong, please try again later" });
  }
});

export default router;
