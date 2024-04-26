import React from "react";
import Header from "@/components/doctor/Header";
import Footer from "@/components/doctor/Footer";

function DashboardDoctor() {
  return (
    <div>
      <Header/>
      <div className="bg-violet-600 h-screen">Dashboard</div>
      <Footer/>
    </div>
  );
}

export default DashboardDoctor;
