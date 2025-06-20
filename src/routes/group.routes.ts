import { Router } from "express";
import cookieParser from "cookie-parser";
import { upload } from "../middleware/cloudeinarry.middleware";
import { userMiddleware } from "../middleware/user.middleware";
import { groupController } from "../controller/group.controller";
export const groupRouter = Router();
groupRouter.use(cookieParser());

groupRouter.post(
    "/createGroup",
    userMiddleware.isAuthorizedUser,
    upload.none(),
    groupController.createGroup
  ); // create group
  
  groupRouter.get(
    "/getGroups",
    userMiddleware.isAuthorizedUser,  
    groupController.getGroups
  ); // get all group in which logged in user is member does not matter that is user chatted or not
  
  groupRouter.put(
    "/updateGroupDetails/:group_id",
    userMiddleware.isAuthorizedUser,
    upload.single("profile"),
    groupController.updateGroupData
  );

  groupRouter.delete("/deleteGroup/:group_id",groupController.deleteGroup)