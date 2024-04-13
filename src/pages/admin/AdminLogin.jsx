import React from "react";
import { useFormik } from "formik";
import { adminSchema } from "@/validations/admin/adminValidation";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

function AdminLogin() {
  const navigate = useNavigate();
  const onSubmit = async () => {
    try {
        const response = await axios.post("http://localhost:3000/admin/login",values)
      const Toast = Swal.mixin({
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 3000,
      });

      Toast.fire({
        icon: "success",
        title: "Logged in successfully",
      });

      navigate("/admin/dashboard");
    } catch (error) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 3000,
      });

      Toast.fire({
        icon: "error",
        title: "Invalid username or password",
      });
      console.log(error.message);
    }
  };
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        username: "",
        password: "",
      },
      validationSchema: adminSchema,
      onSubmit,
    });
  return (
    <div className="w-screen h-screen bg-slate-800 flex justify-center items-center">
      <div className="mx-10 rounded-xl shadow-2xl p-10 w-96 h-96 bg-[#212e51]">
        <form onSubmit={onSubmit}>
          <h1 className="flex justify-center text-gray-300 text-2xl font-bold">
            Admin Login
          </h1>
          <div className="flex justify-center mt-5">
            <div className="flex flex-col">
              <label htmlFor="" className="text-white">
                Username
              </label>
              <input
                type="text"
                name="username"
                placeholder="username"
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
                className="bg-transparent border-purple-400 border-2 focus:border-purple-800  focus:shadow-none focus:outline-none focus:ring-0 rounded-sm text-white w-72"
              />
              {errors.username && touched.username && <p className='text-red-600'>{errors.username}</p>}
            </div>
          </div>
          <div className="flex justify-center mt-5">
            <div className="flex flex-col">
              <label htmlFor="" className="text-white">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className="bg-transparent border-purple-400 border-2 focus:border-purple-800  focus:shadow-none focus:outline-none focus:ring-0 rounded-sm text-white w-72"
              />
              {errors.password && touched.password && <p className='text-red-600'>{errors.password}</p>}
            </div>
          </div>
          <div className="flex justify-center mt-5">
            <button
              type="submit"
              className="bg-purple-800 hover:bg-purple-400 w-40 p-3 rounded-md text-white"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
