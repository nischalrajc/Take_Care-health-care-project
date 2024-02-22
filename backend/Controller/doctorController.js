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

        if (!doctor) {
            return res.status(401).json({ error: "Invalid email and password" });
        }

        if (doctor.authorised == false) {
            return res.json({ authorisation: "failed" })
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
                image: doctor.image,
                gender: doctor.gender,
                bio: doctor.bio,
                description: doctor.description,
                fees: doctor.fees,
                authorised: doctor.authorised
            })
        } else {
            res.json({ error: "Invalid mail and password" })
        }
    } catch (error) {
        console.log("error", error)
    }
}

export const updateProfile = async (req, res) => {
    const { name, email, bio, gender, phone, specialisation, fees, description, image_url, doctorId } = req.body;
    try {
        const doctor = await Doctors.findById( doctorId )

        if (doctor) {
            doctor.name = name
            doctor.email = email
            doctor.bio = bio
            doctor.gender = gender
            doctor.phoneNumber = phone
            doctor.specialisation = specialisation
            doctor.fees = fees
            doctor.description = description
            doctor.image = image_url

            await doctor.save();
            res.status(200).json({
                _id: doctor._id,
                name: doctor.name,
                email: doctor.email,
                phoneNumber: doctor.phoneNumber,
                specialisation: doctor.specialisation,
                image: doctor.image,
                gender: doctor.gender,
                bio: doctor.bio,
                description: doctor.description,
                fees: doctor.fees,
                authorised: doctor.authorised
            })

        } else {
            res.status(401).json({ message: "doctor doesnot exist" })
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

export const forget = async (req, res) => {
    try {
        console.log("doctor")
    } catch (error) {
        console.log(error)
    }
}