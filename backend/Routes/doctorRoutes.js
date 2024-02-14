
import express from 'express'
const router = express.Router()
import {doctorSignup,doctorLogin,logoutDoctor} from '../Controller/doctorController.js'

router.post('/register',doctorSignup)
router.post('/login',doctorLogin)
router.get('/logout',logoutDoctor)

export default router;