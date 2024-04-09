import Users from "../Modal/Users.js";
import bcrypt from 'bcrypt'
import { generateToken } from "../utils/generateToken.js";
import { sendEmail } from "../utils/verificationMail.js";
import Doctors from "../Modal/Doctor.js";
// import Booking from '../Modal/Booking.js'
import Specialisations from "../Modal/Specialisations.js";
import Stripe from 'stripe'
import { getSpeciality, getSpecialisationDoctors, fetchDoctorDetails, getDoctors, getSpecialisation, userProfileEdit, viewSlots, book_Appointment, getAppointmentsScheduled, getPaymentHistory, cancelScheduledAppointment, userWallet } from "../Services/user.js";
// import Slots from "../Modal/Slots.js";


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

        const existingUser = await Users.findOne({ email })
        if (!existingUser) {
            return res.status(401).json({ error: "Enter the registered email" });
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

export const mailValidation = async (req, res) => {
    try {
        const email = req.params.email
        const OTP = await sendEmail(email)
        if (OTP) {
            res.status(201).json({ otp: OTP })
        } else {
            res.status(401)
        }

    } catch (error) {
        console.log("error", error)
        res.status(401)
    }
}

export const getDoctorDetails = async (req, res) => {
    try {
        const doctors = await Doctors.find({ authorised: true })
        res.status(200).json({ doctors })
    } catch (error) {
        console.log("error", error)
    }
}

export const searchdoctor = async (req, res) => {
    try {
        const doctors = await getDoctors()
        const specialities = await getSpecialisation()

        if (doctors && specialities) {
            res.status(200).json({ doctors: doctors, specialities: specialities })
        } else {
            res.status(401)
        }
    } catch (error) {
        console.log("error", error)
    }
}

export const filterDoctor = async (req, res) => {
    try {
        const { speciality, gender } = req.body;

        const doctors = await getSpecialisationDoctors(speciality)
        if (doctors) {

            if (!gender.male && !gender.female) {
                res.status(201).json({ doctors });
                return;
            }

            const filteredDoctors = doctors.filter((doctor) => {
                return (
                    (gender.male && doctor.gender === 'male') ||
                    (gender.female && doctor.gender === 'female')
                );
            });

            if (filteredDoctors.length > 0) {
                res.status(201).json({ doctors: filteredDoctors });
            } else {
                res.json({ message: 'No matching doctors found.' });
            }
        }

    } catch (error) {
        console.log("error", error)
    }
}

export const getSpecialities = async (req, res) => {
    try {
        const specialisation = await Specialisations.find()
        res.status(200).json({ specialisation })
    } catch (error) {
        console.log("error", error)
    }
}

export const viewSpecialities = async (req, res) => {
    const id = req.params.id
    try {
        const specialisation = await getSpeciality(id)

        if (specialisation) {
            const doctors = await getSpecialisationDoctors(specialisation.specialisation)

            res.status(201).json({ specialisation, doctors })
        } else {
            res.status(401)
        }
    } catch (error) {
        console.log("error", error)
    }
}

export const viewSlotsAvailable = async (req, res) => {
    try {
        const doctorId = req.query.doctorId;
        const selectedDate = req.query.date;
        const slots = await viewSlots(doctorId, selectedDate)

        if (slots) {
            res.status(201).json({ slots: slots })
        } else {
            res.status(401)
        }
    } catch (error) {
        res.status(401)
        console.log("error", error)
    }
}

export const bookAppointments = async (req, res) => {
    try {
        const slotId = req.query.slotId;
        const userId = req.query.userId;

        const book_appointment = await book_Appointment(userId, slotId)
        if (book_appointment) {
            res.status(201).json({ message: "successfully booked appointments" })
        } else {
            res.status(401).json({ message: "error while booking" })
        }

    } catch (error) {
        console.log("error when booking", error)
    }
}

export const paymentHistory = async (req, res) => {
    try {
        const { id } = req.params

        const payment = await getPaymentHistory(id)
        if (payment) {
            res.status(201).json({ payment })
        }
    } catch (error) {
        console.log("error when fetching ")
    }
}

export const scheduledAppointments = async (req, res) => {
    try {
        const id = req.params.id
        const appointments = await getAppointmentsScheduled(id)
        res.status(201).json({ appointments })
    } catch (error) {
        console.log("error when fetching scheduledAppointments", error)
        res.status(401)
    }
}

export const cancelAppointment = async (req, res) => {
    try {
        const { appointmentId } = req.params
        const cancelappointment = await cancelScheduledAppointment(appointmentId)
        if (cancelappointment) {
            res.status(201).json({ message: "meeting cancelled successfully" })
        } else {
            res.status(401)
        }
    } catch (error) {
        console.log("error", error)
    }
}

export const doctorDetails = async (req, res) => {
    const id = req.params.id
    try {
        const doctorDetail = await fetchDoctorDetails(id)
        if (doctorDetail) {
            res.status(201).json(doctorDetail)
        } else {
            res.status(401)
        }
    } catch (error) {
        console.log("error", error)
    }
}

export const userEditProfile = async (req, res) => {
    try {
        const user = await userProfileEdit(req)
        if (user) {
            res.status(201).json(user)
        } else {
            res.status(400).json({ error: "User not found or unable to edit profile" })
        }
    } catch (error) {
        console.log("error in editing profile", error)
    }
}


export const getBookingSession = async (req, res) => {
    try {
        const { userId, doctorId, slotId } = req.body;
        const doctorInfo = await fetchDoctorDetails(doctorId);
        const userInfo = await Users.findById(userId);

        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
        // Create Stripe checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            success_url: `${process.env.CLIENT_SITE_URL}/Checkout-success/${slotId}`,
            cancel_url: `${process.env.CLIENT_SITE_URL}/checkout-cancel`,
            customer_email: userInfo.email,
            client_reference_id: doctorId,
            line_items: [
                {
                    price_data: {
                        currency: 'bdt',
                        unit_amount: doctorInfo.fees * 100,
                        product_data: {
                            name: doctorInfo.name,
                            description: doctorInfo.bio,
                            images: [doctorInfo.image]
                        }
                    },
                    quantity: 1,
                },
            ],
        });


        res.status(200).json({ success: true, message: 'Checkout session created!', session });

    } catch (error) {
        console.log('Error when booking:', error);
        res.status(500).json({ success: false, message: 'Error creating checkout session' });
    }
};


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

export const getUserWallet = async (req, res) => {
    try {
        const { userId } = req.params
        const wallet = await userWallet(userId)
        if (wallet) {
            res.status(201).json(wallet)
        } else {
            res.status(401)
        }
    } catch (error) {
        console.log("error when getting getuserwallet", error)
    }
}