import Users from "../Modal/Users.js";


export const userSignup = async(req,res)=>{
    
    const {name,gender,email,phoneNumber,password} = req.body

    try{
        const existingUser = await Users.findOne({email})
        if(existingUser){
           return res.json({error:"user already exist"});
        }

        const user = await Users.create({
            name:name,
            gender:gender,
            email:email,
            password:password,
            phoneNumber:phoneNumber
        })
        
        res.status(201).json({message:"Signed in successfully"})

    }catch(err){
        console.log("error", err)
    }
}
