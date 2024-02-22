
import express from 'express'
const router = express.Router()
import { protectDoctor } from '../Middlewares/authMiddlewares.js'
import {updateProfile,doctorSignup,doctorLogin,logoutDoctor,forget} from '../Controller/doctorController.js'

router.get('/decodeToken',protectDoctor)

router.put('/updateProfile' , updateProfile)
router.post('/register',doctorSignup)
router.post('/login',doctorLogin)
router.get('/logout',logoutDoctor)
router.post('/forget_password',forget)

export default router;