import React from "react";
import Header from "@/components/admin/Header";
import Sidebar from "@/components/admin/Sidebar";
import Footer from "@/components/admin/Footer";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "@/components/user/Loading";
import { Link } from "react-router-dom";
import api from "@/utils/api";
import { Toaster,toast } from "sonner";

function Doctors() {
  const [loading, setLoading] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [pagination, setPagination] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    api
      .get(
        `/admin/doctorList?page=${currentPage}&limit=${itemsPerPage}`
      )
      .then((response) => {
        setDoctors(response?.data?.doctors);
        setPagination(response?.data?.pagination);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        toast.info(error.response.data.message)
        console.log(error.message);
      });
  }, [currentPage, itemsPerPage]);

  const handleClick = async (id) => {
    try {
      navigate(`/admin/doctordetails/${id}`);
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
        <div className="w-[84vw] sm:w-full bg-slate-900 text-white p-6">
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
                    <a>DOCTORS</a>
                  </li>
                </ul>
              </div>
              <div>
                {doctors.length === 0 ? (
                  <div className="flex justify-center text-2xl text-yellow-200">
                    <p>User not found</p>
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
                            Name
                          </th>
                          <th className="w-3/12 px-4 py-2 border border-gray-300">
                            Email
                          </th>
                          <th className="w-2/12 px-4 py-2 border border-gray-300">
                            Mobile
                          </th>
                          <th className="w-1/12 px-4 py-2 border border-gray-300">
                            Speciality
                          </th>
                          <th className="w-1/12 px-4 py-2 border border-gray-300">
                            Listed
                          </th>
                          <th className="w-3/12 px-4 py-2 border border-gray-300">
                            More
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {doctors.map((doctor, index) => (
                          <tr key={index} className="hover">
                            <td className="px-4 py-2 border border-gray-300 text-center">
                              {index + 1}
                            </td>
                            <td className="px-4 py-2 border border-gray-300 text-center">
                              {doctor.name}
                            </td>
                            <td className="px-4 py-2 border border-gray-300 text-center">
                              {doctor.email}
                            </td>
                            <td className="px-4 py-2 border border-gray-300 text-center">
                              {doctor.mobile}
                            </td>
                            <td className="px-4 py-2 border border-gray-300 text-center">
                              {doctor.speciality}
                            </td>
                            <td className="px-4 py-2 border border-gray-300 text-center">
                              {doctor.admin_verify ? "Yes" : "No"}
                            </td>
                            <td className="px-4 py-2 border border-gray-300 text-center">
                              <button
                                onClick={() => handleClick(doctor._id)}
                                type="button"
                                className="text-white text-sm px-2 py-1 rounded bg-blue-500 hover:bg-blue-600 active:scale-90"
                              >
                                More Info
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
          {pagination && pagination.totalPages && doctors.length > 0 && (
            <div className="flex justify-center mt-4 ">
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

export default Doctors;
