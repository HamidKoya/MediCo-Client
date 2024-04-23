import React from "react";
import Header2 from "@/components/user/Header2";
import Footer from "@/components/user/Footer";

function DoctorsList() {
  return (
    <div>
      <Header2 />
      <div className="bg-[#88B3BC] h-screen">
        <h2 className="mt-1 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Login Now
        </h2>
      </div>
      <Footer />
    </div>
  );
}

export default DoctorsList;
