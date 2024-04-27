import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
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
        type: mongoose.Schema.Types.ObjectId,
        ref:'Slots',
        required: true
    },
    status:{
        type:String,
    },
    date: {
        type: Date,
        required: true
    }
})

const Payments = mongoose.model('Payments', paymentSchema)

export default Payments