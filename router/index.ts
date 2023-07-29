import express from "express";
import userRouter from "./user.js";
import messageRouter from "./message.js";

const router = express.Router();

router.use("/api/user", userRouter);
router.use("/api/message", messageRouter);

router.get("/", (req, res) => {
  res.render("index", { apiBaseUrl: process.env.API_BASE_URL });
});

export default router;
