import express from "express";
import userRouter from "./user.js";

const router = express.Router();

router.use("/user", userRouter);

router.get("/", (req, res) => {
  res.render("index", {});
});

export default router;
