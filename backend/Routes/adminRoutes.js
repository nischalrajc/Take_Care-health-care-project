import express from 'express'
const router = express.Router()
import { protectAdmin } from '../Middlewares/authMiddlewares.js'
import { loginAdmin,getUsers,getAllDoctors,doctorsRequest,acceptDoctorRequest,logoutAdmin } from '../Controller/adminController.js'

router.post('/login',loginAdmin)
router.get('/users',protectAdmin,getUsers)
router.get('/doctors_request',protectAdmin,doctorsRequest)
router.get('/doctors',protectAdmin,getAllDoctors)
router.put('/doctors_request/:id',protectAdmin,acceptDoctorRequest)
router.get('/logout',protectAdmin,logoutAdmin)

export default router