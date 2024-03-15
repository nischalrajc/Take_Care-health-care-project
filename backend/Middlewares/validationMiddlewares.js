import jwt from 'jsonwebtoken'
import Admin from '../Modal/Admin.js';
import User from '../Modal/Users.js'
import Doctors from '../Modal/Doctor.js';

export const validateAdmin = async (req, res, next) => {

    let token;
    token = req.cookies.jwtAdmin;

    if (token) {
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            req.admin = await Admin.findById(decode.adminId).select('-password');

            next()

        } catch (error) {
            res.status(401);
            throw new Error('not authorized, invalid token');
        }
    } else {
        res.status(401).json({message:"not authorized, no token"});
    }
}

export const validateUser = async (req, res , next) => {

    let token;
    token = req.cookies.jwtuser;

    if (token) {
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decode.userId).select('-password');
           
            next()

        } catch (error) {
            res.status(401);
            throw new Error('not authorized, invalid token');
        }
    } else {
        res.status(401).json({message:"not authorized, no token"});
    }
}

export const validateDoctor = async (req, res, next) => {

    let token;
    token = req.cookies.jwtdoctor;

    if (token) {
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            req.doctor = await Doctors.findById(decode.doctorId).select('-password');
            
            next()

        } catch (error) {
            res.status(401);
            throw new Error('not authorized, invalid token');
        }
    } else {
        res.status(401).json({message:"not authorized, no token"});
    }
}
