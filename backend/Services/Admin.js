import Doctors from "../Modal/Doctor.js"

export const doctorNotauthorised = async()=>{
    try{
        const doctors = await Doctors.find({ authorised: false })
        return doctors
    }catch(error){
        console.log("error",error)
    }
}