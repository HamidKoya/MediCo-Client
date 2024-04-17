import React, { useState } from "react";
import Header2 from "../../components/user/Header2";
import Footer from "../../components/user/Footer";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { loginSchema } from "@/validations/user/loginValidation";
import Swal from "sweetalert2";
import Loading from "../../components/user/Loading";
import { useSelector,useDispatch } from "react-redux";
import { signInSuccess } from "@/redux/slices/userSlice";

function Login() {
  const {error} = useSelector((state)=>state.user)
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const onSubmit = async (values) => {
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:3000/userLogin',{...values})
      setLoading(false);
      if(response?.status===200){
        dispatch(signInSuccess(response.data))
        const Toast = Swal.mixin({
          toast:true,
          position:'top',
          showConfirmButton:false,
          timer:3000
        })
        Toast.fire({
          icon:'success',
          title:'logged in successfully'
        })
        navigate('/')
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: loginSchema,
      onSubmit,
    });

  return (
    <>
      <Header2 />
      {loading ? (
        <Loading />
      ) : (
        <div className="flex min-h-full h-full flex-col justify-center px-6 py-12 lg:px-8 bg-[url('/user-signup-background.jpg')] bg-cover">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-1 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Login Now
            </h2>
          </div>

          <div className="mt-10 mb-10 sm:mx-auto sm:w-[450px] shadow-2xl rounded-2xl px-8 py-10 h-full">
            <form className="space-y-6" onSubmit={handleSubmit}>
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
                <div className="text-sm mt-4">
                  <Link to={'/forgotpassword'}>
                  <a
                    
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                  </Link>
                  
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Login
                </button>
              </div>
            </form>
            <div className="mt-5">
              <span className="text-gray-400">Not a user?</span>{" "}
              <Link to={"/signup"}>
                <span>Sign Up</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

export default Login;
