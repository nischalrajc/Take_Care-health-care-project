
import express from 'express'
const router = express.Router()
import {userSignup,userLogin,register_user,logOut} from '../Controller/userController.js'
import { protectUser } from '../Middlewares/authMiddlewares.js'

router.post('/signup',userSignup)
router.post('/login',userLogin)
router.get('/logout',protectUser,logOut)
router.post('/register_user',register_user)

export default router;