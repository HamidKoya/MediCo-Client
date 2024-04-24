import React from "react";
import Header2 from "@/components/user/Header2";
import Footer from "@/components/user/Footer";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
function DoctorDetailsPage() {
  const [doctor, setDoctor] = useState();
  const { id } = useParams();
  useEffect(() => {
    axios
      .post("http://localhost:3000/admin/doctorDetails", { id })
      .then((response) => {
        setDoctor(response.data.details);
        // setDoctor(response?.data?.details)
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);
  return (
    <div>
      <Header2 />
      <div class="flex justify-center items-center bg-blue-50 h-full">
        <div class="grid sm:grid-cols-2 grid-cols-1 gap-4 my-12">
          <div class="w-[350px] sm:w-[400px] h-[500px] bg-white shadow-2xl shadow-slate-500 rounded-2xl">
            <div className="flex flex-col justify-center items-center mt-10 gap-3 mb-3">
             {doctor&&(<img src={doctor.photo} alt="" className="w-36 h-36 rounded-full" />)} 
              {doctor && (
                <p className="text-xl font-medium">Dr.{` ${doctor.name}`}</p>
              )}
              {doctor && (
                <>
                  {doctor.bio ? (
                    <p>{doctor.bio}</p>
                  ) : (
                    <p className="text-yellow-400">Bio not added</p>
                  )}
                </>
              )}
            </div>
            <hr />
            <div className="flex flex-col gap-4 mt-8 ml-6 font-medium">
              <p>Price:₹299</p>
              {doctor && <p>Speciality:{` ${doctor.speciality}`}</p>}
              {doctor && <p>Experience:{` ${doctor.experience}`}</p>}
            </div>
            <div className="flex justify-center mt-4">
              <button className="bg-teal-400 p-2 text-sm font-semibold text-white rounded-lg active:scale-90">
                View Slots
              </button>
            </div>
          </div>
          <div class="w-[280px] h-[500px] bg-white shadow-2xl shadow-slate-500 rounded-2xl">
            <div className="flex justify-center mt-4">
              <p className="text-blue-600">No reviews yet</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default DoctorDetailsPage;
