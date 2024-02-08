import { Routes, Route } from "react-router-dom"
import './App.css';

import Home from "./Pages/User/Home";
import SignUp from "./Pages/User/SignUp";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route index={true} path="/" element={<Home/>} />
        
        <Route path="/signup" element={<SignUp/>} />

      </Routes>
    </div>
  );
}

export default App;
