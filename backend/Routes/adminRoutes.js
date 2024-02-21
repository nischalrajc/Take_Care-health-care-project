import express from 'express'
const router = express.Router()
import { protectAdmin } from '../Middlewares/authMiddlewares.js'
import { loginAdmin, getUsers, blockUser, unblockUser, getAllDoctors, doctorsRequest, acceptDoctorRequest, rejectDoctorRequest, logoutAdmin } from '../Controller/adminController.js'

router.get('/decodeToken',protectAdmin)

router.post('/login', loginAdmin)
router.get('/users', getUsers)
router.put('/block_user/:id', blockUser)
router.put('/unblock_user/:id', unblockUser)
router.get('/doctors_request', doctorsRequest)
router.get('/doctors', getAllDoctors)
router.put('/doctor_Accept/:id',acceptDoctorRequest)
router.put('/doctor_reject/:id', rejectDoctorRequest)
router.get('/logout', logoutAdmin)

export default router