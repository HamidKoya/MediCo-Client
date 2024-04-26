import { Link } from "react-router-dom";
import HeaderItem from "./HeaderItem";
import { useState } from "react";
import { MdMenu } from "react-icons/md";
import { useSelector } from "react-redux";
import ProfileIcon from "./ProfileIcon";

import { GrLineChart } from "react-icons/gr";
import { FaUser } from "react-icons/fa";
import { FaCheckToSlot } from "react-icons/fa6";
import { MdNoteAlt } from "react-icons/md";
import { IoIosStar } from "react-icons/io";

const navItems = [
  { to: "/doctor/profile", icon: "Profile", image: <FaUser /> },
  { to: "/doctor/slots", icon: "Slots", image: <FaCheckToSlot /> },
  { to: "/doctor/appointments", icon: "Appointments", image: <MdNoteAlt /> },
  { to: "/doctor/reviews", icon: "Reviews", image: <IoIosStar /> },
];
function Header() {
  const { currentDoctor } = useSelector((state) => state.doctor);
  const [isLoggedIn] = useState(true);
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <div className="sticky top-0 z-50">
      <div className="bg-white">
        <div className="container mx-auto max-w-[1280px]">
          <div className="flex justify-between items-center py-1">
            <div className="md:hidden relative ml-3">
              <button onClick={() => setOpenMenu((prev) => !prev)} className="">
                <MdMenu className="size-7" />
              </button>
              {openMenu && (
                <div className="p-2 rounded-md flex flex-col bg-white absolute top-[100%]">
                  {renderMenuItems(isLoggedIn)}
                </div>
              )}
            </div>
            <Link
              to="/"
              className="logo flex items-center gap-1 hover:bg-black/5 -m-2 p-2 rounded-lg active:scale-95 text-2xl"
            >
              <img className="block w-10 h-10" src="/logo.png" alt="" />
              <h1 className="font-semibold">MediCo</h1>
            </Link>
            <div className="parts hidden md:flex gap-5">
              {renderMenuItems(isLoggedIn)}
            </div>
            <div>
              {currentDoctor ? (
                <ProfileIcon />
              ) : (
                <HeaderItem to={"/login"} icon={"Login"} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function renderMenuItems(isLoggedIn) {
  return (
    <>
      <HeaderItem to={"/doctor/dashboard"} icon={"Dashboard"} image={<GrLineChart />} />
      {isLoggedIn &&
        navItems.map((item) => (
          <HeaderItem
            to={item.to}
            icon={item.icon}
            key={item.to}
            image={item.image}
          />
        ))}
    </>
  );
}

export default Header;
