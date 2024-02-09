
import express from 'express'
const router = express.Router()
import {userSignup,userLogin} from '../Controller/userController.js'

router.post('/signup',userSignup)
router.post('/login',userLogin)

export default router;