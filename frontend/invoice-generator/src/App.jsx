//import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import {Toaster} from "react-hot-toast";
import LandingPage from "./pages/LandingPage/LandingPage";
import SignUp from "./pages/Auth/SignUp";
import Login from "./pages/Auth/Login";

const App =  () => {
  return (
    <div>
      <Router>
        <Routes>  
          {/* Public Routes */}
          <Route path="/" element={<LandingPage/>} />
          <Route path="/Signup" element={<SignUp/>} />
          <Route path="/Login" element={<Login/>} />

          {/* Catch all routes */}
          <Route path="*any" element={<Navigate to="/" replace/>}/>
        </Routes>
      </Router>

      <Toaster
          toastOptions={{
            className:"",
            style:{
              fontSize :"13px",
            },
          }}
      />
    </div>
  )
};

export default App;