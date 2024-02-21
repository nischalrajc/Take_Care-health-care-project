import Users from "../Modal/Users.js";
import bcrypt from 'bcrypt'
import { generateToken } from "../utils/generateToken.js";
import { sendEmail } from "../utils/verificationMail.js";


export const userSignup = async (req, res) => {

    const { name, gender, email, phoneNumber, password } = req.body

    try {
        const existingUser = await Users.findOne({ email })
        if (existingUser) {
            return res.json({ error: "user already exist" });
        }

        const OTP = await sendEmail(email)
        if (OTP) {
            res.status(200).json({ otp: OTP })
        }
    } catch (err) {
        console.log("error", err)
    }
}

export const userLogin = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await Users.findOne({ email })

        if (!user) {
            return res.json({ error: "Invalid email and password" });
        }

        const passwordMatched = await bcrypt.compare(password, user.password)


        if (user.blocked) {
            return res.json({ blocked: true })
        }

        if (user && passwordMatched) {
            await generateToken(res, user._id);
            res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                phoneNumber: user.phoneNumber,
                gender: user.gender,
                blocked: user.blocked
            })
        } else {
            res.json({ error: "Invalid mail and password" })
        }
    } catch (error) {
        console.log("error", error)
    }


}

export const forgetpassword = async (req, res) => {
    try {
        const { email } = req.body;
        console.log("user")

        const existingUser = await Users.findOne({ email })
        if (!existingUser) {
            return res.json({ error: "Enter the registered email" });
        }

        const OTP = await sendEmail(email)
        if (OTP) {
            res.status(200).json({ otp: OTP })
        }

    } catch (error) {
        console.log("error", error)
    }
}


export const newPassword = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await Users.findOne({ email });

        if (user) {
            user.password = password;
            await user.save();

            res.status(200).json({ message: 'Password updated successfully' });

        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.log("error", error)
    }
}

export const register_user = async (req, res) => {
    try {
        const { name, email, phone, password, gender } = req.body;
        const user = await Users.create({
            name: name,
            gender: gender,
            email: email,
            password: password,
            phoneNumber: phone,
            blocked: false
        })

        res.status(201).json({ message: "Signed in successfully" })

    } catch (error) {
        console.log("error", error)
    }
}

export const logOut = async (req, res) => {
    try {
        res.cookie('jwtuser', '',
            {
                httpOnly: true,
                expires: new Date(0)
            })
        res.status(200).json({ message: 'user logout successfully' })
    } catch (error) {
        console.log("error", error)
    }
}