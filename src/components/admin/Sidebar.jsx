import { useState } from "react";
import { RxDashboard } from "react-icons/rx";
import { FaNotesMedical } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { MdVerified } from "react-icons/md";
import { MdDomainAdd } from "react-icons/md";
import { Link } from "react-router-dom";


function Sidebar() {
    
    const [selectedItem, setSelectedItem] = useState(null);

    const handleItemClick = (index) => {
      setSelectedItem(index);
    };
  return (
    <div className="bg-gray-800 text-white min-h-screen w-16 sm:w-72 border-r-[1px] border-white">
      
        <ul className="flex flex-col pt-4">
          <Link to={'/admin/dashboard'}>

          <li
            className={`sm:p-4  sm:flex sm:text-sm sm:font-semibold ${
              selectedItem === 0 ? "bg-slate-500" : "hover:bg-slate-700"
            }`}
            onClick={() => handleItemClick(0)}
          >
            <RxDashboard className="size-5 ml-2 mr-3" /> DASHBOARD
          </li>
          </Link>

          <Link to={'/admin/appointments'}>

          <li
            className={`sm:p-4  sm:flex sm:text-sm sm:font-semibold ${
              selectedItem === 1 ? "bg-slate-500" : "hover:bg-slate-700"
            }`}
            onClick={() => handleItemClick(1)}
          >
            <FaNotesMedical className="size-5 ml-2 mr-3" /> APPOINTMENTS
          </li>
          </Link>
          <Link to={'/admin/users'}>
          <li
            className={`sm:p-4  sm:flex sm:text-sm sm:font-semibold ${
              selectedItem === 2 ? "bg-slate-500" : "hover:bg-slate-700"
            }`}
            onClick={() => handleItemClick(2)}
          >
            <FaUsers className="size-5 ml-2 mr-3" /> USERS
          </li>
          </Link>
          <Link to={'/admin/doctors'}>
          <li
            className={`sm:p-4  sm:flex sm:text-sm sm:font-semibold ${
              selectedItem === 3 ? "bg-slate-500" : "hover:bg-slate-700"
            }`}
            onClick={() => handleItemClick(3)}
          >
            <FaUserDoctor className="size-5 ml-2 mr-3" /> DOCTORS
          </li>
          </Link>
          <Link to={'/admin/verifydoctors'}>
          <li
            className={`p-4   flex text-sm font-semibold ${
              selectedItem === 4 ? "bg-slate-500" : "hover:bg-slate-700"
            }`}
            onClick={() => handleItemClick(4)}
          >
            <MdVerified className="size-5 ml-2 mr-3" /> VERIFY DOCTORS
          </li>
          </Link>
          <Link to={'/admin/specialties'}>

          <li
            className={`sm:p-4  sm:flex sm:text-sm sm:font-semibold ${
              selectedItem === 5 ? "bg-slate-500" : "hover:bg-slate-700"
            }`}
            onClick={() => handleItemClick(5)}
          >
            <MdDomainAdd className="size-5 ml-2 mr-3" /> SPECIALTIES
          </li>
          </Link>
        </ul>
      </div>
  )
}

export default Sidebar
