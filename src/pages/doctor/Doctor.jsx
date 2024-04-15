import React from "react";

function Doctor() {
  return (
    <div className='w-screen h-screen bg-cover bg-center bg-[url("/doctor.jpg")]'>
      <div className="flex flex-col  justify-center items-center h-screen">
        <h1 className="text-white font-bold text-5xl">Hello Doctor</h1>
        <p className="max-w-md text-center mt-4 text-white">
          {" "}
          Welcome, doctors! Your dedication to healthcare is commendable. Join
          our community to connect with peers, access resources, and enhance
          your medical journey. Already a member? Log in or sign up to make a
          positive impact on people's lives.
        </p>
        <button class="mt-4  relative flex w-32 h-10 rounded-3xl items-center justify-center overflow-hidden bg-teal-300 font-medium text-white shadow-2xl transition-all duration-300 before:absolute before:inset-0 before:border-0 before:border-white before:duration-100 before:ease-linear hover:bg-white hover:text-black hover:shadow-blue-600 hover:before:border-[25px]">
          <span class="relative z-10">Login</span>
        </button>
        <button class="mt-2 relative flex w-32 h-10 rounded-3xl items-center justify-center overflow-hidden bg-teal-300 font-medium text-white shadow-2xl transition-all duration-300 before:absolute before:inset-0 before:border-0 before:border-white before:duration-100 before:ease-linear hover:bg-white hover:text-black hover:shadow-blue-600 hover:before:border-[25px]">
          <span class="relative z-10">Signup</span>
        </button>
        <button class="mt-2 relative flex w-32 h-10 rounded-3xl items-center justify-center overflow-hidden bg-teal-300 font-medium text-white shadow-2xl transition-all duration-300 before:absolute before:inset-0 before:border-0 before:border-white before:duration-100 before:ease-linear hover:bg-white hover:text-black hover:shadow-blue-600 hover:before:border-[25px]">
          <span class="relative z-10">Home</span>
        </button>
      </div>
    </div>
  );
}

export default Doctor;
