import { Router } from "express";
import { userController } from "../controller/user.controller";
import cookieParser from "cookie-parser";
import { userMiddleware } from "../middleware/user.middleware";
import { upload } from "../middleware/cloudeinarry.middleware";

export const userRrouter = Router();
userRrouter.use(cookieParser());

/**
 * @swagger
 * /user/sendOtp:
 *   post:
 *     summary: Request to send OTP at provided email
 *     description: Sends an OTP to the user's email address. Expects `email` in form data.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address to send OTP
 *                 example: hardik@example.com
 *     responses:
 *       200:
 *         description: OTP sent successfully, cookie set
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   description: OTP data object (structure depends on your Otp model)
 *                 message:
 *                   type: string
 *                   example: Mail sent to hardik@example.com successfully
 *       400:
 *         description: User already exists or bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: User already exists. Try with a different email or something went wrong.
 *       500:
 *         description: General server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Something went wrong or email does not exist.
 */
userRrouter.post("/sendOtp", upload.none(), userController.requestOTp); // send otp to user

/**
 * @swagger
 * /user/otpVerification:
 *   post:
 *     summary: Verification of received otp on email
 *     description: Enter OTP which is received on email
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - otp
 *             properties:
 *               otp:
 *                 type: number
 *                 description: OTP received on User's email address
 *                 example: 123456
 *     responses:
 *       200:
 *         description: OTP sent successfully, cookie set
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   description: OTP data object (structure depends on your Otp model)
 *                 message:
 *                   type: string
 *                   example: Mail sent to hardik@example.com successfully
 *       500:
 *         description: Wrong OTP or OTP does not match or server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Enterd OTP is incorrect or something went wrong
 */
userRrouter.post("/otpVerification", upload.none(), userController.verifyOtp);

/**
 * @swagger
 * /user/signUpUser:
 *   post:
 *     summary: User Signup
 *     description: Sign up user y provideing firs name last name and password
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - first_name
 *               - last_name
 *               - password
 *             properties:
 *               first_name:
 *                 type: string
 *                 example: user
 *               last_name:
 *                 type: string
 *                 example: xyz
 *               password:
 *                 type: string
 *                 example: yourPassword123
 *     responses:
 *       201:
 *         description: Successful signup user created
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
userRrouter.post("/signUpUser", upload.none(), userController.create); // new user sign up

/**
 * @swagger
 * /user/loginUser:
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
 *               type: object
 *               data:
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
 *                   password:
 *                     type: string
 *                     example: $2b$10$wmZxbwZ4w1bB7ApSaGM6suhCrH7da
 *                   updatedAt:
 *                     type: string
 *                     example: 2025-06-19T13:02:39.592Z
 *                   createdAt:
 *                     type: string
 *                     example: 2025-06-19T13:02:39.592Z
 *                   profile_photo:
 *                     type: string
 *                     example: null
 *       401:
 *         description: Invalid credentials or unauthorized
 *       500:
 *         description: Server error or login failed
 */
userRrouter.post("/loginUser", upload.none(), userController.logIn);

/**
 * @swagger
 * /user/logOutUser:
 *   delete:
 *     summary: Logout current user
 *     description: Current user will logout using this api
 *     responses:
 *       200:
 *         description: log out successfull
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: null
 *                 message:
 *                   type: string
 *                   example: Successfully log out
 *       500:
 *         description: General server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Something went wrong or email does not exist.
 */
userRrouter.delete(
  "/logOutUser",
  userMiddleware.isAuthorizedUser,
  userController.logOutUser
); // log out current log in user

/**
 * @swagger
 * /user/findUser:
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

/**
 * @swagger
 * /user/getIndividualUser/{user_id}:
 *   get:
 *     summary: Get user details by user ID
 *     description: Get details of a particular user
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         description: The ID of the user to get details for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User details fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     user_id:
 *                       type: integer
 *                       example: 1
 *                     first_name:
 *                       type: string
 *                       example: John
 *                     last_name:
 *                       type: string
 *                       example: Doe
 *                     email:
 *                       type: string
 *                       example: john.doe@example.com
 *                     password:
 *                       type: string
 *                       example: $2b$10$wmZxbwZ4w1bB7ApSaGM6suhCrH7da
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2025-06-19T13:02:39.592Z
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2025-06-19T13:02:39.592Z
 *                     profile_photo:
 *                       type: string
 *                       nullable: true
 *                       example: null
 *                 message:
 *                   type: string
 *                   example: User details fetched successfully
 *       400:
 *         description: Invalid credentials or unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: "null"
 *                   nullable: true
 *                 message:
 *                   type: string
 *                   example: User not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: "null"
 *                   nullable: true
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
userRrouter.get(
  "/getIndividualUser/:user_id",
  userMiddleware.isAuthorizedUser,
  userController.getUserDetails
); // get data of individual user from user_id

/**
 * @swagger
 * /user/getIndividualUser:
 *   get:
 *     summary: Get user details by user ID
 *     description: Get details of a particular user
 *     responses:
 *       200:
 *         description: User details fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     user_id:
 *                       type: integer
 *                       example: 1
 *                     first_name:
 *                       type: string
 *                       example: John
 *                     last_name:
 *                       type: string
 *                       example: Doe
 *                     email:
 *                       type: string
 *                       example: john.doe@example.com
 *                     password:
 *                       type: string
 *                       example: $2b$10$wmZxbwZ4w1bB7ApSaGM6suhCrH7da
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2025-06-19T13:02:39.592Z
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2025-06-19T13:02:39.592Z
 *                     profile_photo:
 *                       type: string
 *                       nullable: true
 *                       example: null
 *                 message:
 *                   type: string
 *                   example: User details fetched successfully
 *       400:
 *         description: Invalid credentials or unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: "null"
 *                   nullable: true
 *                 message:
 *                   type: string
 *                   example: User not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: "null"
 *                   nullable: true
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
userRrouter.get(
  "/getIndividualUser",
  userMiddleware.isAuthorizedUser,
  userController.getUserDetails
);

/**
 * @swagger
 * /user/getGroupChatWithUser/{group_id}:
 *   get:
 *     summary: Get All chat data in group
 *     description: Get all chat messages with users who chatted in group at least once, along with their name and details
 *     parameters:
 *       - in: path
 *         name: group_id
 *         required: true
 *         description: The ID of the group
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Chat data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: this is group message
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2025-06-13T10:30:17.000Z
 *                     sender:
 *                       type: object
 *                       properties:
 *                         user_id:
 *                           type: integer
 *                           example: 1
 *                         first_name:
 *                           type: string
 *                           example: hardik
 *                         last_name:
 *                           type: string
 *                           example: parmar
 *                         profile_photo:
 *                           type: string
 *                           example: https://res.cloudinary.com/duy1xfupo/image/upload/v1750076939/hardik/t1utyvqvv2dgj5tv2dj3.jpg
 *                 message:
 *                   type: string
 *                   example: User details fetched successfully
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: "null"
 *                   nullable: true
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
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
