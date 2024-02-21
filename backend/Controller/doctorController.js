import Doctors from "../Modal/Doctor.js"
import bcrypt from 'bcrypt'
import { generateTokenDoctor } from '../utils/generateToken.js'

export const doctorSignup = async (req, res) => {
    const { name, email, password, phone, gender, specialisation, bio } = req.body
    try {
        const existingDoctor = await Doctors.findOne({ email })
        if (existingDoctor) {
            return res.json({ error: "doctor already exist" });
        }

        const doctor = await Doctors.create({
            name: name,
            gender: gender,
            email: email,
            phoneNumber: phone,
            password: password,
            specialisation: specialisation,
            bio: bio,
            authorised: false
        })

        res.status(201).json({ message: "Signed in successfully" })

    } catch (error) {
        console.log("error", error)
    }
}

export const doctorLogin = async (req, res) => {
    const { email, password } = req.body
    try {
        const doctor = await Doctors.findOne({ email })
        console.log(doctor,"kkkkkkk")
        if(doctor.authorised == false){
            return res.json({authorisation:"failed"})
        }
        const passwordMatched = await bcrypt.compare(password, doctor.password)

        if (doctor && passwordMatched) {
            await generateTokenDoctor(res, doctor._id);
            res.status(200).json({
                _id: doctor._id,
                name: doctor.name,
                email: doctor.email,
                phoneNumber: doctor.phoneNumber,
                specialisation: doctor.specialisation,
                authorised: doctor.authorised
            })
        } else {
            res.json({ error: "Invalid mail and password" })
        }
    } catch (error) {
        console.log("error", error)
    }
}

export const logoutDoctor = async (req, res) => {
    try {
        res.cookie('jwtdoctor', '',
            {
                httpOnly: true,
                expires: new Date(0)
            })
        res.status(200).json({ message: 'doctor logout successfully' })
    } catch (error) {
        console.log("error", error)
    }
}

export const forget = async(req,res)=>{
try{
    console.log("doctor")
}catch(error){
    console.log(error)
}
}