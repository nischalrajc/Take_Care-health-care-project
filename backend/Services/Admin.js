import Doctors from "../Modal/Doctor.js"
import Payments from "../Modal/Payments.js"
import Specialisations from "../Modal/Specialisations.js"

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
    try {
        const deleted_Doctor = await Doctors.findByIdAndDelete(id);
        if (deleted_Doctor) {
            return true
        } else {
            return false
        }
    } catch (error) {
        console.log("error", error)
    }
}

export const specialisationDetails = async (id) => {
    try {
        const specialisation = await Specialisations.findById(id)
        return specialisation
    } catch (error) {
        console.log("error when fetching disease", error)
    }
}

export const getAllTransactions = async () => {
    try {
        const transactions = await Payments.find().populate('doctor').populate('user')
        if (transactions) {
            return transactions
        } else {
            return null
        }
    } catch (error) {
        console.log("error when fetching all trasactions", error)
    }
}

export const updateSpectialities = async (id, name, description, image_url) => {
    try {
        const specialisation = await Specialisations.findById(id)
        if (specialisation) {
            specialisation.specialisation = name
            specialisation.description = description
            specialisation.image = image_url

            await specialisation.save()
            return true
        }
    } catch (error) {
        console.log("error when updating the database", error)
    }
}