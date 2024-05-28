import React from "react";
import Header from "@/components/doctor/Header";
import Footer from "@/components/doctor/Footer";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "@/components/user/Loading";
import { Button, Modal } from "flowbite-react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faVideo,
  faCheck,
  faPrescriptionBottleMedical,
  faNotesMedical,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import { rescheduleSchema } from "@/validations/doctor/rescheduleValidation";

function AppointmentsDoctor() {
  const navigate = useNavigate();
  const { currentDoctor } = useSelector((state) => state.doctor);
  const doctorId = currentDoctor.doctorData._id;
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [render, setRender] = useState(false);
  const [appo, setAppo] = useState([]);
  const [pagination, setPagination] = useState({});
  const [currentDate, setCurrentDate] = useState();
  const [currentTime, setCurrentTime] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [userId, setUserId] = useState();
  const [appoDate, setAppoDate] = useState();
  const [appoStart, setAppoStart] = useState();
  const [appoEnd, setAppoEnd] = useState();
  const [appoName, setAppoName] = useState();
  const [appoId, setAppoId] = useState();
  const [appoStatus, setAppoStauts] = useState();
  const [paymentId, setPaymentId] = useState();
  const [openModalx, setOpenModalx] = useState(false);
  const [openModalR, setOpenModalR] = useState(false);
  const [btn, setBtn] = useState(false);

  const limit = 5;

  const appoDateAsDate = new Date(appoDate);
  const appDate = appoDateAsDate.toLocaleDateString();
  const currDateAsDate = new Date(currentDate);
  const currDate = currDateAsDate.toLocaleDateString();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3000/doctor/appointmentList?id=${doctorId}`, {
        params: {
          currentPage,
          limit,
        },
      })
      .then((res) => {
        setLoading(false);
        setAppo(res.data.data);
        setPagination(res?.data?.pagination);
        setCurrentDate(res?.data?.currentDate);
        setCurrentTime(res?.data?.currentTime);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err.message);
      });
  }, [doctorId, currentPage, limit, render]);

  const handleId = (id) => {
    setUserId(id);
  };

  const handleClick = (date, start, end, name, id, status, payment) => {
    setAppoDate(date);
    setAppoStart(start);
    setAppoEnd(end);
    setAppoName(name);
    setAppoId(id);
    setAppoStauts(status);
    setPaymentId(payment);
  };

  const handleLinkClick = (event) => {
    event.preventDefault()
    const baseUrl = '/video/video'

    // Append the userId as a query parameter
    const urlToOpen = `${baseUrl}?userId=${userId}`;

    window.open(urlToOpen, '_blank')
    
  };

  const handlePris = () => {
    navigate(`/doctor/prescription`, {
      state: {
        userName: appoName,
        date: appDate,
        start: appoStart,
        end: appoEnd,
        userId: userId,
        appoId: appoId,
      },
    });
  };

  const handleReport = () => {
    navigate(`/doctor/medicalreport`, {
      state: {
        userName: appoName,
        date: appDate,
        appoId: appoId,
        userId: userId,
      },
    });
  };

  const markAsDone = async () => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to undo this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes!",
      });
      if (result.isConfirmed) {
        const res = await axios.patch(
          `http://localhost:3000/doctor/markAsDone?id=${appoId}&userId=${userId}`
        );
        if (res.status === 200) {
          if (render === true) {
            setRender(false);
            setOpenModal(false);
          } else {
            setRender(true);
            setOpenModal(false);
          }
          Swal.fire({
            title: "Appointment marked as DONE!",
            icon: "success",
          });
        } else {
          Swal.fire({
            title: "Error",
            icon: "error",
          });
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleNavigate = () => {
    try {
      navigate("/doctor/chatpagedoctor");
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleCancel = async () => {
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
          setOpenModal(false);
          await axios.patch("http://localhost:3000/doctor/cancelAppointment", {
            appoId,
            paymentId,
            userId,
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

  const handleAccept = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/doctor/createChat",
        { userid: userId, doctorid: doctorId }
      );
      setBtn(true);
      setOpenModal(true);
      Swal.fire(response?.data?.message);
    } catch (error) {
      console.log(error.message);
    }
  };

  const onSubmit = async (values) => {
    try {
      const { date, startTime, endTime } = values;
      console.log(values);
      const res = await axios.patch("http://localhost:3000/doctor/reSchedule", {
        date,
        startTime,
        endTime,
        appoId,
        userId,
      });

      if (res.status === 200) {
        if (render === true) {
          setRender(false);
          setOpenModalR(false);
          setOpenModal(false);
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
        } else {
          setRender(true);
          setOpenModalR(false);
          setOpenModal(false);
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
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        date: "",
        startTime: "",
        endTime: "",
      },
      validationSchema: rescheduleSchema,
      onSubmit,
    });
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
                Appointment List
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
                          User
                        </th>
                        <th scope="col" class="px-6 py-3 text-center">
                          Appo.Date
                        </th>
                        <th scope="col" class="px-6 py-3 text-center">
                          Booked Date
                        </th>
                        <th scope="col" class="px-6 py-3 text-center">
                          Starting Time
                        </th>
                        <th scope="col" class="px-6 py-3 text-center">
                          Ending Time
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
                            {appointment.userDetails.name}
                          </td>
                          <td class="px-6 py-4 text-center">
                            {appointment.consultationDate}
                          </td>
                          <td class="px-6 py-4 text-center">
                            {appointment.createdAt}
                          </td>
                          <td class="px-6 py-4 text-center">
                            {appointment.start}
                          </td>
                          <td class="px-6 py-4 text-center">
                            {appointment.end}
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
                            class="px-6 py-4 text-blue-500 font-semibold cursor-pointer"
                            onClick={() => {
                              setOpenModal(true);
                              handleId(appointment.userDetails._id);
                              handleClick(
                                appointment.consultationDate,
                                appointment.start,
                                appointment.end,
                                appointment.userDetails.name,
                                appointment._id,
                                appointment.status,
                                appointment.paymentId,
                                appointment.user
                              );
                            }}
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

              <Modal
                className="w-[400px] sm:w-[700px] mx-auto mt-36"
                show={openModal}
                onClose={() => setOpenModal(false)}
              >
                <Modal.Header>More info</Modal.Header>
                <Modal.Body>
                  {appoStatus === "CancelledByDoctor" ? (
                    <div className="text-red-500 p-5">
                      APPOINTMENT CANCELLED BY DOCTOR
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {currDate === appDate &&
                      currentTime >= appoStart &&
                      currentTime <= appoEnd &&
                      appoStatus === "Pending" ? (
                        <React.Fragment>
                          <p className="text-xl text-green-500 ">
                            Now you can start the video call
                          </p>
                          <Link to={"/doctor/video"}>
                            <button
                              onClick={handleLinkClick}
                              className="bg-blue-500 text-white py-2 px-4 rounded w-full hover:bg-blue-400 mt-2"
                            >
                              Start Video Call{" "}
                              <FontAwesomeIcon
                                className="ml-2"
                                icon={faVideo}
                              />
                            </button>
                          </Link>
                        </React.Fragment>
                      ) : appoStatus === "Done" ? (
                        <React.Fragment>
                          <div className="text-green-500">
                            ADD MEDICAL REPORT AND PRESCRIPTION
                          </div>
                        </React.Fragment>
                      ) : appoStatus === "Cancelled" ? (
                        <div className="text-red-500 pt-5">
                          APPOINTMENT CANCELLED BY USER
                        </div>
                      ) : (
                        <div className="text-orange-500">
                          VIDEO CALL ROOM AVAILABLE IN THE DATE AND TIME
                        </div>
                      )}
                      <br />
                      {appoStatus === "Done" && (
                        <React.Fragment>
                          <button
                            onClick={() => {
                              setOpenModal(false);
                              handlePris();
                            }}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
                          >
                            Add Prescription
                            <span className="ml-2">
                              <FontAwesomeIcon
                                icon={faPrescriptionBottleMedical}
                              />
                            </span>
                          </button>
                          <br />
                          <button
                            onClick={() => {
                              setOpenModal(false);
                              handleReport();
                            }}
                            className="bg-green-500 text-white font-bold py-2 px-4 rounded w-full"
                          >
                            Add Medical Report
                            <span className="ml-2">
                              <FontAwesomeIcon icon={faNotesMedical} />
                            </span>
                          </button>
                          <br />
                        </React.Fragment>
                      )}
                      {currDate === appDate &&
                      currentTime >= appoStart &&
                      appoStatus === "Pending" ? (
                        <button
                          className="bg-yellow-300 text-white font-bold py-2 px-4 rounded w-full"
                          onClick={markAsDone}
                        >
                          Mark As Done
                          <span className="ml-2">
                            <FontAwesomeIcon icon={faCheck} />
                          </span>
                        </button>
                      ) : null}
                    </div>
                  )}
                </Modal.Body>

                <Modal.Footer>
                  {appoStatus === "Cancelled" ||
                  appoStatus === "CancelledByDoctor" ? null : btn ? (
                    <div className="flex justify-center">
                      <Button
                        color="green"
                        className="w-49 border-green-400 hover:bg-green-200"
                        onClick={() => handleNavigate()}
                      >
                        Chat with patient
                      </Button>
                    </div>
                  ) : (
                    <div className="flex justify-center">
                      <Button
                        className="w-35 border-green-400 hover:bg-green-200"
                        color="green"
                        onClick={() => {
                          setOpenModalx(true);
                          setOpenModal(false);
                        }}
                      >
                        Connect patient
                      </Button>
                    </div>
                  )}
                  {appoStatus === "Cancelled" ||
                  appoStatus === "Done" ||
                  appoStatus === "CancelledByDoctor" ? null : (
                    <>
                      <Button
                        className="w-25 border-yellow-300 hover:bg-yellow-100"
                        color="yellow"
                        onClick={() => setOpenModalR(true)}
                      >
                        Reschedule
                      </Button>
                      <Button
                        onClick={handleCancel}
                        color="red"
                        className="w-35 border-red-500 hover:bg-red-100"
                      >
                        Cancel appointment
                      </Button>
                    </>
                  )}
                </Modal.Footer>
              </Modal>

              <Modal
                className="w-[500px] mx-auto mt-28"
                show={openModalx}
                onClose={() => setOpenModalx(false)}
              >
                <Modal.Header>Connect Patient</Modal.Header>
                <Modal.Body>
                  <div className="space-y-6">
                    <div className="flex justify-center">
                      <div className="relative group cursor-pointer group overflow-hidden  text-gray-50 h-72 w-56  rounded-2xl hover:duration-700 duration-700">
                        <div className="w-56 h-72 bg-emerald-400 text-gray-800">
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
                            With patiant.
                          </span>
                          <p className="text-white">
                            Click I accept to connect with patient
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    className="text-green-500 border-2 border-green-500"
                    onClick={() => {
                      setOpenModalx(false);
                      handleAccept();
                    }}
                  >
                    I accept
                  </Button>

                  <Button
                    className="text-red-500 border-2 border-red-500"
                    onClick={() => setOpenModalx(false)}
                  >
                    Decline
                  </Button>
                </Modal.Footer>
              </Modal>

              <Modal
                className="w-96 mx-auto mt-32"
                show={openModalR}
                onClose={() => setOpenModalR(false)}
              >
                <Modal.Header>Reschedule</Modal.Header>
                <Modal.Body>
                  <form
                    method="dialog"
                    onSubmit={handleSubmit}
                    className="modal-form"
                  >
                    <div className="form-group text-black">
                      <label htmlFor="date">New Date:</label>
                      <input
                        className="w-full bg-gray-300"
                        type="date"
                        id="date"
                        name="date"
                        value={values.date}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.date && touched.date && (
                        <p className="text-red-600">{errors.date}</p>
                      )}
                    </div>

                    <div className="form-group text-black">
                      <label htmlFor="startTime">Start Time:</label>
                      <input
                        className="w-full bg-gray-300"
                        type="time"
                        id="startTime"
                        name="startTime"
                        value={values.startTime}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.startTime && touched.startTime && (
                        <p className="text-red-600">{errors.startTime}</p>
                      )}
                    </div>

                    <div className="form-group text-black">
                      <label htmlFor="endTime">End Time:</label>
                      <input
                        className="w-full bg-gray-300"
                        type="time"
                        id="endTime"
                        name="endTime"
                        value={values.endTime}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.endTime && touched.endTime && (
                        <p className="text-red-600">{errors.endTime}</p>
                      )}
                    </div>
                    <br />
                    <Button className="bg-green-400" type="submit">
                      Submit
                    </Button>
                  </form>
                </Modal.Body>
              </Modal>
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AppointmentsDoctor;
