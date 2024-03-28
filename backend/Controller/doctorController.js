import Doctors from "../Modal/Doctor.js"
import bcrypt from 'bcrypt'
import { upload } from "../utils/multer.js"
import { generateTokenDoctor } from '../utils/generateToken.js'
import { add_slot, appointmentScheduled, deletePastSlots, findDoctor, getSlots, getSpecialisations, signUpDoctor, update_Password, validate_slot } from "../Services/doctor.js"
import { sendEmail } from "../utils/verificationMail.js";


export const Specialisations = async (req, res) => {
    try {
        const specialisation = await getSpecialisations()
        if (specialisation) {
            res.status(201).json(specialisation)
        } else {
            res.status(401)
        }
    } catch (error) {
        console.log("error", error)
        res.status(401)
    }
}

export const mailValidation = async (req, res) => {
    try {
        const email = req.params.email
        const verificationOTP = await sendEmail(email)
        if (verificationOTP) {
            res.status(201).json({ verificationOTP })
        } else {
            res.status(401)
        }

    } catch (error) {
        console.log("error", error)
        res.status(401)
    }

}

export const doctorSignup = async (req, res) => {
    try {

        const uploadFile = () => {
            return new Promise((resolve, reject) => {
                upload.single('certificate')(req, res, (err) => {
                    if (err) {
                        console.log('Multer Error:', err);
                        return reject('File upload failed');
                    }

                    const certificate = req.file;
                    resolve(certificate);
                });
            });
        };

        const certificate = await uploadFile();

        const { name, email, password, phone, gender, speciality, bio } = req.body;

        const existingDoctor = await findDoctor(email)
        if (existingDoctor) {
            return res.status(401).json({ error: "doctor already exist" });
        } else {
            const doctor = await signUpDoctor({
                name,
                email,
                password,
                phone,
                gender,
                speciality,
                bio,
                certificate,
            })
            if (doctor) {
                res.status(201).json({ message: "Signed in successfully" })
            }
        }

    } catch (error) {
        console.log('Error in doctorSignup:', error)
        res.status(401);
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
            console.log(generateTokenDoctor)
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
            res.status(401).json({ error: "Invalid mail and password" })
        }
    } catch (error) {
        console.log("error", error)
    }
}

export const updateProfile = async (req, res) => {
    const { name, email, bio, gender, phone, specialisation, fees, description, image_url, doctorId } = req.body;
    try {
        const doctor = await Doctors.findById(doctorId)

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
        const { email } = req.body;

        const existingDoctor = await Doctors.findOne({ email })
        if (!existingDoctor) {
            return res.status(401).json({ error: "Enter the registered email" });
        }

        const OTP = await sendEmail(email)
        if (OTP) {
            res.status(200).json({ otp: OTP })
        }
    } catch (error) {
        console.log(error)
    }
}

export const viewSlots = async (req, res) => {
    try {
        const doctorId = req.params.id;
        await deletePastSlots()
        const slot = await getSlots(doctorId)
        if (slot) {
            res.status(201).json({ slot })
        } else {
            res.status(401)
        }
    } catch (error) {
        console.log("error", error)
    }
}

export const addNewSlot = async (req, res) => {
    try {
        const { selectedDate, doctorId } = req.body;

        const dateObject = new Date(selectedDate);
        const formattedDate = dateObject.toLocaleString('en-IN', {
            timeZone: 'Asia/Kolkata',
            year: 'numeric',
            month: 'short',
            // weekday: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: true,
        });

        const alreadySloted = await validate_slot(formattedDate)
        if (alreadySloted) {
            return res.status(401).json({ message: "Time has been already sloted choose another one" })
        }

        const slot = await add_slot(formattedDate, doctorId)
        if (slot) {
            res.status(201).json(slot)
        } else {
            res.status(401).json({ message: "Time has been already sloted choose another one" })
        }
    } catch (error) {
        console.log("error", error)
    }
}

export const setNewPassword = async () => {
    try {
        const { email, password } = req.body
        const doctor = await findDoctor(email)

        if (doctor) {
            const updatePassword = await update_Password(email, password)
            if (updatePassword) {
                res.status(201)
            } else {
                res.status(401)
            }
        }
    } catch (error) {
        console.log("error", error)
    }
}

export const scheduledAppointments = async (req, res) => {
    try {
        const doctorId = req.params.id;
        const appointments = await appointmentScheduled(doctorId)
        console.log(appointments)
        if (appointments) {
            res.status(201).json({ appointments })
        } else {
            res.status(401)
        }
    } catch (error) {
        console.log("Error when getting scheduledappointments", error)
        res.status(401)
    }
}