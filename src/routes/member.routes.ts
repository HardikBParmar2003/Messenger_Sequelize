import { Router } from "express";
import cookieParser from "cookie-parser";
import { upload } from "../middleware/cloudeinarry.middleware";
import { userMiddleware } from "../middleware/user.middleware";
import { memberController } from "../controller/member.controller";
import { permissionMiddleware } from "../middleware/permission.middleware";
export const memberRouter = Router();
memberRouter.use(cookieParser());

memberRouter.post(
  "/addToGroup",
  upload.none(),
  userMiddleware.isAuthorizedUser,
  permissionMiddleware.addmember,
  memberController.addUser
);

memberRouter.delete(
  "/removeUserFromGroup",
  upload.none(),
  userMiddleware.isAuthorizedUser,
  permissionMiddleware.removeMemberPermission,
  memberController.removeUser
);

memberRouter.get(
  "/leftGroup/:group_id",
  userMiddleware.isAuthorizedUser,
  memberController.leftGroup
);
