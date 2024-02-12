import express from 'express'
const router = express.Router()
import { loginAdmin,getUsers,getAllDoctors,doctorsRequest,acceptDoctorRequest } from '../Controller/adminController.js'

router.post('/login',loginAdmin)
router.get('/users',getUsers)
router.get('/doctors_request',doctorsRequest)
router.get('/doctors',getAllDoctors)
router.put('/doctors_request/:id',acceptDoctorRequest)

export default router