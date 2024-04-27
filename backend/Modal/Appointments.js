import mongoose from "mongoose";

const appointmentsSchema = new mongoose.Schema({
    doctorId:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    }
})

const Appointments = mongoose.model('Appointments',appointmentsSchema)

export default Appointments