import React from "react";
import Header from "@/components/doctor/Header";
import Footer from "@/components/doctor/Footer";
import { FaCalendarCheck } from "react-icons/fa";
import { FaRegCalendarPlus } from "react-icons/fa";
import { useSelector } from "react-redux";
import EditProfile from "@/components/doctor/EditProfile";


function ProfileDoctor() {
  const {currentDoctor} = useSelector((state)=>state.doctor)
  return (
    <div>
      <Header />
      <div className="bg-blue-50 p-10 flex flex-col justify-center items-center">
        <h1 className="text-xl font-semibold mb-5">Doctor Profile</h1>
        <div className="bg-white w-[370px] sm:w-[400px] h-[500px] rounded-xl shadow-2xl shadow-slate-400 relative">
          <div className="mt-10 flex flex-col justify-center items-center gap-3">
            <img
              src={currentDoctor.doctorData.photo}
              alt="profile"
              className="w-36 h-36 rounded-2xl"
            />
            <p className="font-medium text-lg">Name : Dr. {currentDoctor.doctorData.name}</p>
            <p className="font-medium">Speciality : {currentDoctor.doctorData.speciality}</p>
            <p className="font-medium">Experience : {currentDoctor.doctorData.experience?(<span>{currentDoctor.doctorData.experience}</span>):(<span className="text-red-600">Not added</span>)}</p>
            <p className="font-medium">Email : {currentDoctor.doctorData.email}</p>
            <p className="font-medium">Mobile : {currentDoctor.doctorData.mobile}</p>
            {}
            <p className="font-normal">Bio : {currentDoctor.doctorData.bio?(<span>{currentDoctor.doctorData.bio}</span>):(<span className="text-red-600">Not added</span>)}</p>
          </div>
          <div className="flex gap-2 absolute bottom-3 left-2 sm:left-6">
            {/* <button className="p-2 bg-blue-500 text-sm rounded-md font-semibold text-white flex justify-center items-center active:scale-90">
              EDIT{" "}
              <span className="ml-2">
                <FaEdit />
              </span>
            </button> */}
            <EditProfile/>
            <button className="p-2 bg-green-400 text-sm rounded-md font-semibold text-white flex justify-center items-center active:scale-90">
              APPOINTMENTS{" "}
              <span className="ml-2">
                <FaCalendarCheck />
              </span>
            </button>
            <button className="p-2 bg-yellow-300 text-sm rounded-md font-semibold text-white flex justify-center items-center active:scale-90">
              CREATE SLOTS{" "}
              <span className="ml-2">
                <FaRegCalendarPlus />
              </span>
            </button>
          </div>
        </div>
        
      </div>
      <Footer />
    </div>
  );
}

export default ProfileDoctor;
