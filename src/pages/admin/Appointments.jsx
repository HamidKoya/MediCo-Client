import React, { useState, useEffect } from "react";
import Header from "@/components/admin/Header";
import Sidebar from "@/components/admin/Sidebar";
import Footer from "@/components/admin/Footer";
import Loading from "@/components/user/Loading";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, Modal } from "flowbite-react";
import api from "@/utils/api";
import { Toaster,toast } from "sonner";

function Appointments() {
  const [loading, setLoading] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [pagination, setPagination] = useState({});
  const [data, setData] = useState({});
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    setLoading(true);
    api
      .get(
        `/admin/appointmentList?page=${currentPage}&limit=${itemsPerPage}`
      )
      .then((response) => {
        setAppointments(response?.data?.data);
        setPagination(response?.data?.pagination);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        toast.info(error.response.data.message)
        console.log(error.message);
      });
  }, [currentPage, itemsPerPage]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = `${padZero(date.getDate())}/${padZero(
      date.getMonth() + 1
    )}/${date.getFullYear()}`;
    return formattedDate;
  };

  const padZero = (value) => {
    return value < 10 ? `0${value}` : value;
  };

  const handleClick = async (appoId) => {
    try {
      setOpenModal(true)
      const res = await axios.post("http://localhost:3000/admin/appData", {
        appoId,
      });
      setData(res?.data?.data[0]);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <Header />
      <Toaster position="top-center" expand={false} richColors closeButton/>
      <div className="flex">
        <Sidebar />
        <div className="w-[84vw] sm:w-full  bg-slate-900 text-white p-6">
          {loading ? (
            <Loading />
          ) : (
            <>
              <div className="text-sm breadcrumbs">
                <ul className="flex">
                  <li>
                    <Link to={"/admin/dashboard"}>
                      <a>DASHBOARD &gt;</a>
                    </Link>
                  </li>
                  <li className="ml-1">
                    <a> APPOINTMENTS</a>
                  </li>
                </ul>
              </div>
              <div>
                {appointments.length === 0 ? (
                  <div className="flex justify-center text-2xl text-yellow-200">
                    <p>Appointments not found</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto mt-4">
                    <table className="w-full table-auto border-collapse border border-gray-300">
                      <thead>
                        <tr>
                          <th className="w-1/12 px-4 py-2 border border-gray-300">
                            No
                          </th>
                          <th className="w-3/12 px-4 py-2 border border-gray-300">
                            Consultation Date
                          </th>
                          <th className="w-3/12 px-4 py-2 border border-gray-300">
                            Booked Date
                          </th>
                          <th className="w-2/12 px-4 py-2 border border-gray-300">
                            Start Time
                          </th>
                          <th className="w-3/12 px-4 py-2 border border-gray-300">
                            End Time
                          </th>
                          <th className="w-3/12 px-4 py-2 border border-gray-300">
                            Status
                          </th>
                          <th className="w-3/12 px-4 py-2 border border-gray-300">
                            Appointment Id
                          </th>
                          <th className="w-3/12 px-4 py-2 border border-gray-300">
                            Payment id
                          </th>
                          <th className="w-3/12 px-4 py-2 border border-gray-300">
                            More
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {appointments.map((app, index) => (
                          <tr key={index} className="hover">
                            <td className="px-4 py-2 border border-gray-300 text-center">
                              {index + 1}
                            </td>
                            <td className="px-4 py-2 border border-gray-300 text-center">
                              {formatDate(app.consultationDate)}
                            </td>
                            <td className="px-4 py-2 border border-gray-300 text-center">
                              {formatDate(app.createdAt)}
                            </td>
                            <td className="px-4 py-2 border border-gray-300 text-center">
                              {app.start}
                            </td>
                            <td className="px-4 py-2 border border-gray-300 text-center">
                              {app.end}
                            </td>
                            <td
                              className={`$ ${
                                app.status === "Pending"
                                  ? "text-yellow-200 px-4 py-2 border border-gray-300 text-center"
                                  : app.status === "Done"
                                  ? "text-green-500 px-4 py-2 border border-gray-300 text-center"
                                  : app.status === "Cancelled"
                                  ? "text-red-500 px-4 py-2 border border-gray-300 text-center"
                                  : ""
                              }`}
                            >
                              {app.status}
                            </td>
                            <td className="px-4 py-2 border border-gray-300 text-center">
                              {app._id}
                            </td>
                            <td className="px-4 py-2 border border-gray-300 text-center">
                              {app.paymentId}
                            </td>
                            <td className="px-4 py-2 border border-gray-300 text-center">
                              <button
                                onClick={() => handleClick(app._id)}
                                className="bg-green-400 p-1 rounded-md"
                              >
                                More
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </>
          )}
          {pagination && pagination.totalPages && appointments.length > 0 && (
            <div className="flex justify-center mt-4">
              {Array.from({ length: pagination.totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`pagination-btn border w-10 ${
                    index + 1 === currentPage
                      ? "border-green-400"
                      : "border-black"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          )}
        </div>

        <Modal
          show={openModal}
          onClose={() => setOpenModal(false)}
          className="max-w-[500px] max-h-[500px] mx-auto my-auto rounded-md"
        >
          <Modal.Header className="p-4 bg-slate-500">Doctor and Patient</Modal.Header>
          <Modal.Body className="p-7 bg-slate-400 text-white">
            <div className="flex justify-center flex-col gap-5">
              <label htmlFor="">Doctor</label>
              <input className="rounded-lg text-black" type="text" readOnly value={data.doctorName} />
              <label htmlFor="">Patient</label>
              <input className="rounded-lg text-black" type="text" readOnly value={data.userName} />  
            </div>
          </Modal.Body>
        </Modal>
      </div>

      <Footer />
    </div>
  );
}

export default Appointments;
