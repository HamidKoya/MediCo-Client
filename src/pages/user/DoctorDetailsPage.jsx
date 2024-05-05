import React from "react";
import Header2 from "@/components/user/Header2";
import Footer from "@/components/user/Footer";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal } from "flowbite-react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
function DoctorDetailsPage() {
  const {currentUser} = useSelector((state)=>state.user)
  const userId = currentUser.userData._id
  const { id } = useParams();
  const [doctor, setDoctor] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [slots, setSlots] = useState([]);
  const [date, setDate] = useState();
  const [select, setSelect] = useState();
  const price = {
    id: 'price_1PD1J2SCJjN9vy1RN8YGfKud',
    amount: 299,
};
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

  const handleChange = async (date) => {
    try {
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);

      if (date < currentDate) {
        Swal.fire({
          icon: "error",
          title: "Invalid Date",
          text: "Please select a date in the future.",
        });
        setSelect(null);
        setSlots([]);
        return;
      }
      setDate(date);

      const response = await axios.get(
        `http://localhost:3000/slotList?id=${id}&date=${date}`
      );

      const availableSlots = response?.data?.availableSlots;

      if (availableSlots && availableSlots.length > 0) {
        let allAvailableSlots = [];
        availableSlots.forEach((slot) => {
          slot?.timeSlots?.forEach((timeSlot) => {
            if (timeSlot.booked === false) {
              allAvailableSlots.push(timeSlot);
            }
          });
        });
        setSlots(allAvailableSlots);
      } else {
        setSlots([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelect = async (slotId) => {
    try {
      if (select === slotId) {
        setSelect(null);
      } else {
        setSelect(slotId);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handlePayment = async () => {
    try {
      if (select) {
      const response = await axios.post("http://localhost:3000/makePayment",{ price, id, select, date, userId })
      console.log(response);
        if (response.status === 200) {
          window.location.href = response?.data?.session.url;
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const walletPay = async () => {
    try {
      console.log("hello from wallet");
    } catch (error) {
      console.log(error.mesage);
    }
  };

  return (
    <div>
      <Header2 />
      <div class="flex justify-center items-center bg-blue-50 h-full">
        <div class="grid sm:grid-cols-2 grid-cols-1 gap-4 my-12">
          <div class="w-[350px] sm:w-[400px] h-[500px] bg-white shadow-2xl shadow-slate-500 rounded-2xl">
            <div className="flex flex-col justify-center items-center mt-10 gap-3 mb-3">
              {doctor && (
                <img
                  src={doctor.photo}
                  alt=""
                  className="w-36 h-36 rounded-full"
                />
              )}
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
              <button
                onClick={() => setOpenModal(true)}
                className="bg-teal-400 p-2 text-sm font-semibold text-white rounded-lg active:scale-90"
              >
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

      <Modal
        show={openModal}
        onClose={() => setOpenModal(false)}
        className="max-w-[650px] max-h-[600px] mx-auto mt-14"
      >
        <Modal.Header>Select Date and Time</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <label htmlFor="datePicker">Select Date:</label>
            <div className="flex justify-center">
              <Calendar onChange={(date) => handleChange(date)} />
            </div>
            <p>Available Slots:</p>
            {slots.length > 0 ? (
              <ul className="flex flex-wrap justify-center">
                {slots.map((slot, index) => {
                  const slotStartTime = slot.start;
                  const currentDate = new Date();
                  let isSlotDisabled = false;

                  if (date < currentDate) {
                    if (slotStartTime < currentTime) {
                      isSlotDisabled = true;
                    }
                  }

                  return (
                    <li
                      key={index}
                      className={`flex items-center h-10 w-36 m-2 p-2 rounded-xl text-white ${
                        select === slot.objectId ? "bg-green-500" : ""
                      } ${
                        isSlotDisabled
                          ? "bg-gray-300 cursor-not-allowed"
                          : "bg-blue-500 hover:bg-blue-700"
                      }`}
                    >
                      <input
                        type="checkbox"
                        id={`slot-${index}`}
                        className="mr-2"
                        checked={select === slot.objectId}
                        onChange={() => handleSelect(slot.objectId)}
                        disabled={isSlotDisabled}
                      />
                      <label
                        htmlFor={`slot-${index}`}
                        className="flex-1"
                      >{`${slot.start} - ${slot.end}`}</label>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="text-orange-600">
                No available slots for the selected date.
              </p>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          {slots.length > 0 && select && (
            <div className="">
              <button
                class="bg-white p-2 rounded-md font-semibold text-purple-700 border border-purple-700 hover:bg-purple-700 hover:text-white active:scale-90"
                onClick={handlePayment}
              >
                ONLINE PAYMENT
              </button>

              <button
                className="ml-3 bg-white p-2 rounded-md font-semibold text-yellow-400 border border-yellow-400 hover:bg-yellow-400 hover:text-white active:scale-90"
                onClick={walletPay}
              >
                WALLET PAY
              </button>
            </div>
          )}
        </Modal.Footer>
      </Modal>

      <Footer />
    </div>
  );
}

export default DoctorDetailsPage;
