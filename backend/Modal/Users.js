import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    blocked:{
        type:Boolean,
        required:true
    },
    registrationDate:{
        type:Date,
        default:Date.now()
    }
});


userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(String(this.password),salt);
})

// userSchema.methods.matchPasswords = async function(enteredPassword){
//     return await bcrypt.compare(String(enteredPassword),this.password);
// }

const Users = mongoose.model('Users',userSchema)

export default Users