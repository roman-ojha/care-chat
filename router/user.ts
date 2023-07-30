import express from "express";
import { prisma } from "../config/prisma.js";
import { UserController } from "../controller/userController.js";

const router = express.Router();
const controller = new UserController();

router.post("/", controller.createUser);

// router.get("/check/:username", async (req, res) => {
//   try {
//     const isUser = await prisma.user.findFirst({
//       where: {
//         username: req.params.username,
//       },
//       select: {
//         id: true,
//         username: true,
//       },
//     });
//     if (!isUser) {
//       return res.status(400).send({ msg: "UnAuthorized User" });
//     }
//     return res.send(isUser);
//   } catch (err) {
//     return res
//       .status(500)
//       .send({ msg: "Something went wrong please try again later" });
//   }
// });

export default router;
