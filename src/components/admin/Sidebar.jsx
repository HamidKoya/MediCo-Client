import { RxDashboard } from "react-icons/rx";
import { FaNotesMedical } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { MdVerified } from "react-icons/md";
import { MdDomainAdd } from "react-icons/md";
import { NavLink } from "react-router-dom";

function Sidebar() {
  const sidebarItems = [
    {
      label: "DASHBOARD",
      link: "/admin/dashboard",
      icon: <RxDashboard className="size-5" />,
    },
    {
      label: "Appointments",
      link: "/admin/appointments",
      icon: <FaNotesMedical className="size-5" />,
    },
    {
      label: "USERS",
      link: "/admin/users",
      icon: <FaUsers className="size-5" />,
    },
    {
      label: "DOCTORS",
      link: "/admin/doctors",
      icon: <FaUserDoctor className="size-5" />,
    },
    {
      label: "VERIFY DOCTORS",
      link: "/admin/verifydoctors",
      icon: <MdVerified className="size-5" />,
    },
    {
      label: "SPECIALTIES",
      link: "/admin/specialties",
      icon: <MdDomainAdd className="size-5" />,
    },
  ];
  return (
    <div className="bg-gray-800 text-white min-h-screen w-16 sm:w-72 border-r-[1px] border-white">
      <ul className="flex flex-col pt-4">
        {sidebarItems.map((item, index) => (
          <li key={index}>
            <NavLink
              className={({ isActive }) =>
                `p-4 md:justify-start  flex justify-center sm:text-sm sm:font-semibold ${
                  isActive ? "bg-slate-500" : "hover:bg-slate-700"
                }`
              }
              to={item.link}
            >
              {({ isActive }) => (
                <>
                  {item.icon}

                  <span
                    className={`hidden sm:inline ml-4 ${
                      isActive ? "font-bold" : "font-normal"
                    }`}
                  >
                    {item.label}
                  </span>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
