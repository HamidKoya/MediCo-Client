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
import { useNavigate } from "react-router-dom";
function DoctorDetailsPage() {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const userId = currentUser.userData._id;
  const { id } = useParams();
  const [doctor, setDoctor] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [slots, setSlots] = useState([]);
  const [date, setDate] = useState();
  const [select, setSelect] = useState();
  const [review, setReview] = useState([]);
  console.log(review);
  const price = {
    id: "price_1PD1J2SCJjN9vy1RN8YGfKud",
    amount: 299,
  };

  function getCurrentTime24() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    // Add leading zeros to minutes if needed
    minutes = minutes < 10 ? "0" + minutes : minutes;
    // Form the time string in 24-hour format
    const currentTime24 = `${hours}:${minutes}`;
    return currentTime24;
  }

  const currentTime = getCurrentTime24();
  useEffect(() => {
    axios
      .post("https://medico-server-b7s5.onrender.com/admin/doctorDetails", { id })
      .then((response) => {
        setDoctor(response.data.details);
        // setDoctor(response?.data?.details)
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`https://medico-server-b7s5.onrender.com/getReview?id=${id}`)
      .then((res) => {
        setReview(res?.data?.reviews);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [doctor]);

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
        `https://medico-server-b7s5.onrender.com/slotList?id=${id}&date=${date}`
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
        const response = await axios.post("https://medico-server-b7s5.onrender.com/makePayment", {
          price,
          id,
          select,
          date,
          userId,
        });
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
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "bg-green-500 text-white p-2 rounded",
          cancelButton: "bg-yellow-500 text-white mx-5 p-2 rounded",
        },
        buttonsStyling: false,
      });

      const result = await swalWithBootstrapButtons.fire({
        title: "Are you sure?",
        text: "You want to do payment from your wallet!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, Do Payment!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      });

      if (result.isConfirmed) {
        const res = await axios.post("https://medico-server-b7s5.onrender.com/walletPayment", {
          userId,
          id,
          select,
          date,
        });

        if (res.status === 200) {
          Swal.fire({
            title: "Insufficient Balance",
            text: "No required amount in the wallet",
            icon: "question",
          });
        } else {
          swalWithBootstrapButtons.fire({
            title: "Payment Done!",
            text: "Your money is transferred",
            icon: "success",
          });

          setOpenModal(false);
          navigate("/appointments");
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your wallet payment is cancelled",
          icon: "error",
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <Header2 />
      <div className="flex justify-center items-center bg-blue-50 h-full">
        <div className="grid sm:grid-cols-2 grid-cols-1 gap-4 my-12">
          <div className="w-[350px] sm:w-[400px] h-[500px] bg-white shadow-2xl shadow-slate-500 rounded-2xl">
            <div className="flex flex-col justify-center items-center mt-10 gap-3 mb-3">
              {doctor && (
                <img
                  src={doctor.photo}
                  alt=""
                  className="w-36 h-36 rounded-full object-cover"
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
          <div className="w-[280px] h-[500px] bg-white shadow-2xl shadow-slate-500 rounded-2xl">
            <p className="text-center mt-2 text-green-500">Reviews from Patients</p>
            {review.length === 0 ? (
              <div className="flex justify-center mt-4">
                <p className="text-blue-600">No reviews yet</p>
              </div>
            ) : (
              review.map((rev) => (
                <div key={rev._id} className="mb-4 border p-5">
                  
                  <p className="text-xl font-semibold mb-2">{rev.text}</p>
                  <div className="flex items-center mb-1 space-x-1 rtl:space-x-reverse">
                    {Array.from({ length: rev?.star }, (_, index) => (
                      <svg
                        key={index}
                        className="w-3 h-3 text-yellow-300"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                    ))}
                  </div>
                  <div className="flex items-center mb-2">
                    <img
                      src={rev.postedBy.photo}
                      alt="User"
                      className="h-8 w-8 rounded-full mr-2 object-cover"
                    />
                    <p className="text-gray-700 mb-2 text-sm">
                      Posted by: {rev.postedBy.name}
                    </p>
                  </div>
                  <p className="text-gray-500 text-sm">
                    Posted Date: {new Date(rev.postedDate).toLocaleString()}
                  </p>
                </div>
              ))
            )}
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
                className="bg-white p-2 rounded-md font-semibold text-purple-700 border border-purple-700 hover:bg-purple-700 hover:text-white active:scale-90"
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
