import { Router } from "express";
import cookieParser from "cookie-parser";
import { uploadDocument } from "../middleware/cloudeinarry.middleware";
import { userMiddleware } from "../middleware/user.middleware";
import { statusController } from "../controller/status.controller";
export const statusRouter = Router();
statusRouter.use(cookieParser());

statusRouter.post(
  "/uploadStatus",
  userMiddleware.isAuthorizedUser,
  uploadDocument.single("status"),
  statusController.uploadStatus
);

statusRouter.delete(
  "/deleteStatus/:status_id",
  userMiddleware.isAuthorizedUser,
  statusController.deleteStatus
);

statusRouter.get(
  "/getUserStatus",
  userMiddleware.isAuthorizedUser,
  statusController.getUserStatus
);

statusRouter.get(
  "/getUserStatus/:user_id",
  userMiddleware.isAuthorizedUser,
  statusController.getUserStatus
);

statusRouter.get(
  "/getAllStatus",
  userMiddleware.isAuthorizedUser,
  statusController.getAllStatus
);

statusRouter.get(
  "/getSearchStatus/:value",
  userMiddleware.isAuthorizedUser,
  statusController.searchStatus
);


// This is status routes file !!!