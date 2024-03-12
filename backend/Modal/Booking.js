import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    doctor: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    slotId:{
        type: String,
        required : true
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