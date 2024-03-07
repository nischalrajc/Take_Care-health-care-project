import Doctors from "../Modal/Doctor.js"

export const doctorNotauthorised = async () => {
    try {
        const doctors = await Doctors.find({ authorised: false })
        return doctors
    } catch (error) {
        console.log("error", error)
    }
}

export const getDoctor = async (id) => {
    try {
        const doctor = await Doctors.findById(id)
        return doctor
    } catch (error) {
        console.log("error", error)
    }
}

export const removeDoctor = async (id) => {
    try{
        const deleted_Doctor = await Doctors.findByIdAndDelete(id);
        if(deleted_Doctor){
            return true
        }else{
            return false
        }
    }catch(error){
        console.log("error",error)
    }
}