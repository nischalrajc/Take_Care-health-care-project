
import express from 'express'
const router = express.Router()
import {userSignup,userLogin,sendEmail,logOut} from '../Controller/userController.js'
import { protectUser } from '../Middlewares/authMiddlewares.js'

router.post('/signup',protectUser,userSignup)
router.post('/login',userLogin)
router.get('/logout',protectUser,logOut)
router.post('/getOtp',sendEmail)
router.post('/resend_OTP',sendEmail)

export default router;