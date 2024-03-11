import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    doctor:{
        type:String,
        required:true
    },
    user:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    appointmentDate:{
        type:Date,
        required:true
    },
    isPaid:{
        type:Boolean,
        enum: ["pending" , "approved" , "cancelled"],
        required:true
    },
    date:{
        type:Date,
        required:true
    }
})

const Booking = mongoose.model('Booking',bookingSchema)

export default Booking