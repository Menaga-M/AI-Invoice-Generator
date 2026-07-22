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
import Dashboard from "./pages/Dashboard/Dashboard";
import AllInvoices from "./pages/Invoices/AllInvoices";
import CreateInvoice from "./pages/Invoices/CreateInvoice";
import InvoiceDetail from "./pages/Invoices/InvoiceDetail";
import Profile from "./pages/Profile/ProfilePage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { AuthProvider } from "./context/AuthContent";

const App =  () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>  
          {/* Public Routes */}
          <Route path="/" element={<LandingPage/>} />
          <Route path="/Signup" element={<SignUp/>} />
          <Route path="/Login" element={<Login/>} />

          <Route path="/" element={<ProtectedRoute/>}>
            <Route path="dashboard" element={<Dashboard/>} />
            <Route path="invoices" element={<AllInvoices/>} />
            <Route path="invoices/new" element={<CreateInvoice/>} />
            <Route path="invoices/:id" element={<InvoiceDetail/>} />
            <Route path="profile" element={<Profile/>} />
          </Route>

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
    </AuthProvider>
  )
};

export default App;