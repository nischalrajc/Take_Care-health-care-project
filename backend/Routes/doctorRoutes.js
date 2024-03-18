
import express from 'express'
const router = express.Router()
import { protectDoctor } from '../Middlewares/authMiddlewares.js'
import { validateDoctor } from '../Middlewares/validationMiddlewares.js'
import { Specialisations, updateProfile, mailValidation, doctorSignup, viewSlots, addNewSlot, setNewPassword , doctorLogin ,logoutDoctor, forget } from '../Controller/doctorController.js'

router.get('/decodeToken', protectDoctor)

router.get('/getspecialisation', Specialisations)
router.post('/register', doctorSignup)
router.post('/login', doctorLogin)
router.get('/mailvalidation/:email', mailValidation)
router.post('/forget_password', forget)
router.get('/logout', validateDoctor , logoutDoctor)
router.put('/updateProfile', validateDoctor , updateProfile)
router.get('/getSlots/:id', validateDoctor , viewSlots)
router.post('/add_slot', validateDoctor , addNewSlot)
router.patch('/newpassword' , setNewPassword)

export default router;