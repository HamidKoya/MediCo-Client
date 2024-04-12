import React, { useState, useEffect } from "react";
import Header from "@/components/admin/Header";
import Sidebar from "@/components/admin/Sidebar";
import Footer from "@/components/admin/Footer";
import Loading from "@/components/user/Loading";
import axios from "axios";

function UsersList() {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [userData, setUserData] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [pagination, setPagination] = useState({});

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `http://localhost:3000/admin/usersList?page=${currentPage}&limit=${itemsPerPage}`
      )
      .then((response) => {
        setUsers(response?.data?.users);
        setPagination(response?.data?.pagination);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error.message);
      });
  }, [currentPage, itemsPerPage]);

  const handleClick = async (id) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/admin/userDetails",
        { id }
      );
      const data = response?.data?.details;
      setUserData(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const blockUnblock = async (id) => {
    try {
      await axios.post("http://localhost:3000/admin/blockUnblock", { id });
      const res = await axios.post("http://localhost:3000/admin/userDetails", {
        id,
      });
      setUserData(res?.data?.details);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <Header />
      <div className="flex">
        <Sidebar />
        <div className="w-full bg-slate-900 text-white p-6">
          {loading ? (
            <Loading />
          ) : (
            <>
              <div className="text-sm breadcrumbs">
                <ul className="flex">
                  <li>
                    <a href="/">DASHBOARD &gt;</a>
                  </li>
                  <li className="ml-1">
                    <a> USER LIST</a>
                  </li>
                </ul>
              </div>
              <div>
                {users.length === 0 ? (
                  <div className="flex justify-center text-2xl text-yellow-200">
                    <p>User not found</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto mt-4">
                    <table className="w-full table-auto border-collapse border border-gray-300">
  <thead>
    <tr>
      <th className="w-1/12 px-4 py-2 border border-gray-300 text-left">Index</th>
      <th className="w-3/12 px-4 py-2 border border-gray-300">Name</th>
      <th className="w-3/12 px-4 py-2 border border-gray-300">Email</th>
      <th className="w-2/12 px-4 py-2 border border-gray-300">Mobile</th>
      <th className="w-3/12 px-4 py-2 border border-gray-300">Actions</th>
    </tr>
  </thead>
  <tbody>
    {users.map((user, index) => (
      <tr key={index} className="hover">
        <td className="px-4 py-2 border border-gray-300 text-center">{index + 1}</td>
        <td className="px-4 py-2 border border-gray-300">{user.name}</td>
        <td className="px-4 py-2 border border-gray-300">{user.email}</td>
        <td className="px-4 py-2 border border-gray-300">{user.mobile}</td>
        <td className="px-4 py-2 border border-gray-300">
          <button
            type="button"
            onClick={() => {
              document.getElementById("my_modal_3").showModal();
              handleClick(user._id);
            }}
            className="text-white px-2 py-1 rounded bg-blue-500 hover:bg-blue-600"
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
          {pagination && pagination.totalPages && users.length > 0 && (
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

      <dialog id="my_modal_3" className="modal rounded-2xl">
        <div className="modal-box rounded-none">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
            <div className="card-body flex flex-col justify-center items-center p-3 bg-slate-600">
              {userData ? (
                <>
                  <div className="w-40 h-40 ">
                    <img src={userData.photo} alt="" />
                  </div>
                  <h2 className="card-title text-3xl font-bold mt-3 mb-3">
                    {userData.name}
                  </h2>
                  <p className="text-gray-300">Id : {userData._id}</p>
                  <p className="text-gray-300">Email : {userData.email}</p>
                  <p className="text-gray-300">Mobile : {userData.mobile}</p>
                  <p className="text-gray-300">
                    OTP Verified : {userData.otp_verified ? "Yes" : "No"}
                  </p>
                  <p className="text-gray-300">
                    Blocked : {userData.is_blocked ? "Yes" : "No"}
                  </p>
                  <p className="text-gray-300">
                    Age : {userData.age || "Not Added"}
                  </p>
                  <p className="text-gray-300">
                    Gender : {userData.gender || "Not Added"}
                  </p>

                  <div className="card-actions mx-[147px]">
                    <button
                      className="btn text-white p-1 rounded-md mt-3 "
                      onClick={() => blockUnblock(userData._id)}
                      style={{
                        backgroundColor: userData.is_blocked ? "green" : "red",
                      }}
                    >
                      {userData.is_blocked ? "UNBLOCK" : "BLOCK"}
                    </button>
                  </div>
                  <br />
                </>
              ) : (
                <p>Loading user data...</p>
              )}
            </div>
          </form>
        </div>
      </dialog>
      <Footer />
    </div>
  );
}

export default UsersList;
