
import express from 'express'
const router = express.Router()
import { protectDoctor } from '../Middlewares/authMiddlewares.js'
import { validateAdmin } from '../Middlewares/validationMiddlewares.js'
import { Specialisations, updateProfile, mailValidation, doctorSignup, viewSlots, addNewSlot, setNewPassword , doctorLogin ,logoutDoctor, forget } from '../Controller/doctorController.js'

router.get('/decodeToken', protectDoctor)

router.get('/getspecialisation', Specialisations)
router.post('/register', doctorSignup)
router.post('/login', doctorLogin)
router.get('/mailvalidation/:email', mailValidation)
router.post('/forget_password', forget)
router.get('/logout', validateAdmin , logoutDoctor)
router.put('/updateProfile', validateAdmin , updateProfile)
router.get('/getSlots/:id', validateAdmin , viewSlots)
router.post('/add_slot', validateAdmin , addNewSlot)
router.patch('/newpassword' , setNewPassword)

export default router;