import React from "react";
import Header from "@/components/admin/Header";
import Sidebar from "@/components/admin/Sidebar";
import Footer from "@/components/admin/Footer";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function DoctorDetails() {
  const [doctorData, setDoctorData] = useState(null);
  console.log(doctorData._id);
  const { id } = useParams();

  useEffect(() => {
    axios
      .post("http://localhost:3000/admin/doctorDetails", { id })
      .then((res) => {
        setDoctorData(res?.data?.details);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  const handleClick = async (userId) => {
    
    try {
      await axios.patch("http://localhost:3000/admin/doctorblockUnblock", {
        userId
      });
      const res = await axios.post(
        "http://localhost:3000/admin/doctorDetails",
        { id }
      );
      setDoctorData(res?.data?.details);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div>
      <Header />
      <div className="flex">
        <Sidebar />
        <div className="w-[84vw] sm:w-full bg-slate-900 text-white p-6">
          {doctorData && (
            <div className="flex justify-center">
              <div className="card w-[400px] bg-black shadow-xl mx-10 mt-9 rounded-xl flex flex-col items-center">
                {" "}
                {/* Updated styles here */}
                <figure className="px-10 pt-10">
                  <img
                    src={doctorData.photo}
                    alt={doctorData.name}
                    className="rounded-xl"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title text-3xl font-bold mb-4">
                    Dr. {doctorData.name}
                  </h2>
                  <p className="text-gray-300">Email: {doctorData.email}</p>
                  <p className="text-gray-300">Mobile: {doctorData.mobile}</p>
                  <p className="text-gray-300">
                    Speciality: {doctorData.speciality}
                  </p>
                  <p className="text-gray-300">
                    Experience: {doctorData.experience}
                  </p>
                  <p className="text-gray-300">
                    OTP Verified: {doctorData.otp_verified ? "Yes" : "No"}
                  </p>
                  <p className="text-gray-300">
                    Blocked: {doctorData.is_blocked ? "Yes" : "No"}
                  </p>
                </div>
                <div className="card-actions">
                  <button
                    className="btn text-white w-24 p-1 rounded-md active:scale-90"
                    onClick={() => handleClick(doctorData._id)}
                    style={{
                      backgroundColor: doctorData.is_blocked ? "green" : "red",
                    }}
                  >
                    {doctorData.is_blocked ? "UNBLOCK" : "BLOCK"}
                  </button>

                  {/* <button className="btn btn-active btn-secondary"  onClick={()=>document.getElementById('my_modal_3').showModal()}>Certificates</button> */}
                  <button
                    className="btn btn-active btn-secondary w-24 p-1 rounded-md active:scale-90 bg-violet-700 ml-2 mt-2"
                    onClick={() =>
                      document.getElementById("my_modal_4").showModal()
                    }
                  >
                    Certificates
                  </button>
                </div>
                <br />
              </div>
            </div>
          )}

          {doctorData && (
            <dialog id="my_modal_4" className="modal bg-black">
              <div className="modal-box w-11/12 max-w-5xl bg-zinc-950 rounded-none">
                <h3 className="font-bold text-lg">CERTIFICATES</h3>
                {/* <p className="py-4">Verify the certificate</p> */}
                <div className="modal-action">
                  <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-white font-extrabold">
                      ✕
                    </button>
                    <br />

                    <div className="">
                      {doctorData.certificates.map((certificate, index) => (
                        <div key={index}>
                          <img
                            src={certificate}
                            alt={`Certificate ${index + 1}`}
                            className="rounded-xl"
                          />
                          <br />
                        </div>
                      ))}
                      <br />
                    </div>
                    <button className="btn text-white bg-violet-700 p-2 rounded-md ml-3 mb-3">Close</button>
                  </form>
                </div>
              </div>
            </dialog>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default DoctorDetails;
