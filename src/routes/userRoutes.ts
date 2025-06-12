import {Router} from 'express'
import { userController } from '../controller/user.controller'
import { groupController } from '../controller/group.controller'
import cookieParser from 'cookie-parser'

export const router = Router()
router.use(cookieParser())
router.get("/",(req,res)=>{
    res.send("hello from router")
})

router.post("/sendOtp",userController.requestOTp)

router.post("/otpVerification",userController.verifyOtp)

router.post("/signUpUser",userController.create)

router.post("/loginUser",userController.logIn)

router.post("/findUser",userController.findUser)

router.post("/createGroup/:id",groupController.createGroup)

router.post("/addToGroup/:member_id",groupController.addUser)









