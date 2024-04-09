import mongoose from "mongoose";

const medicalreportSchema = new mongoose.Schema({
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
    appointmentId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"payments",
        required:true,
    },
    appointmentDate: {
        type: Date,
        required: true
    },
    report:{
        type:String,
        required:true
    },
    // date: {
    //     type: Date,
    //     required: true
    // }
})

const MedicalReport = mongoose.model('MedicalReport', medicalreportSchema)

export default MedicalReport