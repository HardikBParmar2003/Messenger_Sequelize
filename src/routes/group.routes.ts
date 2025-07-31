import { Router } from "express";
import cookieParser from "cookie-parser";
import { upload } from "../middleware/cloudeinarry.middleware";
import { userMiddleware } from "../middleware/user.middleware";
import { groupController } from "../controller/group.controller";
import { permission } from "process";
import { permissionMiddleware } from "../middleware/permission.middleware";
export const groupRouter = Router();
groupRouter.use(cookieParser());

groupRouter.post(
    "/createGroup",
    userMiddleware.isAuthorizedUser,
    upload.none(),
    groupController.createGroup
  ); 
  
  groupRouter.get(
    "/getGroups",
    userMiddleware.isAuthorizedUser,  
    groupController.getGroups
  ); // get all group in which logged in user is member does not matter that is user chatted or not
  
  groupRouter.put(
    "/updateGroupDetails/:group_id",
    userMiddleware.isAuthorizedUser,
    permissionMiddleware.updatePermission,
    upload.single("profile"),
    groupController.updateGroupData
  );

  groupRouter.get("/getGroupDetail/:group_id",userMiddleware.isAuthorizedUser,groupController.getGroupData)
  groupRouter.get("/getgroupUser/:group_id",userMiddleware.isAuthorizedUser,groupController.getGroupUsers)

  groupRouter.delete("/deleteGroup/:group_id",userMiddleware.isAuthorizedUser,permissionMiddleware.deletePermission,groupController.deleteGroup)

