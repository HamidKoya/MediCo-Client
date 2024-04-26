import React, { useState, useEffect } from "react";
import axios from "axios";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import Loading from "../../components/user/Loading";
import { Link, useNavigate } from "react-router-dom";
import { doctorSchema } from "@/validations/doctor/signupValidation";

function SignupDoctor() {
  const navigate = useNavigate();
  const [photo, setPhoto] = useState(null);
  const [certificates, setCertificates] = useState([]);
  const [speciality, setSpeciality] = useState();
  const [loading, setLoading] = useState(false);
  const onSubmit = async () => {
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:3000/doctor/signup", {
        ...values,
        photo,
        certificates,
      });
      setLoading(false);

      const { doctorData, otpId } = response?.data;
      if (response?.data?.status) {
        const Toast = Swal.mixin({
          toast: true,
          position: "top",
          showConfirmButton: false,
          timer: 5000,
        });

        Toast.fire({
          icon: "info",
          title: "Enter the OTP",
        });
        navigate("/doctor/otp", {
          state: { doctorId: doctorData._id, otpId: otpId },
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handlePhotoChange = (e) => {
    const selectedPhoto = e.target.files[0];
    setPhotoToBase(selectedPhoto);
  };

  const setPhotoToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPhoto(reader.result);
    };
  };

  const handleCertificatesChange = (e) => {
    const selectedCertificates = e.target.files;
    setCertificatesToBase(selectedCertificates);
  };

  const setCertificatesToBase = async (files) => {
    const certificatesArray = [];

    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.readAsDataURL(files[i]);
      reader.onloadend = () => {
        certificatesArray.push(reader.result);
        setCertificates([...certificatesArray]);
      };
    }
  };

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

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        name: "",
        email: "",
        speciality: "",
        mobile: "",
        password: "",
        confirmPassword: "",
      },
      validationSchema: doctorSchema,
      onSubmit,
    });

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="flex min-h-screen h-full flex-col justify-center px-6 py-12 lg:px-8 bg-[url('/doctor.jpg')] bg-cover bg-center">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-white">
              Signup Now
            </h2>
          </div>

          <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm shadow-2xl backdrop-blur-lg rounded-2xl px-8 py-4 h-auto">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-white"
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
                    className=" text-white block w-full rounded-md border-1 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-transparent"
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
                  className="block text-sm font-medium leading-6 text-white"
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
                    className="block w-full rounded-md border-1 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-transparent"
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
                  className="block text-sm font-medium leading-6 text-white"
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
                    className="block w-full rounded-md border-1 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-transparent"
                  />
                </div>
                <div>
                  {errors.email && touched.email && (
                    <p className="text-red-600">{errors.email}</p>
                  )}
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Speciality
                </label>
                <div className="mt-2">
                  <select
                    name="speciality"
                    value={values.speciality}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="block w-full rounded-md border-1 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-transparent"
                  >
                    <option className="text-black" value="" disabled selected>
                      Select a speciality
                    </option>
                    {speciality &&
                      speciality.map((speciality) => (
                        <option
                          key={speciality.id}
                          className="text-black"
                          value={speciality.speciality}
                        >
                          {speciality.speciality}
                        </option>
                      ))}
                  </select>
                  {errors.speciality && touched.speciality && (
                    <p className="text-red-600">{errors.speciality}</p>
                  )}
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
                    className="block text-sm font-medium leading-6 text-white"
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
                    className="bg-transparent block w-full rounded-md border-1 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                    className="block text-sm font-medium leading-6 text-white"
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
                    className="bg-transparent block w-full rounded-md border-1 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                  className="block mb-2 text-sm font-medium text-white dark:text-white"
                  htmlFor="file_input"
                >
                  Upload your Photo
                </label>
                <input
                  className="block w-full text-sm  text-white border border-gray-300 rounded-lg cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  id="file_input"
                  type="file"
                  required
                  accept="image/*"
                  onChange={handlePhotoChange}
                />
              </div>
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-white dark:text-white"
                  htmlFor="file_input"
                >
                  Upload your Certificates
                </label>
                <input
                  className="block w-full text-sm  text-white border border-gray-300 rounded-lg cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  id="file_input"
                  type="file"
                  required
                  multiple
                  onChange={handleCertificatesChange}
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
              <span className="text-white">Already have an account?</span>{" "}
              <Link to={"/doctor/login"}>
                <span className="text-blue-700">Login</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SignupDoctor;
