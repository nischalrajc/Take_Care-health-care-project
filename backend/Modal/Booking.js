import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctors',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    slotId: {
        type: String,
        required: true
    },
    paymentId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'payments',
        required: true
    },
    scheduled:{
        type:Boolean,
        required:true
    },
    appointmentDate: {
        type: Date,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
})

const Booking = mongoose.model('Booking', bookingSchema)

export default Booking