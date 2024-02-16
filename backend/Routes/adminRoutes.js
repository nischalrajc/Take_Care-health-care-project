import express from 'express'
const router = express.Router()
import { protectAdmin } from '../Middlewares/authMiddlewares.js'
import { loginAdmin, getUsers, blockUser, unblockUser, getAllDoctors, doctorsRequest, acceptDoctorRequest, logoutAdmin } from '../Controller/adminController.js'

router.post('/login', loginAdmin)
router.get('/users', protectAdmin, getUsers)
router.put('/block_user/:id', blockUser)
router.put('/unblock_user/:id', unblockUser)
router.get('/doctors_request', protectAdmin, doctorsRequest)
router.get('/doctors', protectAdmin, getAllDoctors)
router.put('/doctors_request/:id', acceptDoctorRequest)
router.get('/logout', protectAdmin, logoutAdmin)

export default router