import express from "express";
import { CategoryController } from "../controller/categoryController.js";

const router = express.Router();
const controller = new CategoryController();

router.get("/", controller.getCategory);

export default router;
