import { Router } from "express";
import cookieParser from "cookie-parser";
import { callController } from "../controller/call.controller";
import { userMiddleware } from "../middleware/user.middleware";

export const callRouter = Router();
callRouter.use(cookieParser());

callRouter.get("/start/:receiver_id",userMiddleware.isAuthorizedUser,callController.startCall)

callRouter.get("/end/:call_id",userMiddleware.isAuthorizedUser,callController.endCall)
