import express from "express";
import { prisma } from "../config/prisma.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { phone_no_id } = req.body;
    if (!phone_no_id) {
      return res.status(400).send({ msg: "Phone no Id is required" });
    }
    const checkUser = await prisma.user.findFirst({
      where: { phone_no_id: phone_no_id },
    });
    if (checkUser) {
      return res
        .status(400)
        .send({ msg: "Phone no Id Already exist please use another one" });
    }
    const resUser = await prisma.user.create({
      data: { phone_no_id: "x" },
    });
    return res.send({ username: `CARE-${resUser.id}-${resUser.phone_no_id}` });
  } catch (err) {
    return res
      .status(500)
      .send({ msg: "Something went wrong, please try again later" });
  }
});

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
