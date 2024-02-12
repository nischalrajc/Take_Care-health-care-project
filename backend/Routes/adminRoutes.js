import express from 'express'
const router = express.Router()
import { loginAdmin } from '../Controller/adminController.js'

router.post('/login',loginAdmin)

export default router