import Doctors from "../Modal/Doctor.js"
import Specialisations from "../Modal/Specialisations.js"
import Users from "../Modal/Users.js"
import Slots from "../Modal/Slots.js"
import Booking from "../Modal/Booking.js"

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

export const viewSlots = async (doctorId, selectedDate) => {

    try {
        const startDate = new Date(selectedDate);
        startDate.setUTCHours(0, 0, 0, 0);

        const endDate = new Date(startDate);
        endDate.setUTCDate(endDate.getUTCDate() + 1)

        const slots = await Slots.find({
            doctorId,
            date: { $gte: startDate, $lt: endDate },
        });

        return slots;

    } catch (error) {
        console.error("Error fetching data", error);
        return [];
    }

}



export const book_Appointment = async (userId, slotId) => {
    try {
        const slot = await Slots.findById(slotId)

        if (slot) {
            slot.scheduled = true
            await slot.save()

            const booking = await Booking.create({
                doctor: slot.doctorId,
                user: userId,
                slotId: slotId,
                appointmentDate: slot.date,
                date: new Date()
            })

            return booking
        } else {
            return null
        }
    } catch (error) {
        console.log("error while scheduling appointment", error)
    }
}