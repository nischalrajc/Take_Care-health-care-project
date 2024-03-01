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

        <Route path="" element={<PrivateRoutesUser />}>
          <Route path="/profile" element={<Profile/>} />
        </Route>

        <Route path="/doctor_login" element={<LoginDoctor />} />
        <Route path="/doctor_register" element={<DoctorRegistration />} />
        <Route path="" element={<DoctorPrivateRoutes />}>
          <Route path="/doctor" element={<DoctorHome />} />
        </Route>

        <Route path="/admin" element={<LoginAdmin />} />
        <Route path="" element={<PrivateAdmin />}>
          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/doctors" element={<Doctors />} />
          <Route path="/admin/doctor_request" element={<DoctorRequest />} />
          <Route path="/admin/add_doctors" element={<AddDoctors />} />
          <Route path="/admin/doctors/view/:doctorId" element={<ViewDoctor />} />
          <Route path="/admin/specialisation" element={<Specialisation />} />
          <Route path="/admin/add_specialisation" element={<AddSpecialisation />} />

        </Route>

      </Routes>
    </div>
  );
}

export default App;
