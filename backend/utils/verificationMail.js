import otpGenerator from 'otp-generator'
import nodemailer from 'nodemailer'

export const sendEmail = async (email, res) => {
    try {
        const OTP = otpGenerator.generate(6, {digits: true,lowerCaseAlphabets:false, upperCaseAlphabets: false, specialChars: false });

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        //--- configure mail content---
        const mailOption = {
            from: process.env.EMAIL,
            to: email,
            subject: "Mail Validation",
            html: `<b>Your OTP is ${OTP}</b>`,
        }

        //   ---send Email----
        try {
            const info = await transporter.sendMail(mailOption)
            console.log("mail sended successfully")
            
        } catch (error) {
            console.log("email send failed with error", error)
        }

        return OTP

    } catch (error) {
        console.log("error", error)
    }
}