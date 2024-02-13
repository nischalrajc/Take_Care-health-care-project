import jwt from 'jsonwebtoken'
import Admin from '../Modal/Admin.js';

export const protectAdmin = async(req,res,next)=>{

    let token;

    token = req.cookies.jwtAdmin;

    if(token){
        try{
            const decode = jwt.verify(token,process.env.JWT_SECRET);
            req.admin = await Admin.findById(decode.adminId).select('-password');
            
            next()

        }catch(error){
            res.status(401);
            throw new Error('not authorized, invalid token');
        }
    }else{
        res.status(401);
        throw new Error('not authorized, no token');
    }
}