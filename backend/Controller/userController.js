import Users from "../Modal/Users.js";
import bcrypt from 'bcrypt'
import { generateToken } from "../utils/generateToken.js";


export const userSignup = async (req, res) => {

    const { name, gender, email, phoneNumber, password } = req.body

    try {
        const existingUser = await Users.findOne({ email })
        if (existingUser) {
            return res.json({ error: "user already exist" });
        }

        const user = await Users.create({
            name: name,
            gender: gender,
            email: email,
            password: password,
            phoneNumber: phoneNumber
        })

        res.status(201).json({ message: "Signed in successfully" })

    } catch (err) {
        console.log("error", err)
    }
}

export const userLogin = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await Users.findOne({ email })
        const passwordMatched = await bcrypt.compare(password, user.password)

        if (user && passwordMatched) {
            await generateToken(res, user._id);
            res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                phoneNumber: user.phoneNumber,
            })
        } else {
            res.json({ error: "Invalid mail and password" })
        }
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