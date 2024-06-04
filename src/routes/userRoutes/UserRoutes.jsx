import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "@/pages/user/Home";
import Signup from "@/pages/user/Signup";
import UserOtp from "@/pages/user/UserOtp";
import Login from "@/pages/user/Login";
import ForgotPassword from "@/pages/user/ForgotPassword";
import ResetPassword from "@/pages/user/ResetPassword";
import Profile from "@/pages/user/Profile";
import DoctorsList from "@/pages/user/DoctorsList";
import DoctorDetailsPage from "@/pages/user/DoctorDetailsPage";
import AppointmentsUser from "@/pages/user/AppointmentsUser";
import PaymentSuccess from "@/pages/user/PaymentSuccess";
import ChatPage from "@/pages/user/ChatPage";
import ConsultationReport from "@/pages/user/ConsultationReport";
import PrescriptionUser from "@/pages/user/PrescriptionUser";
import MedicalReportUser from "@/pages/user/MedicalReportUser";
import Notifications from "@/pages/user/Notifications";
import PageNotFound from "@/pages/404/PageNotFound";

import UserPublic from "./UserPublic";
import UserProtect from "./UserProtect";

function UserRoutes() {
  return (
    <Routes>
      <Route />
      <Route path='/' element={<Home/>}/>
      <Route path='/signup' element={<UserPublic><Signup/></UserPublic>}/>
      <Route path='/userotp' element={<UserPublic><UserOtp/></UserPublic>}/>
      <Route path='/login' element={<UserPublic><Login/></UserPublic>}/>
      <Route path='/forgotpassword' element={<UserPublic><ForgotPassword/></UserPublic>}/>
      <Route path='/resetpassword/:id/:token' element={<UserPublic><ResetPassword/></UserPublic>}/>
      <Route path='/profile' element={<UserProtect><Profile/></UserProtect>} />
      <Route path='/doctors' element={<UserProtect><DoctorsList/></UserProtect>}/>
      <Route path='/doctordetails/:id' element={<UserProtect><DoctorDetailsPage/></UserProtect>}/>
      <Route path='/appointments' element={<UserProtect><AppointmentsUser/></UserProtect>}/>
      <Route path='/success' element={<UserProtect><PaymentSuccess/></UserProtect>}/>
      <Route path='/chatuser' element={<UserProtect><ChatPage/></UserProtect>}/>
      <Route path='/consultationreport' element={<UserProtect><ConsultationReport/></UserProtect>}/>
      <Route path='/prescription' element={<UserProtect><PrescriptionUser/></UserProtect>}/>
      <Route path='/medicalreport' element={<UserProtect><MedicalReportUser/></UserProtect>}/>
      <Route path='/notifications' element={<UserProtect><Notifications/></UserProtect>}/>
      <Route path='*' element={<PageNotFound/>}/>
    </Routes>
  );
}

export default UserRoutes;
