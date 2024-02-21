
import express from 'express'
const router = express.Router()
import {doctorSignup,doctorLogin,logoutDoctor,forget} from '../Controller/doctorController.js'

router.post('/register',doctorSignup)
router.post('/login',doctorLogin)
router.get('/logout',logoutDoctor)
router.post('/forget_password',forget)

export default router;