import Header from "../components/Header";

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
    </>
  );
}

export default Home;
