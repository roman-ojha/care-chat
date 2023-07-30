import express from "express";
import userRouter from "./user.js";
import messageRouter from "./message.js";
import categoryRouter from "./category.js";

const router = express.Router();

router.use("/api/user", userRouter);
router.use("/api/message", messageRouter);
router.use("/api/category", categoryRouter);

router.get("/", (req, res) => {
  res.send("Hello this is care chat app");
});

export default router;
