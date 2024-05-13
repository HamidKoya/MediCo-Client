import React, { useState, useEffect } from "react";
import Header from "@/components/admin/Header";
import Sidebar from "@/components/admin/Sidebar";
import Footer from "@/components/admin/Footer";
import Loading from "@/components/user/Loading";
import axios from "axios";
import { Link } from "react-router-dom";

function Appointments() {
  const [loading, setLoading] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [pagination, setPagination] = useState({});

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `http://localhost:3000/admin/appointmentList?page=${currentPage}&limit=${itemsPerPage}`
      )
      .then((response) => {
        setAppointments(response?.data?.data);
        setPagination(response?.data?.pagination);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error.message);
      });
  }, [currentPage, itemsPerPage]);

  return (
    <div>
      <Header />
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
                            Payment id
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
                              {app.consultationDate}
                            </td>
                            <td className="px-4 py-2 border border-gray-300 text-center">
                              {app.createdAt}
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
                              more
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
      </div>

      
      <Footer />
    </div>
  );
}

export default Appointments;
