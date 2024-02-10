
import express from 'express'
const router = express.Router()
import {doctorSignup} from '../Controller/doctorController.js'

router.post('/register',doctorSignup)

export default router;