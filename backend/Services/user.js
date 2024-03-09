import Doctors from "../Modal/Doctor.js"
import Specialisations from "../Modal/Specialisations.js"
import Users from "../Modal/Users.js"
import Slots from "../Modal/Slots.js"

export const getSpeciality = async (id) => {
    const specialisation = await Specialisations.findById(id)
    return specialisation
}

export const getSpecialisationDoctors = async (specialisation) => {
    let doctors;

    if (specialisation === 'All') {
        doctors = await Doctors.find();
    } else {
        doctors = await Doctors.find({ specialisation: specialisation });
    }

    return doctors;
}

export const fetchDoctorDetails = async (id) => {
    const doctor = await Doctors.findById(id)
    return doctor
}

export const userProfileEdit = async (req) => {
    try {
        const { name, email, gender, phone, id } = req.body
        const user = await Users.findById(id)

        if (user) {
            user.name = name,
                user.email = email,
                user.gender = gender,
                user.phoneNumber = phone

            await user.save();

            return user
        } else {
            return false
        }

    } catch (error) {
        console.log("database error", error)
    }
}

export const getDoctors = async () => {
    const doctor = await Doctors.find({ authorised: true })
    return doctor
}

export const getSpecialisation = async () => {
    const specialisation = await Specialisations.find()
    return specialisation
}

export const viewSlots = async (doctorId,selectedDate) => {
    // try {
    //     const slots = await Slots.find({doctorId:doctorId})
        
    //     return slots
    // } catch (error) {
    //     console.log("error when fetching data", error)
    // }

    try {
        const startDate = new Date(selectedDate); // Assuming selectedDate is a string
        startDate.setHours(0, 0, 0, 0); // Set start of day for selected date
    
        const endDate = new Date(startDate); // Create a copy
        endDate.setDate(endDate.getDate() + 1); // Move to next day (end of day)
    
        const slots = await Slots.find({
          doctorId,
          date: { $gte: startDate, $lt: endDate }, // Filter based on date range
        });
    
        return slots;
      } catch (error) {
        console.error("Error fetching data", error);
        return []; // Return an empty array on error
      }

}