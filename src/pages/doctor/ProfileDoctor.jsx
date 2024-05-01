import React from "react";
import Header from "@/components/doctor/Header";
import Footer from "@/components/doctor/Footer";
import { FaCalendarCheck } from "react-icons/fa";
import { FaRegCalendarPlus } from "react-icons/fa";
import { useSelector } from "react-redux";
import EditProfile from "@/components/doctor/EditProfile";
import { useRef, useState } from "react";
import { Toaster, toast } from "sonner";
import { signInSuccess } from "@/redux/slices/doctorSlice";
import { useDispatch } from "react-redux";
import { ScaleLoader } from "react-spinners";
import axios from "axios";
import { Link } from "react-router-dom";

function ProfileDoctor() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { currentDoctor } = useSelector((state) => state.doctor);
  const doctorId = currentDoctor.doctorData._id;
  const fileRef = useRef(null);
  const handlePhotoChange = (e) => {
    const selectedPhoto = e.target.files[0];
    setPhotoToBase(selectedPhoto);
  };
  const setPhotoToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const imageData = reader.result;
      sendImageToServer(imageData);
    };
  };
  const sendImageToServer = async (imageData) => {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:3000/doctor/changePhoto",
        {
          imageData,
          doctorId,
        }
      );
      setLoading(false);
      if (response.status === 200) {
        toast.success("Successfully profile photo changed");
        dispatch(signInSuccess(response.data));
      }
    } catch (error) {
      // Handle error
      console.error("Error uploading image:", error);
    }
  };
  return (
    <div>
      <Toaster richColors position="top-center" />
      <Header />

      <div className="bg-blue-50 p-10 flex flex-col justify-center items-center">
        <h1 className="text-xl font-semibold mb-5">Doctor Profile</h1>
        <div className="bg-white w-[370px] sm:w-[400px] h-[500px] rounded-xl shadow-2xl shadow-slate-400 relative">
          <div className="mt-10 flex flex-col justify-center items-center gap-3">
            {/* <img onClick={()=>fileRef.current.click()}
              src={currentDoctor.doctorData.photo}
              alt="profile"
              className="w-36 h-36 rounded-2xl cursor-pointer"
            /> */}
            {loading ? (
              <ScaleLoader color="#36d7b7" height={20} width={5} />
            ) : (
              <img
                onClick={() => fileRef.current.click()}
                src={currentDoctor.doctorData.photo}
                alt="image"
                class="w-36 h-36 rounded-2xl cursor-pointer object-cover"
              />
            )}
            <input
              onChange={handlePhotoChange}
              accept="image/*"
              hidden
              type="file"
              ref={fileRef}
            />
            <p className="font-medium text-lg">
              Name : Dr. {currentDoctor.doctorData.name}
            </p>
            <p className="font-medium">
              Speciality : {currentDoctor.doctorData.speciality}
            </p>
            <p className="font-medium">
              Experience :{" "}
              {currentDoctor.doctorData.experience ? (
                <span>{currentDoctor.doctorData.experience}</span>
              ) : (
                <span className="text-red-600">Not added</span>
              )}
            </p>
            <p className="font-medium">
              Email : {currentDoctor.doctorData.email}
            </p>
            <p className="font-medium">
              Mobile : {currentDoctor.doctorData.mobile}
            </p>
            {}
            <p className="font-normal">
              Bio :{" "}
              {currentDoctor.doctorData.bio ? (
                <span>{currentDoctor.doctorData.bio}</span>
              ) : (
                <span className="text-red-600">Not added</span>
              )}
            </p>
          </div>
          <div className="flex gap-2 absolute bottom-3 left-2 sm:left-6">
            {/* <button className="p-2 bg-blue-500 text-sm rounded-md font-semibold text-white flex justify-center items-center active:scale-90">
              EDIT{" "}
              <span className="ml-2">
                <FaEdit />
              </span>
            </button> */}
            <EditProfile />
            <Link to={'/doctor/appointments'}>
              <button className="p-2 bg-green-400 text-sm rounded-md font-semibold text-white flex justify-center items-center active:scale-90">
                APPOINTMENTS{" "}
                <span className="ml-2">
                  <FaCalendarCheck />
                </span>
              </button>
            </Link>

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
