import React from "react";
import Header2 from "@/components/user/Header2";
import Footer from "@/components/user/Footer";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loading from "@/components/user/Loading";
import axios from "axios";

function DoctorsList() {
  const [doctors, setDoctors] = useState([]);
  const [speciality, setSpeciality] = useState([]);
  const [select, setSelect] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState();
  const [sort, setSort] = useState();
  const noOfDoctors = 4;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `http://localhost:3000/doctorList?select=${select}&search=${searchQuery}&page=${currentPage}&count=${noOfDoctors}&sort=${sort}`
      )
      .then((response) => {
        setLoading(false);
        setDoctors(response?.data?.doctors);
        setTotalCount(response?.data?.totalCount);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }, [select, searchQuery, currentPage, sort]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/doctor/specialtyName")
      .then((response) => {
        setSpeciality(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);
  const handleSelectChange = (e) => {
    setSelect(e.target.value);
    setCurrentPage(1);
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };
  const totalPages = Math.ceil(totalCount / noOfDoctors);

  return (
    <div>
      <Header2 />
      <div className="bg-[#EBF5FF] h-full">
        <div className="flex justify-center gap-2 overflow-auto">
          <div>
            {speciality && (
              <select
                onChange={handleSelectChange}
                className="mt-4 rounded-2xl"
                name="speciality"
                id=""
              >
                <option value="">Select a Speciality</option>
                {speciality.map((speciality, index) => (
                  <option value={speciality.id} key={index}>
                    {speciality.speciality}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div>
            <select
              onChange={handleSortChange}
              className="mt-4 rounded-2xl"
              name="sort"
              id=""
            >
              <option value="">Sort by</option>
              <option value="experience">experience</option>
            </select>
          </div>
          <div>
            <input
              onChange={handleSearchChange}
              placeholder="Search..."
              className="mt-4 rounded-2xl"
              type="search"
              value={searchQuery}
            />
          </div>
        </div>
        {loading ? (
          <Loading />
        ) : (
          <div className="max-w-screen-xl mx-auto p-4 mt-5">
            {doctors.length === 0 ? (
              <div className="flex justify-center text-2xl text-blue-500 px">
                <p> No doctors available</p>
              </div>
            ) : (
              <div></div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ">
              {doctors.length === 0 ? (
                <div></div>
              ) : (
                doctors.map((doctor) => (
                  <Link to={`/doctordetails/${doctor._id}`} key={doctor._id}>
                    <div className="bg-white shadow-lg border h-96 rounded-lg overflow-hidden transition-transform transform hover:scale-105">
                      <div className="p-4 text-gray-900">
                        <img
                          src={doctor.photo}
                          alt={doctor.name}
                          className="w-24 h-24 rounded-full mb-4 mx-auto object-cover"
                        />
                        <h3 className="text-lg font-semibold text-center mb-2">
                          Dr. {doctor.name}
                        </h3>
                      </div>
                      <div className="border-t p-4 text-black">
                        <p className="mb-2">Price: ₹299</p>
                        <p className="mb-2">Speciality: {doctor.speciality}</p>
                        <p className="mb-2">
                          Experience:{" "}
                          {doctor.experience ? doctor.experience : "Not added"}
                        </p>
                        <p className="mb-2">Language: English, Malayalam</p>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>
            {/* Pagination */}
            <div className="flex justify-center mt-4 bg-blue-50">
              {Array.from({ length: totalPages }, (_, index) => (
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
          </div>
        )}
      </div>

      <Footer/>
    </div>
  );
}

export default DoctorsList;
