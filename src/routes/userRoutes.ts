import {Router} from 'express'
import { userController } from '../controller/user.controller'
import { groupController } from '../controller/group.controller'
import cookieParser from 'cookie-parser'
import { userMiddleware } from '../middleware/user.middleware'
import { memberController } from '../controller/member.controller'

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

router.post("/createGroup/:id",userMiddleware.isAuthorizedUser,groupController.createGroup)

router.post("/addToGroup",userMiddleware.isAuthorizedUser,memberController.addUser)






  







