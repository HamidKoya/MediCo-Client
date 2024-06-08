import React from "react";
import Header from "@/components/admin/Header";
import Sidebar from "@/components/admin/Sidebar";
import Footer from "@/components/admin/Footer";
import Loading from "@/components/user/Loading";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import api from "@/utils/api";
import { Toaster, toast } from "sonner";

function Specialties() {
  const [loading, setLoading] = useState(false);
  const [speciality, setSpeciality] = useState("");
  const [edit, setEdit] = useState("");
  const [photo, setPhoto] = useState(null);
  const [slist, setSlist] = useState([]);
  const [rerender, setRerender] = useState(false);
  const [data, setData] = useState(null);
  const [pagination, setPagination] = useState({});
  const [search, setSearch] = useState();
  const [filteredSpeciality, setFilteredSpeciality] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [token, setToken] = useState(false);
  const limit = 5;

  useEffect(() => {
    api
      .get("/admin/tokenChecker")
      .then((res) => {
        if (res) {
          setToken(true);
        }
      })
      .catch((err) => {
        toast.info(err.response.data.message);
      });
  }, []);

  const handleClick = async () => {
    try {
      console.log("hello world");
      setLoading(true);
      const response = await axios.post(
        "https://medico-server-b7s5.onrender.com/admin/addSpeciality",
        { speciality, photo }
      );
      console.log(response);
      setLoading(false);

      if (response) {
        if (rerender) {
          setRerender(false);
        } else {
          setRerender(true);
        }
        const Toast = Swal.mixin({
          toast: true,
          position: "top",
          showConfirmButton: false,
          timer: 3000,
        });

        Toast.fire({
          icon: "success",
          title: response.data.message,
        });
      }
    } catch (error) {
      console.log(error.response.data.message);
      const Toast = Swal.mixin({
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 3000,
      });

      Toast.fire({
        icon: "warning",
        title: error.response.data.message,
      });
      setLoading(false);
    }
  };
  const handlePhoto = (e) => {
    const selectedPhoto = e.target.files[0];
    setPhotoToBase(selectedPhoto);
  };

  const setPhotoToBase = (img) => {
    const reader = new FileReader();
    reader.readAsDataURL(img);
    reader.onloadend = () => {
      setPhoto(reader.result);
    };
  };

  const handleModal = (speciality) => {
    try {
      setData(speciality);
      setEdit(speciality.speciality);
      document.getElementById("my_modal");
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (id) => {
    try {
      const response = await axios.patch(
        "https://medico-server-b7s5.onrender.com/admin/editSpeciality",
        { id, edit, photo }
      );
      if (response) {
        const Toast = Swal.mixin({
          toast: true,
          position: "top",
          showConfirmButton: false,
          timer: 3000,
        });
        setRerender(!rerender);
        Toast.fire({
          icon: "success",
          title: response?.data?.message,
        });
      }
    } catch (error) {
      console.log(error.message);
      const Toast = Swal.mixin({
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 3000,
      });
      setRerender(!rerender);
      Toast.fire({
        icon: "error",
        title: error.response.data.message,
      });
    }
  };

  const handleList = async (id) => {
    try {
      const response = await axios.patch(
        `https://medico-server-b7s5.onrender.com/admin/listUnlist?id=${id}`
      );
      const Toast = Swal.mixin({
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 3000,
      });
      setRerender(!rerender);
      Toast.fire({
        icon: "success",
        title: response?.data?.message,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://medico-server-b7s5.onrender.com/admin/specialityList?currentPage=${currentPage}&limit=${limit}&search=${search}`
      )
      .then((response) => {
        setSlist(response?.data?.data);
        setPagination(response?.data?.pagination);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
        setLoading(false);
      });
  }, [rerender, currentPage, limit, search]);

  useEffect(() => {
    if (data) {
      document.getElementById("my_modal").showModal();
    }
  }, [data]);

  const handleChange = (e) => {
    try {
      setSearch(e.target.value);
      setCurrentPage(1);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const filtered = slist.filter((speciality) =>
      speciality.speciality.toLowerCase().includes(search?.toLowerCase() || "")
    );
    setFilteredSpeciality(filtered);
  }, [search, slist]);

  return (
    <div>
      <Header />
      <Toaster position="top-center" expand={false} richColors closeButton />
      <div className="flex">
        <Sidebar />

        <div className="w-[84vw] sm:w-full bg-slate-900 text-white p-6">
          {token && (
            <>
              {loading ? (
                <Loading />
              ) : (
                <>
                  <div className="flex justify-end">
                    <button
                      className="bg-green-400 text-sm p-3 rounded-md hover:bg-green-200 hover:text-black active:scale-90"
                      onClick={() =>
                        document.getElementById("my_modal_1").showModal()
                      }
                    >
                      ADD SPECIALITY
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full table-auto mt-4 ">
                      <thead>
                        <tr>
                          <th>No</th>
                          <th>Speciality</th>
                          <th>Image</th>
                          <th>Listed/Not</th>
                          <th>Manage</th>
                          <th>List/Unlist</th>
                        </tr>
                      </thead>
                      <tbody className="mt-5">
                        {filteredSpeciality &&
                          filteredSpeciality.map((specialityItem, index) => (
                            <tr key={specialityItem._id}>
                              <th className="text-center">{index + 1}</th>
                              <td className="text-center ">
                                {specialityItem.speciality}
                              </td>
                              <td>
                                <img
                                  className="max-w-32 max-h-32 m-auto p-3"
                                  src={specialityItem.photo}
                                  alt={specialityItem.speciality}
                                />
                              </td>
                              <td className="text-center">
                                {specialityItem.list ? "Yes" : "No"}
                              </td>
                              <td className="text-center">
                                <button
                                  className="p-2 w-20 bg-blue-500 rounded-md hover:bg-blue-400 active:scale-90"
                                  onClick={() => handleModal(specialityItem)}
                                >
                                  Edit
                                </button>
                              </td>
                              <td className="text-center">
                                {specialityItem.list ? (
                                  <button
                                    onClick={() =>
                                      handleList(specialityItem._id)
                                    }
                                    className="p-2 w-20 bg-red-500 rounded-md hover:bg-red-400 active:scale-90"
                                  >
                                    Unlist
                                  </button>
                                ) : (
                                  <button
                                    onClick={() =>
                                      handleList(specialityItem._id)
                                    }
                                    className="p-2 w-20 bg-green-500 rounded-md hover:bg-green-400 active:scale-90"
                                  >
                                    List
                                  </button>
                                )}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                  {pagination && pagination.totalPages && (
                    <div className="flex justify-center mt-4 bg-base-100">
                      {Array.from(
                        { length: pagination.totalPages },
                        (_, index) => (
                          <button
                            key={index + 1}
                            onClick={() => setCurrentPage(index + 1)}
                            className={`pagination-btn border w-10 ${
                              index + 1 === currentPage
                                ? "border-green-500"
                                : "border-black"
                            }`}
                          >
                            {index + 1}
                          </button>
                        )
                      )}
                    </div>
                  )}
                  <dialog
                    id="my_modal_1"
                    className="modal bg-slate-800 rounded-md p-6 w-96"
                  >
                    <div className="modal-box">
                      <h3 className="font-bold text-lg text-white">
                        Add Speciality
                      </h3>
                      <br />

                      <form method="dialog">
                        <input
                          onChange={(e) => setSpeciality(e.target.value)}
                          value={speciality}
                          type="text"
                          placeholder="Type here"
                          className="input input-bordered input-primary w-full rounded-md"
                        />

                        <br />
                        <br />

                        <input
                          accept="image/*"
                          onChange={handlePhoto}
                          type="file"
                          className="file-input file-input-bordered file-input-primary w-full border-2 border-blue-500 rounded-md"
                        />

                        <br />
                        <br />
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-white">
                          ✕
                        </button>
                        <button
                          onClick={handleClick}
                          className="btn w-full btn-success bg-green-400 p-2 rounded-md active:scale-90 hover:bg-green-300"
                        >
                          ADD
                        </button>

                        <br />
                        <br />
                        {loading && <Loading />}
                      </form>
                    </div>
                  </dialog>

                  {data && (
                    <dialog
                      id="my_modal"
                      className="modal bg-slate-800 rounded-md p-6 w-96"
                    >
                      <div className="modal-box">
                        <h1 className="text-white">Edit Speciality</h1>
                        <form method="dialog">
                          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-white">
                            ✕
                          </button>
                          <br />

                          <input
                            onChange={(e) => setEdit(e.target.value)}
                            value={edit}
                            type="text"
                            placeholder="Type here"
                            className="input input-bordered input-primary w-full border-2 border-blue-500 rounded-md"
                          />

                          <br />
                          <br />

                          <input
                            accept="image/*"
                            onChange={handlePhoto}
                            type="file"
                            className="file-input file-input-bordered file-input-primary w-full border-2 border-blue-500 rounded-md"
                          />

                          <br />
                          <br />

                          <button
                            onClick={() => handleEdit(data._id)}
                            className="btn btn-warning w-full  bg-green-400 p-2 rounded-md active:scale-90 hover:bg-green-300"
                          >
                            Done
                          </button>

                          <br />
                          <br />
                        </form>
                      </div>
                    </dialog>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Specialties;
