import express from "express";
import userRouter from "./user.js";

const router = express.Router();

router.use("/user", userRouter);

console.log(process.env.PORT);
router.get("/", (req, res) => {
  res.render("index", { api_port: process.env.PORT });
});

export default router;
