import React from "react";
import { Routes, Route } from "react-router-dom";

import DoctorProtect from "./DoctorProtect";
import DoctorPublic from "./DoctorPublic";

import Doctor from "@/pages/doctor/Doctor";
import LoginDoctor from "@/pages/doctor/LoginDoctor";
import SignupDoctor from "@/pages/doctor/SignupDoctor";
import OtpDoctor from "@/pages/doctor/OtpDoctor";
import DoctorForgotPassword from "@/pages/doctor/DoctorForgotPassword";
import ResetPasswordDoctor from "@/pages/doctor/ResetPasswordDoctor";
import DashboardDoctor from "@/pages/doctor/DashboardDoctor";
import ProfileDoctor from "@/pages/doctor/ProfileDoctor";
import SlotsDoctor from "@/pages/doctor/SlotsDoctor";
import AppointmentsDoctor from "@/pages/doctor/AppointmentsDoctor";
import ReviewsDoctor from "@/pages/doctor/ReviewsDoctor";
import ChatPageDoctor from "@/pages/doctor/ChatPageDoctor";
import Prescription from "@/pages/doctor/Prescription";
import MedicalReport from "@/pages/doctor/MedicalReport";
import PageNotFound from "@/pages/404/PageNotFound";

function DoctorRoutes() {
  return (
    <Routes>
      <Route path="/home" element={<DoctorPublic><Doctor/></DoctorPublic>} />
      <Route path="/login" element={<DoctorPublic><LoginDoctor/></DoctorPublic>} />
      <Route path="/signup" element={<DoctorPublic><SignupDoctor/></DoctorPublic>} />
      <Route path="/otp" element={<DoctorPublic><OtpDoctor/></DoctorPublic>} />
      <Route path="/forgotpassword" element={<DoctorPublic><DoctorForgotPassword/></DoctorPublic>} />
      <Route path="/resetpassword/:id/:token" element={<DoctorPublic><ResetPasswordDoctor/></DoctorPublic>}/>
      <Route path="/dashboard" element={<DoctorProtect><DashboardDoctor/></DoctorProtect>} />
      <Route path="/profile" element={<DoctorProtect><ProfileDoctor/></DoctorProtect>} />
      <Route path="/slots" element={<DoctorProtect><SlotsDoctor/></DoctorProtect>} />
      <Route path="/appointments" element={<DoctorProtect><AppointmentsDoctor/></DoctorProtect>} />
      <Route path="/reviews" element={<DoctorProtect><ReviewsDoctor/></DoctorProtect>} />
      <Route path="/chatpagedoctor" element={<DoctorProtect><ChatPageDoctor/></DoctorProtect>} />
      <Route path="/prescription" element={<DoctorProtect><Prescription/></DoctorProtect>} />
      <Route path="/medicalreport" element={<DoctorProtect><MedicalReport/></DoctorProtect>} />
      <Route path="*" element={<PageNotFound/>} />
    </Routes>
  );
}

export default DoctorRoutes;
