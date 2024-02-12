import express from 'express'
const router = express.Router()
import { loginAdmin,getUsers,getAllDoctors } from '../Controller/adminController.js'

router.post('/login',loginAdmin)
router.get('/users',getUsers)
router.get('/doctors',getAllDoctors)

export default router