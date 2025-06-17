import { Router } from "express";
import { userController } from "../controller/user.controller";
import { groupController } from "../controller/group.controller";
import cookieParser from "cookie-parser";
import { userMiddleware } from "../middleware/user.middleware";
import { memberController } from "../controller/member.controller";
import { chatController } from "../controller/chat.controller";
import { upload, uploadDocument } from "../middleware/cloudeinarry.middleware";
import { statusController } from "../controller/status.controller";

export const router = Router();
router.use(cookieParser());

router.post("/sendOtp", upload.none(), userController.requestOTp); // send otp to user

router.post("/otpVerification", upload.none(), userController.verifyOtp);

router.post("/signUpUser", upload.none(), userController.create); // new user sign up

/**
 * @swagger
 * /loginUser:
 *   post:
 *     summary: User login
 *     description: Logs in user and sets JWT token in cookie.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: yourPassword123
 *     responses:
 *       200:
 *         description: Successful login, JWT token set in cookie.
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       401:
 *         description: Invalid credentials or unauthorized
 *       500:
 *         description: Server error or login failed
 */
router.post("/loginUser", upload.none(), userController.logIn);

/**
 * @swagger
 * /findUser:
 *   post:
 *     summary: Find users by email, first name, or last name
 *     description: Returns a list of users matching the search value.
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - value
 *             properties:
 *               value:
 *                 type: string
 *                 description: Search string to match against first name, last name or email
 *                 example: john
 *     responses:
 *       200:
 *         description: List of matching users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   user_id:
 *                     type: integer
 *                     example: 1
 *                   first_name:
 *                     type: string
 *                     example: John
 *                   last_name:
 *                     type: string
 *                     example: Doe
 *                   email:
 *                     type: string
 *                     example: john.doe@example.com
 *       401:
 *         description: Unauthorized - invalid or missing JWT token
 */
router.post(
  "/findUser",
  userMiddleware.isAuthorizedUser,
  upload.none(),
  userController.findUser
); // find user bu email first name or last name

router.get(
  "/getIndividualUser/:user_id",
  userMiddleware.isAuthorizedUser,
  userController.getUserDetails
); // get data of individual user from user_id

router.get(
  "/getGroupChatWithUser/:group_id",
  userMiddleware.isAuthorizedUser,
  userController.getUserWithChat
); //get all user who chatted in group al least once along with their name and details it will help for getting messages in group along with sender

router.put(
  "/updateUserDetails",
  userMiddleware.isAuthorizedUser,
  upload.single("profile"),
  userController.updateUser
); // update user details

router.delete(
  "/logOutUser",
  userMiddleware.isAuthorizedUser,
  userController.logOutUser
); // log out current log in user

router.post(
  "/createGroup",
  userMiddleware.isAuthorizedUser,
  upload.none(),
  groupController.createGroup
); // create group

router.get(
  "/getGroups",
  userMiddleware.isAuthorizedUser,
  groupController.getGroups
); // get all group in which logged in user is member does not matter that is user chatted or not

router.put(
  "/updateGroupDetails/:group_id",
  userMiddleware.isAuthorizedUser,
  upload.single("profile"),
  groupController.updateGroupData
);

router.post(
  "/addToGroup",
  userMiddleware.isAuthorizedUser,
  upload.none(),
  memberController.addUser
); // add user to group

router.delete(
  "/removeUserFromGroup",
  userMiddleware.isAuthorizedUser,
  memberController.removeUser
); //remove user from group

router.post(
  "/personalChat/:receiver_id",
  userMiddleware.isAuthorizedUser,
  upload.none(),
  chatController.addPersonalChat
); // add personal chat to chat table

router.post(
  "/groupChat/:group_id",
  userMiddleware.isAuthorizedUser,
  upload.none(),
  chatController.addGroupChat
); //add group chat message into  chat table

router.get(
  "/userChat/:user_id",
  userMiddleware.isAuthorizedUser,
  chatController.getUserChat
); // get personal chat with user_id provided by loged inuser

router.get(
  "/getAllChattingUser",
  userMiddleware.isAuthorizedUser,
  chatController.getAllChattingUser
); //all user who chatted with log in user personal chat user

router.post(
  "/uploadStatus",
  userMiddleware.isAuthorizedUser,
  uploadDocument.single("status"),
  statusController.uploadStatus
);

router.delete(
  "/deleteStatus/:status_id",
  userMiddleware.isAuthorizedUser,
  statusController.deleteStatus
);

router.post(
  "/generatePDFPersonalChat",
  userMiddleware.isAuthorizedUser,
  userController.generatePDFPersonalChat
);
router.get(
  "/generatePDFGroupChat/:group_id",
  userMiddleware.isAuthorizedUser,
  userController.generatePDFGroupChat
);
