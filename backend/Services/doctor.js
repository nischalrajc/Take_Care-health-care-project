import Doctors from "../Modal/Doctor.js"
import Slots from "../Modal/Slots.js"
import Specialisations from "../Modal/Specialisations.js"

export const getSpecialisations = async ()=>{
    try{
        const specialisation = await Specialisations.find()
        return specialisation
    }catch(error){
        console.log("error",error)
    }
}

export const findDoctor = async (email)=>{
    try{
        const existingDoctor = await Doctors.findOne({ email })
        return existingDoctor
    }catch(error){
        console.log("Error",error)
    }
}

export const signUpDoctor = async(data)=>{
    try{
        const { name, email, password, phone, gender, speciality, certificate , bio } = data

        const certificateInfo = certificate.filename

        const doctor = await Doctors.create({
            name: name,
            gender: gender,
            email: email,
            phoneNumber: phone,
            password: password,
            specialisation: speciality,
            bio: bio,
            registration_certicatate: certificateInfo,
            authorised: false
        })

        return doctor

    }catch(error){
        console.log("error",error)
    }
}

export const getSlots = async (doctorId)=>{
    try {
        const slot = await Slots.find({doctorId:doctorId})
        if(slot){
            return slot
        }else{
            return null
        }
    } catch (error) {
        console.log("error",error)
    }
}

export const validate_slot = async (formattedDate)=>{
    try {
        const alreadySloted = await Slots.findOne({date:formattedDate})
        if(alreadySloted){
            return true
        }else{
            return false
        }
    } catch (error) {
        console.log("error",error)
    }
}

export const add_slot = async(formattedDate,doctorId) =>{
    try{
        const slot = await Slots.create({
            doctorId:doctorId,
            date:formattedDate
        })
        return slot
    }catch(error){
        console.log("Error",error)
    }
}