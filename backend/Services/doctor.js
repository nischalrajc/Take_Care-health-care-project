import Booking from "../Modal/Booking.js"
import Doctors from "../Modal/Doctor.js"
import MedicalReport from "../Modal/MedicalReport.js"
import Slots from "../Modal/Slots.js"
import Specialisations from "../Modal/Specialisations.js"

export const getSpecialisations = async () => {
    try {
        const specialisation = await Specialisations.find()
        return specialisation
    } catch (error) {
        console.log("error", error)
    }
}

export const findDoctor = async (email) => {
    try {
        const existingDoctor = await Doctors.findOne({ email })
        return existingDoctor
    } catch (error) {
        console.log("Error", error)
    }
}

export const signUpDoctor = async (data) => {
    try {
        const { name, email, password, phone, gender, speciality, certificate, bio } = data

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

    } catch (error) {
        console.log("error", error)
    }
}

export const deletePastSlots = async () => {
    try {
        const currentDate = new Date();

        await Slots.deleteMany({
            date: { $lt: currentDate }
        });

    } catch (error) {
        console.log(error)
    }
};

export const getSlots = async (doctorId) => {
    try {
        const slot = await Slots.find({ doctorId: doctorId })
        if (slot) {
            return slot
        } else {
            return null
        }
    } catch (error) {
        console.log("error", error)
    }
}

export const validate_slot = async (formattedDate) => {
    try {
        const alreadySloted = await Slots.findOne({ date: formattedDate })
        if (alreadySloted) {
            return true
        } else {
            return false
        }
    } catch (error) {
        console.log("error", error)
    }
}

export const add_slot = async (formattedDate, doctorId) => {
    try {
        const slot = await Slots.create({
            doctorId: doctorId,
            date: formattedDate,
            scheduled: false
        })
        return slot
    } catch (error) {
        console.log("Error", error)
    }
}

export const update_Password = async (email, password) => {
    try {
        const doctor = await Doctors.updateOne({ email: email }, { password: password });
        return doctor
    } catch (error) {
        console.log("error", error)
    }
}

export const appointmentScheduled = async (doctorId) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const appointments = await Booking.find({ doctor: doctorId, appointmentDate: { $gte: today }, scheduled: false }).populate('user');
        return appointments
    } catch (error) {
        console.log("Error when fetching data from appointments", error)
    }
}

export const newMedicalReport = async (medicalReport, appointmentId) => {
    try {
        const appointment = await Booking.findById(appointmentId)
        console.log("apppointment", appointment)

        const report = await MedicalReport.create({
            report: medicalReport,
            user: appointment.user,
            doctor: appointment.doctor,
            appointmentId: appointment._id,
            appointmentDate: appointment.appointmentDate,
        })

        return report

    } catch (error) {
        console.log("error when adding in to medical database", error)
    }
}

export const doctor_medicalReport = async (doctorId) => {
    try {
        const report = await MedicalReport.find({ doctor: doctorId }).populate('user')
        if (report) {
            return report
        } else {
            return null
        }
    } catch (error) {
        console.log("error when fetching doctor medical report", error)
    }
}

export const appointmentUpdate = async (appointmentId) => {
    try {
        await Booking.findOneAndUpdate({ _id: appointmentId }, { $set: { scheduled: true } }, { new: true })
        return
    } catch (error) {
        console.log("error when updateing appointmentdatabase", error)
    }
}