
import express from 'express'
const router = express.Router()
import {doctorSignup,doctorLogin} from '../Controller/doctorController.js'

router.post('/register',doctorSignup)
router.post('/login',doctorLogin)

export default router;