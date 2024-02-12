import Admin from '../Modal/Admin.js'
import {generateTokenAdmin} from '../utils/generateToken.js'
import bcrypt from 'bcrypt'

export const loginAdmin = async(req,res) =>{
    const {email,password} = req.body
    try{
        const admin = await Admin.findOne({email})
        const passwordMatched = await bcrypt.compare(password,admin.password)

        if(Admin && passwordMatched){
            await generateTokenAdmin(res,admin._id);
            res.status(200).json({
                _id:admin._id,
                name:admin.name,
                email:admin.email,
            })
        }else{
            res.json({error:"Invalid mail and password"})
        }
    }catch(error){
        console.log("error",error)
    }
}