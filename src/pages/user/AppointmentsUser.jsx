import React from "react";
import Header from "@/components/user/Header2";
import Footer from "@/components/user/Footer";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "@/components/user/Loading";

function AppointmentsUser() {
  const { currentUser } = useSelector((state) => state.user);
  const userId = currentUser.userData._id;
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [render, setRender] = useState(false);
  const [appo, setAppo] = useState([]);
  const [pagination, setPagination] = useState({});
  const [currentDate, setCurrentDate] = useState();
  const [currentTime, setCurrentTime] = useState();
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
                          <td class="px-6 py-4 text-blue-500 font-semibold cursor-pointer">
                            More
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AppointmentsUser;
