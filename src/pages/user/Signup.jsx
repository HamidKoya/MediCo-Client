import React, {  useState } from "react";
import Header2 from "../../components/user/Header2";
import Footer from "../../components/user/Footer";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { userSchema } from "../../validations/user/signupValidation";
import Swal from "sweetalert2";
import Loading from "../../components/user/Loading";

function Signup() {
  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState(null);
  const navigate = useNavigate();
  async function onSubmit() {
    try {
      setLoading(true);
      const res = await axios.post("https://medico-server-b7s5.onrender.com/userSignup", {
        ...values,photo
      });
      setLoading(false);
      const { userData, otpId } = res?.data;
      if (res?.data?.status) {
        const Toast = Swal.mixin({
          toast: true,
          position: "top",
          showCancelButton: false,
          timer: 5000,
        });

        Toast.fire({
          icon: "info",
          title: "Enter the OTP",
        });
        navigate("/userotp", {
          state: { userId: userData?._id, otpId: otpId },
        });
      } else {
        const Toast = Swal.mixin({
          toast: true,
          position: "top",
          showCancelButton: false,
          timer: 5000,
        });
        Toast.fire({
          icon: "error",
          title: "Error",
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  const handlePhotoChange = (e) => {
    const selectedPhoto = e.target.files[0];
    setPhotoToBase(selectedPhoto);
  };

  const setPhotoToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPhoto(reader.result);
    };
  };
  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        name: "",
        email: "",
        mobile: "",
        password: "",
        confirmPassword: "",
      },
      validationSchema: userSchema,
      onSubmit,
    });

  return (
    <>
      <Header2 />
      {loading ? (
        <Loading/>
      ) : (
        <div className="flex min-h-full h-full flex-col justify-center px-6 py-12 lg:px-8 bg-[url('/user-signup-background.jpg')] bg-cover">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-1 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Register Now
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm shadow-2xl rounded-2xl px-8 py-4 h-full">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Name
                </label>
                <div className="mt-2">
                  <input
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    className="block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-transparent"
                  />
                </div>
                <div>
                  {errors.name && touched.name && (
                    <p className="text-red-600">{errors.name}</p>
                  )}
                </div>
              </div>
              <div>
                <label
                  htmlFor="Number"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Number
                </label>
                <div className="mt-2">
                  <input
                    value={values.mobile}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="mobile"
                    type="text"
                    required
                    className="block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-transparent"
                  />
                </div>
                <div>
                  {errors.mobile && touched.mobile && (
                    <p className="text-red-600">{errors.mobile}</p>
                  )}
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-transparent"
                  />
                </div>
                <div>
                  {errors.email && touched.email && (
                    <p className="text-red-600">{errors.email}</p>
                  )}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                  {/* <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div> */}
                </div>
                <div className="mt-2">
                  <input
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="bg-transparent block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div>
                  {errors.password && touched.password && (
                    <p className="text-red-600">{errors.password}</p>
                  )}
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="confirm-password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Confirm Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="confirmPassword"
                    type="password"
                    required
                    className="bg-transparent block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div>
                  {errors.confirmPassword && touched.confirmPassword && (
                    <p className="text-red-600">{errors.confirmPassword}</p>
                  )}
                </div>
              </div>
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  htmlFor="file_input"
                >
                  Upload your Photo
                </label>
                <input
                  className="block w-full text-sm  text-gray-900 border border-gray-300 rounded-lg cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  id="file_input"
                  type="file"
                  required
                  accept="image/*"
                  onChange={handlePhotoChange}
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  SIGNUP
                </button>
              </div>
            </form>
            <div className="mt-5">
              <span className="text-gray-400">Already have an account?</span>{" "}
              <Link to={'/login'}>
                <span>Login</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

export default Signup;
