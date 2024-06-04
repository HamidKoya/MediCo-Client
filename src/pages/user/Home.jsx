import Footer from "../../components/user/Footer";
import Header from "../../components/user/Header";
import Specialties from "../../components/user/Specialties";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <Header />
      <div className="relative min-h-[600px] flex items-center">
        <img
          src="/cover.jpg"
          alt=""
          className="absolute left-0 top-0 size-full object-cover"
        />
        <div className="max-w-[1280px] px-4 md:px-0 mx-auto w-full flex">
          <div className="basis-1/2 relative">
            <h1 className="relative text-base md:text-lg lg:text-2xl xl:text-5xl font-bold">
              Consult top doctors online for any health concern
            </h1>
            <p className="font-semibold text-sm  mt-3">
              Private online consultations with verified doctors in all
              specialists
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-4 bg-[#EBF5FF]">
        <div className="bg-white mt-5 p-10 m-4 rounded-2xl sm:w-[700px] shadow-2xl">
          <div className="mt-2 text-2xl">
            <p className="font-medium">How Doctor Consultation Work ?</p>
          </div>
          <div className="mt-2 text-xl font-normal space-y-2">
            <p>1.Select the specialty</p>
            <p>2.Choose the doctor</p>
            <p>3.Book a slot</p>
            <p>4.Make payment</p>
            <p>5.Be present on MediCo at the time of the consultation.</p>
          </div>
          <div className="flex justify-center mt-4">
            <button class=" hover:before:bg-[#59c8da] relative h-[50px] w-40 overflow-hidden border border-[#59c8da] bg-white px-3 text-black shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:transition-all before:duration-500 hover:text-white hover:shadow-[#59c8da] hover:before:left-0 hover:before:w-full">
              <span class="relative z-10">Book Now</span>
            </button>
          </div>
        </div>
      </div>

      {/* features */}
      <div className="bg-blue-50 py-2 sm:py-3 md:py-3 lg:py-3 xl:py-3">
        <div className="mx-4 flex flex-wrap justify-center">
          <div className="flex flex-col space-y-8 sm:space-y-0 sm:flex-row sm:space-x-8 overflow-x-auto">
            {/* Certified Doctors */}
            <div className="w-full sm:w-96 h-64 duration-500 group overflow-hidden relative rounded-2xl bg-neutral-800 text-neutral-50 p-4 flex flex-col justify-evenly">
              <div className="absolute blur duration-500 group-hover:blur-none w-72 h-72 rounded-full group-hover:translate-x-12 group-hover:translate-y-12 bg-sky-900 right-1 -bottom-24"></div>
              <div className="absolute blur duration-500 group-hover:blur-none w-12 h-12 rounded-full group-hover:translate-x-12 group-hover:translate-y-2 bg-indigo-700 right-12 bottom-12"></div>
              <div className="absolute blur duration-500 group-hover:blur-none w-36 h-36 rounded-full group-hover:translate-x-12 group-hover:-translate-y-12 bg-indigo-800 right-1 -top-12"></div>
              <div className="absolute blur duration-500 group-hover:blur-none w-24 h-24 bg-sky-700 rounded-full group-hover:-translate-x-12"></div>
              <div className="z-10 flex flex-col justify-evenly w-full h-full">
                <span className="text-2xl font-bold">Certified Doctors</span>
                <p>
                  We offer quality healthcare through our network of certified
                  and experienced doctors.
                </p>
                <div className="flex justify-center">
                  <img className="w-24 h-24" src="certified.svg" alt="" />
                </div>
              </div>
            </div>

            {/* 100% Confidential */}
            <div className="w-full sm:w-96 h-64 duration-500 group rounded-2xl overflow-hidden relative bg-neutral-800 text-neutral-50 p-4 flex flex-col justify-evenly">
              <div className="absolute blur duration-500 group-hover:blur-none w-72 h-72 rounded-full group-hover:translate-x-12 group-hover:translate-y-12 bg-sky-900 right-1 -bottom-24"></div>
              <div className="absolute blur duration-500 group-hover:blur-none w-12 h-12 rounded-full group-hover:translate-x-12 group-hover:translate-y-2 bg-indigo-700 right-12 bottom-12"></div>
              <div className="absolute blur duration-500 group-hover:blur-none w-36 h-36 rounded-full group-hover:translate-x-12 group-hover:-translate-y-12 bg-indigo-800 right-1 -top-12"></div>
              <div className="absolute blur duration-500 group-hover:blur-none w-24 h-24 bg-sky-700 rounded-full group-hover:-translate-x-12"></div>
              <div className="z-10 flex flex-col justify-evenly w-full h-full">
                <span className="text-2xl font-bold">100% Confidential</span>
                <p>
                  All advice & consultations are completely confidential. You
                  can also delete chats whenever you want.
                </p>
                <div className="flex justify-center">
                  <img className="w-24 h-24" src="confidential.svg" alt="" />
                </div>
              </div>
            </div>

            {/* Convenience */}
            <div className="w-full sm:w-96 h-64 duration-500 group overflow-hidden relative rounded-2xl bg-neutral-800 text-neutral-50 p-4 flex flex-col justify-evenly">
              <div className="absolute blur duration-500 group-hover:blur-none w-72 h-72 rounded-full group-hover:translate-x-12 group-hover:translate-y-12 bg-sky-900 right-1 -bottom-24"></div>
              <div className="absolute blur duration-500 group-hover:blur-none w-12 h-12 rounded-full group-hover:translate-x-12 group-hover:translate-y-2 bg-indigo-700 right-12 bottom-12"></div>
              <div className="absolute blur duration-500 group-hover:blur-none w-36 h-36 rounded-full group-hover:translate-x-12 group-hover:-translate-y-12 bg-indigo-800 right-1 -top-12"></div>
              <div className="absolute blur duration-500 group-hover:blur-none w-24 h-24 bg-sky-700 rounded-full group-hover:-translate-x-12"></div>
              <div className="z-10 flex flex-col justify-evenly w-full h-full">
                <span className="text-2xl font-bold">Convenience</span>
                <p>
                  Forget the hassle of long queues and rush hour. Seek expert
                  opinion anytime, anywhere.
                </p>
                <div className="flex justify-center">
                  <img className="w-24 h-24" src="convenience.svg" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Specialties />
      <div className="flex flex-col bg-[#EBF5FF] items-center p-4 sm:mx-0 ">
        <div className="bg-[#58A399] p-10 rounded-3xl">
          <div className="flex justify-center mb-2">
            <p className="text-white text-2xl font-bold antialiased">
              Are you a Doctor?
            </p>
          </div>
          <div className="flex justify-center mb-2">
            <p className="text-white font-medium text-lg">
              Join our panel of specialists and connect with your patients from
              anywhere.
            </p>
          </div>
          <Link to={"/doctor/home"}>
          <div className="flex justify-center mb-2">
            <button className="bg-slate-200 w-32 p-1 rounded  hover:translate-x-px hover:bg-green-100">JOIN</button>
          </div>
          </Link>
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default Home;
