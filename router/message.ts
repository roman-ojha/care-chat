import express from "express";
import { prisma } from "../config/prisma.js";
import { MessageController } from "../controller/messageController.js";

const router = express.Router();
const controller = new MessageController();

router.get("/:category_id", controller.getMessage);

export default router;
