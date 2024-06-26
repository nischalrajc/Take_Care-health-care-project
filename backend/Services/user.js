import Doctors from "../Modal/Doctor.js"
import Specialisations from "../Modal/Specialisations.js"
import Users from "../Modal/Users.js"
import Slots from "../Modal/Slots.js"
import Booking from "../Modal/Booking.js"
import Payments from "../Modal/Payments.js"
import Wallet from "../Modal/Wallet.js"
import MedicalReport from "../Modal/MedicalReport.js"

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

export const updateSlot = async (slotId) => {
    try {
        const updatedSlot = await Slots.findByIdAndUpdate(slotId, { status: 'pending' }, { new: true });
        return updatedSlot
    } catch (error) {
        console.log("error when updating the slot", error)
    }
}

export const userPayment = async (userId, slotId) => {
    try {
        const slot = await Slots.findById(slotId)

        const payment = await Payments.create({
            doctor: slot.doctorId,
            user: userId,
            slotId: slotId,
            status: "pending",
            date: new Date()
        })

    } catch (error) {
        console.log("error when payment started", error)
    }
}

export const updatePayment = async (userId) => {
    try {
        const pendingPayments = await Payments.find({ user: userId, status: 'pending' });

        for (const payment of pendingPayments) {
            const slotId = payment.slotId;

            await Slots.updateOne({ _id: slotId }, { $set: { status: 'available' } });

            await Payments.deleteOne({ _id: payment._id });
        }

        return true
    } catch (error) {
        console.log("error when updatingthe payment", error)
    }
}

export const book_Appointment = async (userId, slotId) => {
    try {
        const slot = await Slots.findById(slotId)

        if (slot) {
            slot.scheduled = true
            await slot.save()

            const updatedPayment = await Payments.findOneAndUpdate(
                { slotId: slotId },
                { $set: { status: 'completed' } },
                { new: true }
            )

            const paymentId = updatedPayment._id

            const booking = await Booking.create({
                doctor: slot.doctorId,
                user: userId,
                slotId: slotId,
                paymentId: paymentId,
                appointmentDate: slot.date,
                scheduled: false,
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


export const getPaymentHistory = async (userId) => {
    try {
        const userPayment = await Payments.find({ user: userId }).populate('doctor').sort({ date: -1 });
        return userPayment
    } catch (error) {
        console.log("error when fetching paymentHistory", error)
    }
}

export const getAppointmentsScheduled = async (userId) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const appointments = await Booking.find({ user: userId, appointmentDate: { $gte: today }, scheduled: false }).populate('doctor');

        return appointments;
    } catch (error) {
        console.log("error when fetching appointment");
    }
};

export const cancelScheduledAppointment = async (appointmentId) => {
    try {
        const appointment = await Booking.findById(appointmentId).populate('doctor')

        if (appointment) {
            const wallet = await Wallet.create({
                user: appointment.user,
                amount: appointment.doctor.fees,
                date: new Date()
            })
        }

        await Slots.findByIdAndUpdate(appointment.slotId, { $set: { scheduled: false } });

        const result = await Booking.deleteOne({ _id: appointmentId });
        if (result.deletedCount === 1) {
            return true
        } else {
            return false
        }
    } catch (error) {
        console.log("error when cancelling the data", error)
    }
}

export const userWallet = async (userId) => {
    try {
        const wallets = await Wallet.find({ user: userId });
        const totalAmount = wallets.reduce((acc, wallet) => acc + wallet.amount, 0);
        return totalAmount;
    } catch (error) {
        console.log("error when fetching the user wallet", error)
    }
}

export const Medical_Report = async (userId) => {
    try {
        const report = await MedicalReport.find({ user: userId }).populate('doctor')
        if (report) {
            return report
        } else {
            return null
        }
    } catch (error) {
        console.log("error when fetching the user medical reports", error)
    }
}

export const findDoctorsAvailable = async () => {
    try {
        const todayStart = new Date();
        todayStart.setUTCHours(0, 0, 0, 0);

        const todayEnd = new Date(todayStart);
        todayEnd.setUTCHours(23, 59, 59, 999);

        const doctors = await Slots.find({
            scheduled: false,
            date: {
                $gte: todayStart,
                $lte: todayEnd
            }
        }).populate('doctorId');

        return doctors;

    } catch (error) {
        console.log("Error when fetching available doctors", error);
    }
};


