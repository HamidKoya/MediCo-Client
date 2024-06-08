import React from "react";
import Header2 from "@/components/user/Header2";
import Footer from "@/components/user/Footer";
import { useEffect, useState } from "react";
import Loading from "@/components/user/Loading";
import { useSelector } from "react-redux";
import axios from "axios";
import { Toaster,toast } from "sonner";

function Notifications() {
  const { currentUser } = useSelector((state) => state.user);
  const id = currentUser.userData._id;
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  useEffect(() => {
    fetchNotifications();
  }, [id, currentPage]);

  const fetchNotifications = () => {
    setLoading(true);
    axios
      .get(
        `https://medico-server-b7s5.onrender.com/getNotifications?id=${id}&page=${currentPage}`,{withCredentials: true}
      )
      .then((res) => {
        setNotifications(res?.data?.notifications);
        setTotalPages(res?.data?.totalPages);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        toast.info(error.response.data.message)
        console.log(error.message);
      });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <div>
      <Toaster position="top-center" expand={false} richColors/>
      <Header2 />
      <div className="bg-gray-100 min-h-screen p-4">
        <div className="text-center m-10">
          {/* <h1 className='text-2xl font-bold text-gray-800'>Notifications</h1> */}
        </div>
        <div className="flex justify-center">
          <div className="w-full lg:w-3/4 xl:w-2/3 bg-white shadow-lg rounded-lg p-6">
            {loading && <Loading />}
            {!loading && notifications.length === 0 && (
              <p className="text-gray-600 text-center">
                No notifications available.
              </p>
            )}
            {!loading && notifications.length > 0 && (
              <div className="overflow-x-auto">
                <table className="table-auto ] w-full ">
                  <thead>
                    <tr className="bg-blue-500 text-white">
                      <th className="p-2">Notification</th>
                    </tr>
                  </thead>
                  <tbody>
                    {notifications.map((notification, index) => (
                      <tr
                        key={index}
                        className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                      >
                        <td className="p-2 text-black">{notification.text}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {!loading && notifications.length > 0 && (
              <div className="flex justify-center mt-4">
                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1
                ).map((page) => (
                  <button
                    key={page}
                    className={`mx-2 px-3 py-1 border ${
                      currentPage === page
                        ? "bg-blue-500 text-white"
                        : "hover:bg-gray-200"
                    }`}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Notifications;
