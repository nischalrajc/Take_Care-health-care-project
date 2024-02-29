import Doctors from "../Modal/Doctor.js"
import Specialisations from "../Modal/Specialisations.js"
import Users from "../Modal/Users.js"

export const getSpeciality = async (id) => {
    const specialisation = await Specialisations.findById(id)
    return specialisation
}

export const getSpecialisationDoctors = async (specialisation) => {
    const doctors = await Doctors.find({ specialisation: specialisation })
    return doctors
}

export const fetchDoctorDetails = async (id) => {
    const doctor = await Doctors.findById(id)
    return doctor
}

export const userProfileEdit = async (req) => {
    try {
        const { name, email, gender, phone, id } = req.body
        const user = await Users.findById(id)

        if(user){
            user.name=name,
            user.email=email,
            user.gender=gender,
            user.phoneNumber=phone

            await user.save();
            
            return user
        }else{
            return false
        }

    } catch (error) {
        console.log("database error", error)
    }
}