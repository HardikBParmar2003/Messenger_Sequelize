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
  ); 
  
  memberRouter.delete(
    "/removeUserFromGroup",
    userMiddleware.isAuthorizedUser,
    memberController.removeUser
  ); 

  memberRouter.get("/leftGroup/:group_id",userMiddleware.isAuthorizedUser,memberController.leftGroup)