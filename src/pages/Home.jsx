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
    </>
  );
}

export default Home;
