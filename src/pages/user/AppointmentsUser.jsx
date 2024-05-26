import React from "react";
import Header from "@/components/user/Header2";
import Footer from "@/components/user/Footer";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "@/components/user/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { Button, Modal } from "flowbite-react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function AppointmentsUser() {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const userId = currentUser.userData._id;
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [render, setRender] = useState(false);
  const [appo, setAppo] = useState([]);
  const [pagination, setPagination] = useState({});
  const [currentDate, setCurrentDate] = useState();
  const [currentTime, setCurrentTime] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState();
  const [drId, setDrId] = useState();
  const [review, setReview] = useState();
  const [openModalx, setOpenModalx] = useState(false);
  const [btn, setBtn] = useState(false);
  const [rating, setRating] = useState(3);
  const limit = 5;
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3000/appointmentList?id=${userId}`, {
        params: {
          currentPage,
          limit,
        },
      })
      .then((res) => {
        setLoading(false);
        setAppo(res.data.data);
        setPagination(res?.data?.pagination);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err.message);
      });
  }, [userId, currentPage, limit, render]);

  const isCancelDisabled = (appointmentDate, appointmentStartTime) => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const currentDay = currentDate.getDate();

    const currentDateString = `${currentYear}-${currentMonth
      .toString()
      .padStart(2, "0")}-${currentDay.toString().padStart(2, "0")}`;
    const currentTimeString = currentDate
      .toLocaleTimeString("en-US", { hour12: false })
      .slice(0, 5);

    // Combine appointment date and time strings
    const combinedAppointmentDateTimeString = `${appointmentDate} ${appointmentStartTime}`;

    // Create Date objects for current date/time and appointment date/time
    const currentDateObject = new Date(
      `${currentDateString} ${currentTimeString}`
    );
    const appointmentDateObject = new Date(combinedAppointmentDateTimeString);

    // Compare timestamps to check if current date/time is greater than or equal to appointment date/time
    if (currentDateObject.getTime() >= appointmentDateObject.getTime()) {
      return true; // Disable the cancel button
    }

    return false; // Enable the cancel button
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setOpenModal(false);
      if (!rating || !review) {
        const Toast = Swal.mixin({
          toast: true,
          position: "top",
          showConfirmButton: false,
          timer: 3000,
        });
        Toast.fire({
          icon: "error",
          title: "Rating and/or review cannot be empty",
        });
        return;
      }
      const res = await axios.post("http://localhost:3000/addReview", {
        userId: userId,
        drId,
        review,
        rating,
      });

      if (res.status === 200) {
        const Toast = Swal.mixin({
          toast: true,
          position: "top",
          showConfirmButton: false,
          timer: 3000,
        });
        Toast.fire({
          icon: "success",
          title: res.data.message,
        });
      }
    } catch (error) {
      if (error) {
        const Toast = Swal.mixin({
          toast: true,
          position: "top",
          showConfirmButton: false,
          timer: 3000,
        });
        Toast.fire({
          icon: "info",
          title: error.response.data.message,
        });
      }
      console.log(error.message);
    }
  };

  const handleChange = (e) => {
    try {
      e.preventDefault();

      if (e.target.name === "reviewText") {
        const reviewValue = e.target.value;

        if (reviewValue.trim() !== "") {
          setReview(reviewValue);
        } else {
          console.error("Review text cannot be empty");
        }
      } else if (e.target.name === "rating") {
        const ratingValue = parseInt(e.target.value, 10);

        if (!isNaN(ratingValue) && ratingValue >= 1 && ratingValue <= 5) {
          setRating(ratingValue);
        } else {
          console.error("Rating must be a number between 1 and 5");
        }
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const consultationReport = () => {
    try {
      navigate("/consultationreport", {
        state: {
          data: data,
        },
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleAccept = async () => {
    try {
      const response = await axios.post("http://localhost:3000/createChat", {
        userid: userId,
        doctorid: drId,
      });
      setBtn(true);
      setOpenModal(true);
      Swal.fire(response?.data?.message);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleNavigate = () => {
    try {
      navigate("/chatuser");
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleCancel = async (id) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, cancel it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await axios.post("http://localhost:3000/cancelAppointment", {
            id,
            userId,
            paymentId: data.paymentId,
          });

          Swal.fire({
            title: "Cancelled!",
            text: "Your appointment has been cancelled.",
            icon: "success",
          });
          if (render === true) {
            setRender(false);
          } else {
            setRender(true);
          }
        }
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <Header />
      <div>
        <div className="bg-blue-50 min-h-[600px]">
          {loading ? (
            <Loading />
          ) : appo.length === 0 ? (
            <div className="text-center py-6">
              <p className="text-gray-600 text-lg">
                No appointments available.
              </p>
            </div>
          ) : (
            <>
              <p className="pt-8 text-xl font-semibold underline underline-offset-8 flex justify-center">
                Appointments
              </p>
              <div className="flex justify-center pt-8">
                <div class="relative  bg-gray-50 h-[400px] overflow-x-auto shadow-md sm:rounded-lg">
                  <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-green-400 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" class="px-6 py-3 text-center">
                          No
                        </th>
                        <th scope="col" class="px-6 py-3 text-center">
                          Doctor
                        </th>
                        <th scope="col" class="px-6 py-3 text-center">
                          Appo.Date
                        </th>
                        <th scope="col" class="px-6 py-3 text-center">
                          Booked Date
                        </th>
                        <th scope="col" class="px-6 py-3 text-center">
                          Amount
                        </th>
                        <th scope="col" class="px-6 py-3 text-center">
                          Timing
                        </th>
                        <th scope="col" class="px-6 py-3 text-center">
                          Status
                        </th>
                        <th scope="col" class="px-6 py-3 text-center">
                          More
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {appo.map((appointment, index) => (
                        <tr
                          key={appointment._id}
                          class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                        >
                          <th
                            scope="row"
                            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center"
                          >
                            {index + 1}
                          </th>
                          <td class="px-6 py-4 text-center">
                            {appointment.doctorDetails.name}
                          </td>
                          <td class="px-6 py-4 text-center">
                            {appointment.consultationDate}
                          </td>
                          <td class="px-6 py-4 text-center">
                            {appointment.createdAt}
                          </td>
                          <td class="px-6 py-4 text-center">299</td>
                          <td class="px-6 py-4 text-center">
                            {appointment.start} - {appointment.end}
                          </td>
                          <td
                            class={`px-6 py-4 text-center ${
                              appointment.status === "Done"
                                ? "text-green-500"
                                : appointment.status === "Cancelled"
                                ? "text-red-600"
                                : appointment.status === "CancelledByDoctor"
                                ? "text-red-600"
                                : appointment.status === "Pending"
                                ? "text-yellow-300"
                                : ""
                            }`}
                          >
                            {appointment.status}
                          </td>
                          <td
                            onClick={() => {
                              setOpenModal(true);
                              setData(appointment);
                              setDrId(appointment.doctorDetails._id);
                            }}
                            class="px-6 py-4 text-blue-500 font-semibold cursor-pointer"
                          >
                            More
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              {pagination && pagination.totalPages && (
                <div className="flex justify-center mt-4 bg-blue-50">
                  {Array.from({ length: pagination.totalPages }, (_, index) => (
                    <button
                      key={index + 1}
                      onClick={() => setCurrentPage(index + 1)}
                      className={`pagination-btn border w-10 ${
                        index + 1 === currentPage
                          ? "border-black"
                          : "border-gray-300"
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              )}

              {/* Main modal */}
              {data && (
                <Modal
                  className="w-96 sm:w-[600px] mx-auto my-auto mt-36"
                  show={openModal}
                  onClose={() => setOpenModal(false)}
                >
                  <Modal.Header>More Info</Modal.Header>
                  <Modal.Body>
                    {data.status === "Done" ? (
                      <div className="">
                        <form
                          onSubmit={handleSubmit}
                          onChange={handleChange}
                          className="h-800"
                        >
                          <h1 className="text-3xl flex justify-center text-blue-500 pt">
                            Consultation Completed
                          </h1>

                          <div className="flex justify-center m-5">
                            <label htmlFor="reviewText" className="sr-only">
                              Add Your Review
                            </label>
                            <textarea
                              id="reviewText"
                              name="reviewText"
                              value={review}
                              onChange={handleChange}
                              className="w-full h-32 rounded-lg"
                              placeholder="Enter your review"
                              required
                            ></textarea>
                          </div>

                          <div className="rating flex justify-center">
                            {[1, 2, 3, 4, 5].map((value) => (
                              <input
                                key={value}
                                type="radio"
                                id={`rating-${value}`}
                                name="rating"
                                value={value}
                                checked={rating === value}
                                className="mask mask-star-2 bg-green-500"
                              />
                            ))}
                          </div>

                          <div className="flex justify-center m-5">
                            <button
                              type="submit"
                              className="border border-yellow-500 text-yellow-500 bg-transparent hover:bg-yellow-500 hover:text-white w-60 p-2 rounded-md"
                            >
                              Add Your Review
                            </button>
                          </div>
                        </form>
                        <div className="flex justify-center ">
                          <button
                            onClick={consultationReport}
                            className="w-60 border border-green-500 text-green-500 hover:bg-green-500 hover:text-white p-2 rounded-md"
                          >
                            Consultation report
                          </button>
                        </div>
                      </div>
                    ) : data.status === "Cancelled" ? (
                      <h1 className="text-red-500">
                        Your appointment has been cancelled
                      </h1>
                    ) : data.status === "CancelledByDoctor" ? (
                      <div>
                        <h1 className="text-red-500">
                          Your appointment has been cancelled by the doctor
                        </h1>
                        <h1 className="text-red-500">
                          Sorry for the inconvenience, your amount will be
                          credited to the wallet
                        </h1>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <p className="text-2xl leading-relaxed text-gray-500 dark:text-gray-400">
                          Your appointment is scheduled for{" "}
                          <span className="text-red-600">
                            {data.consultationDate}
                          </span>{" "}
                          from{" "}
                          <span className="text-red-600">{data.start}</span> to{" "}
                          <span className="text-red-600">{data.end}</span>.
                          Please be ready at that time for your consultation.{" "}
                        </p>

                        <br />

                        <div className="space-y-6">
                          <p className="text-xl text-red-500">
                            {!isCancelDisabled(
                              data.consultationDate,
                              data.start
                            ) ? (
                              <button
                                className="w-full bg-red-500 text-white py-2 px-4 rounded"
                                onClick={() => {
                                  handleCancel(data._id);
                                  setOpenModal(false);
                                }}
                              >
                                Cancel Appointment
                              </button>
                            ) : (
                              <span className="text-blue-500">
                                {" "}
                                You can't cancel the appointment{" "}
                              </span>
                            )}
                          </p>
                        </div>
                        <br />
                      </div>
                    )}
                  </Modal.Body>

                  <Modal.Footer className="flex justify-center">
                    {data.status === "Pending" && (
                      <>
                        {btn ? (
                          <div className="flex justify-center">
                            <Button
                              color="yellow"
                              className="border-yellow-300 hover:bg-yellow-50 w-40"
                              onClick={() => handleNavigate()}
                            >
                              Chat with doctor
                            </Button>
                          </div>
                        ) : (
                          <div className="flex justify-center">
                            <Button
                              color="yellow"
                              className="w-36 border-yellow-300 hover:bg-yellow-50"
                              onClick={() => {
                                setOpenModalx(true);
                                setOpenModal(false);
                              }}
                            >
                              Connect doctor
                            </Button>
                          </div>
                        )}
                        <div className="flex justify-center">
                          <Button
                            color="green"
                            className="w-20 border-green-400 hover:bg-green-100"
                            onClick={() => {
                              handlePrescription();
                            }}
                          >
                            {" "}
                            Prescription
                          </Button>
                        </div>
                        <div className="flex justify-center">
                          <Button
                            color="red"
                            className="w-35 border-red-400 hover:bg-red-100"
                            onClick={() => {
                              handleReport();
                            }}
                          >
                            {" "}
                            Medical report
                          </Button>
                        </div>
                      </>
                    )}
                    {data.status === "Done" && (
                      <>
                        {btn ? (
                          <div className="flex justify-center">
                            <Button
                              color="yellow"
                              className="border-yellow-300 hover:bg-yellow-50"
                              onClick={() => handleNavigate()}
                            >
                              Chat with doctor
                            </Button>
                          </div>
                        ) : (
                          <div className="flex justify-center ">
                            <Button
                              color="yellow"
                              className="w-30 border-yellow-300 hover:bg-yellow-50"
                              onClick={() => setOpenModalx(true)}
                            >
                              Connect doctor
                            </Button>
                          </div>
                        )}
                        <div className="flex justify-center ">
                          <Button
                            color="green"
                            className="w-20 border-green-400 hover:bg-green-100"
                            onClick={() => {
                              handlePrescription();
                            }}
                          >
                            Prescription
                          </Button>
                        </div>
                        <div className="flex justify-center">
                          <Button
                            color="red"
                            className="w-40 border-red-400 hover:bg-red-100"
                            onClick={() => {
                              handleReport();
                            }}
                          >
                            {" "}
                            Medical report
                          </Button>
                        </div>
                      </>
                    )}
                    {data.status === "Cancelled" && <></>}
                  </Modal.Footer>
                </Modal>
              )}

              {/* chat confirmation modal  */}
              <Modal
                className="w-[500px] mx-auto my-auto mt-24"
                show={openModalx}
                onClose={() => setOpenModalx(false)}
              >
                <Modal.Header>Connect Doctor</Modal.Header>
                <Modal.Body>
                  <div className="space-y-6">
                    <div className="flex justify-center">
                      <div className="relative group cursor-pointer group overflow-hidden  text-gray-50 h-72 w-56  rounded-2xl hover:duration-700 duration-700">
                        <div className="w-56 h-72 bg-blue-500 text-gray-800">
                          <div className="flex flex-row justify-center">
                            <FontAwesomeIcon
                              icon={faComment}
                              className=" m-10 w-20 h-20 "
                            />
                          </div>
                        </div>
                        <div className="absolute bg-black -bottom-24 w-56 p-3 flex flex-col gap-1 group-hover:-bottom-0 group-hover:duration-600 duration-500">
                          <span className="text-white font-bold text-xs">
                            CONNECT
                          </span>
                          <span className="text-white font-bold text-3xl">
                            With doctor.
                          </span>
                          <p className="text-white">
                            Click I accept to connect with doctor
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    className="border-2 border-green-500 text-green-500"
                    onClick={() => {
                      handleAccept();
                      setOpenModalx(false);
                    }}
                  >
                    I accept
                  </Button>

                  <Button
                    className="border-2 border-red-500 text-red-500"
                    onClick={() => setOpenModalx(false)}
                  >
                    Decline
                  </Button>
                </Modal.Footer>
              </Modal>
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AppointmentsUser;
