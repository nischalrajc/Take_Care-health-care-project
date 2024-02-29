import Doctors from "../Modal/Doctor.js"
import Specialisations from "../Modal/Specialisations.js"

export const getSpeciality = async (id) =>{
    const specialisation = await Specialisations.findById(id)
    return specialisation
}

export const getSpecialisationDoctors = async (specialisation) =>{
    const doctors = await Doctors.find({specialisation:specialisation})
    return doctors
}
 
export const fetchDoctorDetails = async (id) =>{
    const doctor = await Doctors.findById(id)
    return doctor
}