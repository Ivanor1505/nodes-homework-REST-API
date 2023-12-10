import express from "express";

import authController from "../../controllers/auth-controller.js";

import { authenticate, isEmptyBody, upload } from "../../middlewares/index.js";

import {validateBody} from "../../decorators/validaterBody.js";

import { userRegisterSchema, userLoginSchema, userEmailSchema } from "../../schemas/user-schemas.js";

const authRouter = express.Router();

authRouter.post("/register", isEmptyBody, validateBody(userRegisterSchema), authController.register);

authRouter.get("/verify/:verificationToken", authController.verify);

authRouter.post("/verify", isEmptyBody, validateBody(userEmailSchema), authController.resendVerify);

authRouter.post("/login", isEmptyBody, validateBody(userLoginSchema), authController.login);

authRouter.get("/current", authenticate, authController.getCurrent);

authRouter.post("/logout", authenticate, authController.logout);

authRouter.patch("/avatars", authenticate, upload.single("avatar"), authController.updAvatar);

export default authRouter;