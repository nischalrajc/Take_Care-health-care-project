import express from 'express'
const router = express.Router()
import { protectAdmin } from '../Middlewares/authMiddlewares.js'
import { validateAdmin } from '../Middlewares/validationMiddlewares.js'
import { loginAdmin, getUsers, blockUser, unblockUser, getAllDoctors, getUserData, getDoctorData, viewDoctorDetails, getTransactions, updateDoctor, deleteDoctor, doctorsRequest, acceptDoctorRequest, rejectDoctorRequest, addDoctors, specialisations, viewSpecialisation, updateSpecialisation, addSpecialisation, logoutAdmin } from '../Controller/adminController.js'

router.get('/decodeToken', protectAdmin)

router.post('/login', loginAdmin)
router.get('/users', validateAdmin, getUsers)
router.put('/block_user/:id', validateAdmin, blockUser)
router.put('/unblock_user/:id', validateAdmin, unblockUser)

router.get('/doctors', validateAdmin, getAllDoctors)
router.get('/viewDoctorDetails/:id', validateAdmin, viewDoctorDetails)
router.get('/doctors_request', validateAdmin, doctorsRequest)
router.put('/doctor_Accept/:id', validateAdmin, acceptDoctorRequest)
router.put('/doctor_reject/:id', validateAdmin, rejectDoctorRequest)
router.delete('/delete_doctor/:id', validateAdmin, deleteDoctor)
router.post('/add_doctors', validateAdmin, addDoctors)
router.put('/updateDoctor/', validateAdmin, updateDoctor)

router.get('/specialisations', validateAdmin, specialisations)
router.get('/viewSpecialisation/:id', validateAdmin, viewSpecialisation)
router.put('/updateSpecialisation', validateAdmin, updateSpecialisation)
router.post('/add_specialisation', validateAdmin, addSpecialisation)

router.get('/usersData', validateAdmin, getUserData)
router.get('/doctorData', validateAdmin, getDoctorData)

router.get('/transactions', validateAdmin, getTransactions)

router.get('/logout', logoutAdmin)

export default router