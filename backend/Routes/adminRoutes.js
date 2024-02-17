import express from 'express'
const router = express.Router()
import { protectAdmin } from '../Middlewares/authMiddlewares.js'
import { loginAdmin, getUsers, blockUser, unblockUser, getAllDoctors, doctorsRequest, acceptDoctorRequest, rejectDoctorRequest, logoutAdmin } from '../Controller/adminController.js'

router.post('/login', loginAdmin)
router.get('/users', protectAdmin, getUsers)
router.put('/block_user/:id', blockUser)
router.put('/unblock_user/:id', unblockUser)
router.get('/doctors_request', protectAdmin, doctorsRequest)
router.get('/doctors', protectAdmin, getAllDoctors)
router.put('/doctor_Accept/:id',protectAdmin,acceptDoctorRequest)
router.put('/doctor_reject/:id', rejectDoctorRequest)
router.get('/logout', protectAdmin, logoutAdmin)

export default router