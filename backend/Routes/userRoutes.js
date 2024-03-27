
import express from 'express'
const router = express.Router()
import { userSignup, userLogin, getDoctorDetails, searchdoctor, mailValidation, filterDoctor, getSpecialities, viewSpecialities, getBookingSession, viewSlotsAvailable, scheduledAppointments, bookAppointments, doctorDetails, userEditProfile, forgetpassword, newPassword, register_user, logOut } from '../Controller/userController.js'
import { protectUser } from '../Middlewares/authMiddlewares.js'
import { validateUser } from '../Middlewares/validationMiddlewares.js'

router.get('/decodeToken', protectUser)

router.post('/signup', userSignup)
router.post('/login', userLogin)
router.post('/forget_password', forgetpassword)
router.patch('/newpassword', newPassword)
router.get('/logout', logOut)
router.post('/register_user', register_user)
router.get('/listDoctors', getDoctorDetails)
router.get('/searchDoctors', searchdoctor)
router.post('/filterDoctor', filterDoctor)
router.get('/listSpecialities', getSpecialities)
router.get('/specialities/:id', viewSpecialities)
router.get('/doctorDetails/:id', doctorDetails)
router.put('/editProfile', validateUser, userEditProfile)
router.get('/available_slots/', validateUser, viewSlotsAvailable)
router.post('/checkout-session', validateUser, getBookingSession)
router.get('/book_doctor/', validateUser, bookAppointments)
router.get('/resend_OTP/:email', mailValidation)
router.get('/scheduled_appointments/:id', validateUser, scheduledAppointments)


export default router;