import {Router} from 'express'
import { userController } from '../controller/user.controller'
import { groupController } from '../controller/group.controller'
import cookieParser from 'cookie-parser'
import { userMiddleware } from '../middleware/user.middleware'
import { memberController } from '../controller/member.controller'
import { chatController } from '../controller/chat.controller'

export const router = Router()
router.use(cookieParser())
router.get("/",(req,res)=>{
    res.send("hello from router")
})

router.post("/sendOtp",userController.requestOTp)

router.post("/otpVerification",userController.verifyOtp)

router.post("/signUpUser",userController.create)

router.post("/loginUser",userController.logIn)

router.post("/findUser",userMiddleware.isAuthorizedUser,userController.findUser)

router.post("/createGroup",userMiddleware.isAuthorizedUser,groupController.createGroup)

router.post("/addToGroup",userMiddleware.isAuthorizedUser,memberController.addUser)

router.get("/getIndividualUser/:user_id",userMiddleware.isAuthorizedUser,userController.getUserDetails)

router.get("/getGroups",userMiddleware.isAuthorizedUser,groupController.getGroups)

router.post("/personalChat/:receiver_id",userMiddleware.isAuthorizedUser,chatController.addPersonalChat)

router.post("/groupChat/:group_id",userMiddleware.isAuthorizedUser,chatController.addGroupChat)

router.get("/userChat/:user_id",userMiddleware.isAuthorizedUser,chatController.getUserChat)

router.get("/getGroupChatWithUser/:group_id",userMiddleware.isAuthorizedUser,userController.getUserWithChat)

router.get("/getAllChattingUser",userMiddleware.isAuthorizedUser,chatController.getAllChattingUser)








  







