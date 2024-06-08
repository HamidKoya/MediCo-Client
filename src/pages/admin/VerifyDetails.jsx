import React from "react";
import Header from "@/components/admin/Header";
import Sidebar from "@/components/admin/Sidebar";
import Footer from "@/components/admin/Footer";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function VerifyDetails() {
  const [doctorData, setDoctorData] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://medico-server-b7s5.onrender.com/admin/unVerifiedDetails?id=${id}`)
      .then((res) => {
        setDoctorData(res?.data?.details);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [id]);

  const handleClick = async (id) => {
    try {
      await axios.patch(`https://medico-server-b7s5.onrender.com/admin/adminVerify?id=${id}`);
      const res = await axios.get(
        `https://medico-server-b7s5.onrender.com/admin/unVerifiedDetails?id=${id}`
      );
      setDoctorData(res?.data?.details);
      navigate("/admin/doctors");
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
                    OTP Verified: {doctorData.otp_verified ? "Yes" : "No"}
                  </p>
                  <p className="text-gray-300">
                    Blocked: {doctorData.is_blocked ? "Yes" : "No"}
                  </p>
                </div>
                <div className="card-actions">
                  <button
                    className="btn btn-active btn-secondary bg-blue-700 p-2 mt-2 rounded-md active:scale-90"
                    onClick={() =>
                      document.getElementById("my_modal_4").showModal()
                    }
                  >
                    Click Here to View Certificates
                  </button>
                </div>
                <br />
              </div>
            </div>
          )}
        </div>
        {doctorData && (
          <dialog id="my_modal_4" className="modal bg-black rounded-md p-3">
            <div className="modal-box w-11/12 max-w-5xl bg-zinc-950 rounded-none">
              <h3 className="font-bold text-lg">CERTIFICATES </h3>
              <div className="modal-action">
                <form method="dialog">
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 bg-white text-black w-10 p-1 rounded-md font-extrabold active:scale-90">
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

                  <button
                    className="bg-green-400 text-white p-3 rounded-md ml-3 active:scale-90"
                    onClick={() => handleClick(doctorData._id)}
                  >
                    Verify
                  </button>
                  <button className="bg-violet-500 text-white p-3 rounded-md ml-3 active:scale-90">Close</button>
                </form>
              </div>
            </div>
          </dialog>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default VerifyDetails;
