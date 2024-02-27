import mongoose from "mongoose";

const specialisationSchema = new mongoose.Schema({
    specialisation:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    image:{
        type:String
    }
})

const Specialisations = mongoose.model('Specialisation',specialisationSchema)

export default Specialisations