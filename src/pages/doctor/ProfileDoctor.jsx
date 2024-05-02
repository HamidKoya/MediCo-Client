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
import { Button, Modal } from "flowbite-react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Swal from "sweetalert2";

function ProfileDoctor() {
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    startTime: "",
    endTime: "",
    slotDuration: "5",
    date: "",
  });
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

  const handleChange2 = (e) => {
    try {
      const { name, value } = e.target;
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit2 = async (event) => {
    try {
      event.preventDefault(); // Prevent default form submission
      const response = await axios.post("http://localhost:3000/doctor/slotCreation",{doctorId,formData})
      if (response?.data?.success === true) {
        const Toast = Swal.mixin({
          toast: true,
          position: "top",
          showConfirmButton: false,
          timer: 3000,
        });

        Toast.fire({
          icon: "success",
          title: response?.data?.message,
        });
        setOpenModal(false);
      } else {
        const Toast = Swal.mixin({
          toast: true,
          position: "top",
          showConfirmButton: false,
          timer: 3000,
        });

        Toast.fire({
          icon: "info",
          title: response?.data?.message,
        });
      }
    } catch (error) {
      console.error("Error:", error.message);
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
            <Link to={"/doctor/appointments"}>
              <button className="p-2 bg-green-400 text-sm rounded-md font-semibold text-white flex justify-center items-center active:scale-90">
                APPOINTMENTS{" "}
                <span className="ml-2">
                  <FaCalendarCheck />
                </span>
              </button>
            </Link>

            <button
              onClick={() => setOpenModal(true)}
              className="p-2 bg-yellow-300 text-sm rounded-md font-semibold text-white flex justify-center items-center active:scale-90"
            >
              CREATE SLOTS{" "}
              <span className="ml-2">
                <FaRegCalendarPlus />
              </span>
            </button>
          </div>
        </div>
      </div>

      <Modal
        show={openModal}
        onClose={() => setOpenModal(false)}
        className="max-h-[620px] max-w-[600px] mx-auto mt-14 bg-transparent"
      >
        <Modal.Header>Create Slots</Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit2}>
            <div className="space-y-6 flex justify-center flex-col">
              <label htmlFor="eventDate">Date:</label>
              <div className="flex justify-center ">
                <Calendar
                  onChange={(date) =>
                    handleChange2({ target: { name: "date", value: date } })
                  }
                  value={formData.date}
                />
              </div>

              <label htmlFor="startTime">Start Time:</label>
              <input
                type="time"
                id="startTime"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange2}
                className="bg-slate-500 text-white"
                required
              />

              <label htmlFor="endTime">Ending Time:</label>
              <input
                type="time"
                id="endTime"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange2}
                className="bg-slate-500 text-white"
                required
              />

              <label htmlFor="eventDuration">Duration (in minutes):</label>
              <select
                id="slotDuration"
                name="slotDuration"
                value={formData.slotDuration}
                onChange={handleChange2}
                className="bg-slate-500 text-white"
                required
              >
                <option value="5">5 minutes</option>
                <option value="10">10 minutes</option>
                <option value="15">15 minutes</option>
                {/* Add more options as needed */}
              </select>
            </div>
            <Modal.Footer>
              <Button type="submit" color="gray">
                create
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                Decline
              </Button>
            </Modal.Footer>
          </form>
        </Modal.Body>
      </Modal>

      <Footer />
    </div>
  );
}

export default ProfileDoctor;
