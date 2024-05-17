import { Routes, Route } from "react-router-dom";
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from "./Pages/User/Home";
import SignUp from "./Pages/User/SignUp";
import Login from "./Pages/User/Login";
import LoginDoctor from "./Pages/Doctor/LoginDoctor";
import DoctorRegistration from "./Pages/Doctor/DoctorRegistration";
import LoginAdmin from "./Pages/Admin/LoginAdmin";
import Users from "./Pages/Admin/Users";
import Doctors from "./Pages/Admin/Doctors";
import DoctorRequest from "./Pages/Admin/DoctorRequest";
import PrivateAdmin from "./Components/Admin/PrivateAdmin";
import DoctorHome from "./Pages/Doctor/DoctorHome";
import DoctorPrivateRoutes from "./Components/Doctor/DoctorPrivateRoutes";
import PrivateRoutesUser from "./Components/User/PrivateRoutesUser";
import OTP from "./Pages/User/OTP";
import ForgetPassword from "./Pages/User/ForgetPassword";
import PasswordOTP from "./Pages/User/PasswordOTP";
import NewPassword from "./Pages/User/NewPassword";
import AddDoctors from "./Pages/Admin/AddDoctors";
import ViewDoctor from "./Pages/Admin/ViewDoctor";
import Specialisation from "./Pages/Admin/Specialisation";
import AddSpecialisation from "./Pages/Admin/AddSpecialisation";
import AllSpecialist from "./Pages/User/AllSpecialist";
import Specialities from "./Pages/User/Specialities";
import DoctorDetails from "./Pages/User/DoctorDetails";
import Profile from "./Pages/User/Profile";
import FindOne from "./Pages/User/FindOne";
import PDFviewer from "./Components/Admin/PDFviewer";
import Slots from "./Pages/Doctor/Slots";
import Success from "./Pages/User/Success";
import Forget_Password from "./Pages/Doctor/Forget_Password";
import DoctorNewPassword from "./Pages/Doctor/DoctorNewPassword";
import TipsPage from "./Pages/User/TipsPage";
import About from "./Pages/User/About";
import ScheduledAppointments from "./Pages/User/ScheduledAppointments";
import AppointmentsScheduled from "./Pages/Doctor/AppointmentsScheduled";
import VideoCall from "./Pages/Doctor/VideoCall";
import Payments from "./Pages/User/Payments";
import MedicalReport from "./Pages/User/MedicalReport";
import MedicalRecords from "./Pages/Doctor/MedicalRecords";
import ViewSpecialisation from "./Pages/Admin/ViewSpecialisation";
import Transaction from "./Pages/Admin/Transaction";
import Dashboard from "./Pages/Admin/Dashboard";
import Availability from "./Pages/User/Availability";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Routes>

        <Route path="/forget_password" element={<ForgetPassword />} />

        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/otp" element={<OTP />} />
        <Route path="/forget_password/otp" element={<PasswordOTP />} />
        <Route path="/newpassword" element={<NewPassword />} />
        <Route index={true} path="/" element={<Home />} />
        <Route path="/specialist" element={<AllSpecialist />} />
        <Route path="/specialities/:id" element={<Specialities />} />
        <Route path="/doctor_details/:id" element={<DoctorDetails />} />
        <Route path="/findone" element={<FindOne />} />
        <Route path="/health_tips" element={<TipsPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/checkavailability" element={<Availability />} />
        <Route path="" element={<PrivateRoutesUser />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/Checkout-success/:slotId" element={<Success />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/scheduled_appointments" element={<ScheduledAppointments />} />
          <Route path="/medical_report" element={<MedicalReport />} />
        </Route>

        <Route path="/doctor_login" element={<LoginDoctor />} />
        <Route path="/doctor_register" element={<DoctorRegistration />} />
        <Route path="/doctor/forget_password" element={<Forget_Password />} />
        <Route path="/doctor/new_password" element={<DoctorNewPassword />} />
        <Route path="" element={<DoctorPrivateRoutes />}>
          <Route path="/doctor" element={<DoctorHome />} />
          <Route path="/doctors_slots" element={<Slots />} />
          <Route path="/doctor/scheduled_appointments" element={<AppointmentsScheduled />} />
          <Route path="/doctors_medicalreport" element={<MedicalRecords />} />
        </Route>

        <Route path="/room/:userId/:appointmentId" element={<VideoCall />} />

        <Route path="/admin" element={<LoginAdmin />} />
        <Route path="" element={<PrivateAdmin />}>
          <Route path="/admin/users" element={<Users key={Date.now()} />} />
          <Route path="/admin/dashboards" element={<Dashboard />} />
          <Route path="/admin/doctors" element={<Doctors />} />
          <Route path="/admin/doctor_request" element={<DoctorRequest />} />
          <Route path="/admin/add_doctors" element={<AddDoctors />} />
          <Route path="/admin/doctors/view/:doctorId" element={<ViewDoctor />} />
          <Route path="/admin/specialisation" element={<Specialisation />} />
          <Route path="/admin/add_specialisation" element={<AddSpecialisation />} />
          <Route path="/pdf-viewer" element={<PDFviewer />} />
          <Route path="/viewSpecialisation/:id" element={<ViewSpecialisation />} />
          <Route path="/admin/transaction" element={<Transaction />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
