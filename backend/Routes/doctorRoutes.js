
import express from 'express'
const router = express.Router()
import { protectDoctor } from '../Middlewares/authMiddlewares.js'
import { Specialisations, updateProfile, mailValidation, doctorSignup, viewSlots, addNewSlot, doctorLogin, logoutDoctor, forget } from '../Controller/doctorController.js'

router.get('/decodeToken', protectDoctor)

router.get('/getspecialisation', Specialisations)
router.put('/updateProfile', updateProfile)
router.post('/register', doctorSignup)
router.post('/login', doctorLogin)
router.get('/logout', logoutDoctor)
router.get('/mailvalidation/:email', mailValidation)
router.post('/forget_password', forget)
router.get('/getSlots/:id', viewSlots)
router.post('/add_slot', addNewSlot)

export default router;