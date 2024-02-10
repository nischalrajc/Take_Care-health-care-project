import Doctors from "../Modal/Doctor.js"

export const doctorSignup = async(req,res) =>{
    const {name,email,password,phone,gender,specialisation,bio} = req.body
    try{
        const existingDoctor = await Doctors.findOne({email})
        if(existingDoctor){
            return res.json({error:"user already exist"});
        }

        const doctor = await Doctors.create({
            name:name,
            gender:gender,
            email:email,
            phoneNumber:phone,
            password:password,
            specialisation:specialisation,
            bio:bio
        })

        res.status(201).json({message:"Signed in successfully"})

    }catch(error){
        console.log("error",error)
    }
}