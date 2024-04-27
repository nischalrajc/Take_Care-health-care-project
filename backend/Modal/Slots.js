import mongoose from "mongoose";

const slotSchema = new mongoose.Schema({
    doctorId:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    scheduled:{
        type:Boolean,
    },
    status:{
        type:String,
    }
})

const Slots = mongoose.model('Slots',slotSchema)

export default Slots