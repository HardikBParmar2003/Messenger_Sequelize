import { Router } from "express";
import { userController } from "../controller/user.controller";
import cookieParser from "cookie-parser";
import { userMiddleware } from "../middleware/user.middleware";
import { upload } from "../middleware/cloudeinarry.middleware";

export const userRrouter = Router();
userRrouter.use(cookieParser());

userRrouter.post("/sendOtp", upload.none(), userController.requestOTp); // send otp to user

userRrouter.post("/otpVerification", upload.none(), userController.verifyOtp);

userRrouter.post("/signUpUser", upload.none(), userController.create); // new user sign up

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
userRrouter.post("/loginUser", upload.none(), userController.logIn);

userRrouter.delete(
  "/logOutUser",
  userMiddleware.isAuthorizedUser,
  userController.logOutUser
); // log out current log in user

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
userRrouter.post(
  "/findUser",
  userMiddleware.isAuthorizedUser,
  upload.none(),
  userController.findUser
); // find user bu email first name or last name

userRrouter.get(
  "/getIndividualUser/:user_id",
  userMiddleware.isAuthorizedUser,
  userController.getUserDetails
); // get data of individual user from user_id

userRrouter.get(
  "/getGroupChatWithUser/:group_id",
  userMiddleware.isAuthorizedUser,
  userController.getUserWithChat
); //get all user who chatted in group al least once along with their name and details it will help for getting messages in group along with sender

userRrouter.put(
  "/updateUserDetails",
  userMiddleware.isAuthorizedUser,
  upload.single("profile"),
  userController.updateUser
); // update user details

userRrouter.post(
  "/generatePDFPersonalChat",
  userMiddleware.isAuthorizedUser,
  userController.generatePDFPersonalChat
);
userRrouter.get(
  "/generatePDFGroupChat/:group_id",
  userMiddleware.isAuthorizedUser,
  userController.generatePDFGroupChat
);
