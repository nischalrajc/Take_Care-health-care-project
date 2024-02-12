import Admin from '../Modal/Admin.js'
import Doctors from '../Modal/Doctor.js'
import Users from '../Modal/Users.js'
import {generateTokenAdmin} from '../utils/generateToken.js'
import bcrypt from 'bcrypt'

export const loginAdmin = async(req,res) =>{
    const {email,password} = req.body
    try{
        const admin = await Admin.findOne({email})
        const passwordMatched = await bcrypt.compare(password,admin.password)

        if(Admin && passwordMatched){
            await generateTokenAdmin(res,admin._id);
            res.status(200).json({
                _id:admin._id,
                name:admin.name,
                email:admin.email,
            })
        }else{
            res.json({error:"Invalid mail and password"})
        }
    }catch(error){
        console.log("error",error)
    }
}


export const getUsers = async(req,res) =>{
    try{
        const users = await Users.find()
        res.status(200).json(users)
    }catch(error){
        console.log("error",error)
    }
}

export const getAllDoctors = async (req,res) =>{
    try{
        const doctors = await Doctors.find()
        res.status(200).json(doctors)
    }catch(error){
        console.log("error",error)
    }
}

export const doctorsRequest = async(req,res) =>{
    try{
        const doctors = await Doctors.find({authorised:false})
        res.status(200).json(doctors) 
    }catch(error){
        console.log("error",error)
    }
}

export const acceptDoctorRequest = async (req,res) =>{
    try{
        const id = req.params.id

        const doctor = await Doctors.findById(id)
        if(doctor){
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
    }catch(error){
        console.log("error",error)
    }
}