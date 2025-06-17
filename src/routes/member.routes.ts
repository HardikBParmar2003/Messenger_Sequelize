import { Router } from "express";
import cookieParser from "cookie-parser";
import { upload } from "../middleware/cloudeinarry.middleware";
import { userMiddleware } from "../middleware/user.middleware";
import { memberController } from "../controller/member.controller";
export const memberRouter = Router();
memberRouter.use(cookieParser());

memberRouter.post(
    "/addToGroup",
    userMiddleware.isAuthorizedUser,
    upload.none(),
    memberController.addUser
  ); // add user to group
  
  memberRouter.delete(
    "/removeUserFromGroup",
    userMiddleware.isAuthorizedUser,
    memberController.removeUser
  ); //remove user from group