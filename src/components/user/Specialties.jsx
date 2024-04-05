import { IoIosArrowDropright, IoIosArrowDropleft } from "react-icons/io";
function Specialties() {
  return (
    <div className="bg-[#EBF5FF] p-8 sm:p-20">
      <div className="flex justify-center">
        <h1 className="text-xl sm:text-3xl font-bold underline mb-5">
          Specialists
        </h1>
      </div>
      <div className="flex justify-center">
      <div className="items-center flex">
          <IoIosArrowDropleft sm:size={30} size={25} style={{ color: '#949494' }}/>
        </div>
        <div className="flex gap-10 bg-white p-7 md:h-[200px] md:w-11/12 sm:gap-14 rounded-xl overflow-x-scroll scroll-smooth scrollbar-hide">
          {[...Array(10)].map((_, index) => (
            <div
              key={index}
              className="flex-none text-center w-3/12 md:mx-12 md:w-1/12"
            >
              <img className="w-full sm:w-40" src="/heart.png" alt="" />
              <p className="font-semibold font-mono text-lg text-[10px] sm:text-[18px]">
                rokham
              </p>
            </div>
          ))}
        </div>
        <div className="items-center flex">
          <IoIosArrowDropright sm:size={30} size={25} style={{ color: '#949494' }}/>
        </div>
      </div>
    </div>
  );
}

export default Specialties;
