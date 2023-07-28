import express from "express";
import { prisma } from "../config/prisma.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { username } = req.body;
  const resUser = await prisma.user.create({ data: { username: username } });
  res.send(resUser);
});

export default router;
