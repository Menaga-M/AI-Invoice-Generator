import { Navigate, Outlet } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";
import { useAuth } from "../../context/AuthContent";

const ProtectedRoute =  ({children}) => {
    const {isAuthenticated, loading} =  useAuth();

  if(loading){
    return <div>Loading...</div>
  }
  if(!isAuthenticated){
    return <Navigate to="/login" replace/>
  }
  return (
    <DashboardLayout>{children ? children : <Outlet />}</DashboardLayout>
  )
};

export default ProtectedRoute;