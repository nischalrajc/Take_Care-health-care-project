import Admin from '../Modal/Admin.js'
import Doctors from '../Modal/Doctor.js'
import Users from '../Modal/Users.js'
import { generateTokenAdmin } from '../utils/generateToken.js'
import bcrypt from 'bcrypt'

export const loginAdmin = async (req, res) => {
    const { email, password } = req.body
    try {
        const admin = await Admin.findOne({ email })
        const passwordMatched = await bcrypt.compare(password, admin.password)

        if (Admin && passwordMatched) {
            await generateTokenAdmin(res, admin._id);
            res.status(200).json({
                _id: admin._id,
                name: admin.name,
                email: admin.email,
            })
        } else {
            res.json({ error: "Invalid mail and password" })
        }
    } catch (error) {
        console.log("error", error)
    }
}


export const getUsers = async (req, res) => {
    try {
        const users = await Users.find()
        res.status(200).json(users)
    } catch (error) {
        console.log("error", error)
    }
}

export const getAllDoctors = async (req, res) => {
    try {
        const doctors = await Doctors.find({ authorised: true })
        if (doctors) {
            res.status(200).json(doctors)
        }
    } catch (error) {
        console.log("error", error)
    }
}

export const doctorsRequest = async (req, res) => {
    try {
        const doctors = await Doctors.find({ authorised: false })
        res.status(200).json(doctors)
    } catch (error) {
        console.log("error", error)
    }
}

export const acceptDoctorRequest = async (req, res) => {
    try {
        const id = req.params.id

        const doctor = await Doctors.findById(id)
        if (doctor) {
            const updatedDoctor = await Doctors.findByIdAndUpdate(
                id,
                { $set: { authorised: true } },
                { new: true }
            )

            if (updatedDoctor) {
                return res.status(200).json(updatedDoctor);
            } else {
                return res.status(404).json({ message: 'Doctor not found' });
            }
        }
    } catch (error) {
        console.log("error", error)
    }
}

export const rejectDoctorRequest = async (req, res) => {
    try {
        const id = req.params.id
        const doctor = await Doctors.findById(id)

        if (doctor) {
            const deletedDoctor = await Doctors.findByIdAndDelete(id);
            if (deletedDoctor) {
                return res.status(200).json({message:"Doctor rejected successfully"});
            } else {
                return res.status(404).json({ message: 'Doctor not found' });
            }
        }

    } catch (error) {
        console.log("error", error)
    }
}

export const addDoctors = async (req,res) =>{
    const {name,email,bio,gender,phone,specialisation,fees,description,image_url} = req.body;
   
    try{
        const existingDoctor = await Doctors.findOne({ email })
        if (existingDoctor) {
            return res.status(401).json({ error: "doctor already exist" });
        }

        const doctor = await Doctors.create({
            name: name,
            gender: gender,
            email: email,
            phoneNumber: phone,
            password: 123456,
            specialisation: specialisation,
            bio: bio,
            fees:fees,
            description:description,
            image:image_url,
            authorised: true
        })

        res.status(201).json({ message: "Added new doctor successfully" })
    }catch(error){
        console.log("error",error)
    }
}

export const blockUser = async (req, res) => {
    try {
        const id = req.params.id
        const user = await Users.findById(id)
        if (user) {
            const upadateUser = await Users.findByIdAndUpdate(
                id,
                { $set: { blocked: true } },
                { new: true }
            )
        }
        res.status(200).json({ message: "User Blocked" })
    } catch (error) {
        console.log("error", error)
    }
}

export const unblockUser = async (req, res) => {
    try {
        const id = req.params.id
        const user = await Users.findById(id)
        if (user) {
            const upadateUser = await Users.findByIdAndUpdate(
                id,
                { $set: { blocked: false } },
                { new: true }
            )
        }
        res.status(200).json({ message: "User unblocked" })
    } catch (error) {
        console.log("error", error)
    }
}

export const logoutAdmin = async (req, res) => {
    res.cookie('jwtAdmin', '',
        {
            httpOnly: true,
            expires: new Date(0)
        })
    res.status(200).json({ message: 'admin logout successfully' })
}