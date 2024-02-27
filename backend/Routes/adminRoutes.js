import express from 'express'
const router = express.Router()
import { protectAdmin } from '../Middlewares/authMiddlewares.js'
import { loginAdmin, getUsers, blockUser, unblockUser, getAllDoctors, viewDoctorDetails, updateDoctor, deleteDoctor, doctorsRequest, acceptDoctorRequest, rejectDoctorRequest, addDoctors, specialisations , addSpecialisation , logoutAdmin } from '../Controller/adminController.js'

router.get('/decodeToken', protectAdmin)

router.post('/login', loginAdmin)
router.get('/users', getUsers)
router.put('/block_user/:id', blockUser)
router.put('/unblock_user/:id', unblockUser)

router.get('/doctors_request', doctorsRequest)
router.put('/doctor_Accept/:id', acceptDoctorRequest)
router.put('/doctor_reject/:id', rejectDoctorRequest)
router.get('/doctors', getAllDoctors)
router.get('/viewDoctorDetails/:id', viewDoctorDetails)
router.put('/updateDoctor/', updateDoctor)
router.delete('/delete_doctor/:id', deleteDoctor)
router.post('/add_doctors', addDoctors)

router.get('/specialisations',specialisations)
router.post('/add_specialisation',addSpecialisation)

router.get('/logout', logoutAdmin)

export default router