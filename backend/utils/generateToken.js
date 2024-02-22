import jwt from 'jsonwebtoken'

export const generateToken = async(res,userId) => {
    
    const token = jwt.sign({userId},process.env.JWT_SECRET,
        {
            expiresIn:'30d'
        });
   
        res.cookie('jwtuser', token, {
            httpOnly: false,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict',
            maxAge: 30 * 24 * 60 * 60 * 1000,
        })

}

export const generateTokenDoctor = async(res,doctorId) => {
    
    const token = jwt.sign({doctorId},process.env.JWT_SECRET,
        {
            expiresIn:'30d'
        });
   
        res.cookie('jwtdoctor', token, {
            httpOnly: false,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict',
            maxAge: 30 * 24 * 60 * 60 * 1000,
        })

}

export const generateTokenAdmin = async(res,adminId) => {
    
    const token = jwt.sign({adminId},process.env.JWT_SECRET,
        {
            expiresIn:'30d'
        });
   
        res.cookie('jwtAdmin', token, {
            httpOnly: false,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict',
            maxAge: 30 * 24 * 60 * 60 * 1000,
        })

}

