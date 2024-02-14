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

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Routes>
        <Route index={true} path="/" element={<Home/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/login" element={<Login/>} />

        <Route path="/doctor" element={<DoctorHome/>} />
        <Route path="/doctor_login" element={<LoginDoctor/>} />
        <Route path="/doctor_register" element={<DoctorRegistration/>} />

        <Route path="/admin" element={<LoginAdmin/>} />

        <Route path="" element={<PrivateAdmin/>}> 
          <Route path="/admin/users" element={<Users/>} />
          <Route path="/admin/doctors" element={<Doctors/>} />
          <Route path="/admin/doctor_request" element={<DoctorRequest/>} />
        </Route>

      </Routes>
    </div>
  );
}

export default App;
