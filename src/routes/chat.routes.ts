import { Router } from "express";
import cookieParser from "cookie-parser";
import { upload } from "../middleware/cloudeinarry.middleware";
import { userMiddleware } from "../middleware/user.middleware";
import { chatController } from "../controller/chat.controller";
export const chatRouter = Router();
chatRouter.use(cookieParser());

chatRouter.post(
  "/personalChat/:receiver_id",
  userMiddleware.isAuthorizedUser,
  upload.none(),
  chatController.addPersonalChat
); // add personal chat to chat table

chatRouter.post(
  "/groupChat/:group_id",
  userMiddleware.isAuthorizedUser,
  upload.none(),
  chatController.addGroupChat
); //add group chat message into  chat table

chatRouter.get(
  "/userChat/:user_id",
  userMiddleware.isAuthorizedUser,
  chatController.getUserChat
); // get personal chat with user_id provided by loged inuser

chatRouter.get(
  "/getAllChattingUser",
  userMiddleware.isAuthorizedUser,
  chatController.getAllChattingUser
); //all user who chatted with log in user personal chat user
