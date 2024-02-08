import { Routes, Route } from "react-router-dom";
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from "./Pages/User/Home";
import SignUp from "./Pages/User/SignUp";
import Login from "./Pages/User/Login";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Routes>
        <Route index={true} path="/" element={<Home/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/login" element={<Login/>} />
      </Routes>
    </div>
  );
}

export default App;
