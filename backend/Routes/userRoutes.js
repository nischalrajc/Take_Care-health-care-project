
import express from 'express'
const router = express.Router()
import { userSignup, userLogin, getDoctorDetails, getSpecialities, viewSpecialities, forgetpassword, newPassword, register_user, logOut } from '../Controller/userController.js'
import { protectUser } from '../Middlewares/authMiddlewares.js'

router.get('/decodeToken', protectUser)

router.post('/signup', userSignup)
router.post('/login', userLogin)
router.post('/forget_password', forgetpassword)
router.patch('/newpassword', newPassword)
router.get('/logout', logOut)
router.post('/register_user', register_user)
router.get('/listDoctors', getDoctorDetails)
router.get('/listSpecialities', getSpecialities)
router.get('/specialities/:id', viewSpecialities)


export default router;