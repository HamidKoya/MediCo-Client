import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate,useParams } from "react-router-dom";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import Loading from "../components/Loading";
import "animate.css";
import * as yup from "yup";

function ResetPassword() {
    const {id,token} = useParams()
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const formSchema = yup.object().shape({
    password: yup.string(),
    cpassword: yup.string().oneOf([yup.ref("password"),null],"password must match").required("Required")
  });
  const onSubmit = async () => {
    console.log('hello world');
    try {
      setLoading(true);
      const res = await axios.patch(`http://localhost:3000/resetPassword?id=${id}&token=${token}&password=${values.password}`);
      setLoading(false);
      if (res.status === 200) {
        console.log('test 3');
        Swal.fire({
          title: res?.data?.message,
          showClass: {
            popup: `
                    animate__animated
                    animate__fadeInUp
                    animate__faster
                  `,
          },
          hideClass: {
            popup: `
              animate__animated
              animate__fadeOutDown
              animate__faster
            `,
          },
        });
        navigate("/login")
      }else{
        Swal.fire({
            title: res?.data?.message,
            showClass: {
              popup: `
                      animate__animated
                      animate__fadeInUp
                      animate__faster
                    `,
            },
            hideClass: {
              popup: `
                animate__animated
                animate__fadeOutDown
                animate__faster
              `,
            },
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        password: "",
        cpassword:"",
      },
      validationSchema: formSchema,
      onSubmit,
    });
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="flex min-h-screen h-full flex-col justify-center px-6 py-12 lg:px-8 bg-[url('/user-signup-background.jpg')] bg-cover">
          <div className="mt-10 mb-10 sm:mx-auto sm:w-[450px] shadow-2xl rounded-2xl px-8 py-10 h-full">
            <h1 className="flex justify-center mb-3 text-xl font-semibold">
             Reset Password
            </h1>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  New Password
                </label>
                <div className="mt-2">
                  <input
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="new password"
                    name="password"
                    type="password"
                    autoComplete="email"
                    className="block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-transparent"
                  />
                </div>
                <div>
                  {errors.password && touched.password && (
                    <p className="text-red-600">{errors.password}</p>
                  )}
                </div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Confirm Password
                </label>
                <div className="mt-2">
                  <input
                    value={values.cpassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Confirm Password"
                    name="cpassword"
                    type="password"
                    autoComplete="email"
                    className="block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-transparent"
                  />
                </div>
                <div>
                  {errors.cpassword && touched.cpassword && (
                    <p className="text-red-600">{errors.cpassword}</p>
                  )}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  RESET PASSWORD
                </button>
              </div>
            </form>
            <div className="mt-5">
              <Link to={"/login"}>
                <span className="text-gray-400">Remember your password?</span>{" "}
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ResetPassword;
