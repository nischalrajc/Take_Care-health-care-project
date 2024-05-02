import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    bio: {
        type: String,
    },
    specialisation: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    description: {
        type: String
    },
    fees: {
        type: Number
    },
    registration_certicatate: {
        type: String
    },
    authorised: {
        type: Boolean,
        required: true
    },
    registrationDate: {
        type: Date,
        default: Date.now()
    }
});


doctorSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(String(this.password), salt);
})

const Doctors = mongoose.model('Doctors', doctorSchema)

export default Doctors
