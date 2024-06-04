import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminPublic from "./AdminPublic";
import AdminProtect from "./AdminProtect";

import UsersList from "@/pages/admin/UsersList";
import Dashboard from "@/pages/admin/Dashboard";
import Appointments from "@/pages/admin/Appointments";
import Doctors from "@/pages/admin/Doctors";
import Specialties from "@/pages/admin/Specialties";
import VerifyDoctors from "@/pages/admin/VerifyDoctors";
import AdminLogin from "@/pages/admin/AdminLogin";
import VerifyDetails from "@/pages/admin/VerifyDetails";
import DoctorDetails from "@/pages/admin/DoctorDetails";

import PageNotFound from "@/pages/404/PageNotFound";

function AdminRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<AdminPublic><AdminLogin/></AdminPublic>} />
      <Route path="/dashboard" element={<AdminProtect><Dashboard /></AdminProtect>} />
      <Route path="/appointments" element={<AdminProtect><Appointments /></AdminProtect>} />
      <Route path="/users" element={<AdminProtect><UsersList /></AdminProtect>} />
      <Route path="/doctors" element={<AdminProtect><Doctors /></AdminProtect>} />
      <Route path="/verifydoctors" element={<AdminProtect><VerifyDoctors /></AdminProtect>} />
      <Route path="/specialties" element={<AdminProtect><Specialties /></AdminProtect>} />
      <Route path="/verifiedDetails/:id" element={<AdminProtect><VerifyDetails /></AdminProtect>} />
      <Route path="/doctordetails/:id" element={<AdminProtect><DoctorDetails /></AdminProtect>} />
      <Route path="*" element={<PageNotFound/>} />
    </Routes>
  );
}

export default AdminRoutes;
