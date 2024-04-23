import { Link } from "react-router-dom";
import HeaderItem from "./HeaderItem";
import { useEffect, useState } from "react";
import { MdMenu } from "react-icons/md";
import { useSelector } from "react-redux";
import ProfileIcon from "@/components/user/ProfileIcon";
import { FaUserDoctor } from "react-icons/fa6";
import { FaCheckToSlot } from "react-icons/fa6";
import { AiOutlineHome } from "react-icons/ai";


const navItems = [
  { to: "/doctors", icon: "Doctors", image:<FaUserDoctor/> },
  { to: "/appointments", icon: "Appointments", image:<FaCheckToSlot/> },
];
function Header() {
  const {currentUser} = useSelector((state)=>state.user)
  const [isLoggedIn] = useState(true);
  const [openMenu, setOpenMenu] = useState(false);
  const [fixed, setFixed] = useState(false);
  const handleScroll = () => {
    setFixed(() => {
      if (window.scrollY > 64) {
        return true;
      }
      return false;
    });
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div
      className={` z-40 ${fixed ? "sticky top-0 bg-white" : "relative h-0"}`}
    >
      <div className="container mx-auto max-w-[1280px]">
        <div className="flex justify-between items-center py-1">
          <div className="md:hidden relative ml-3">
            <button onClick={() => setOpenMenu((prev) => !prev)} className="">
              <MdMenu className="size-7"/>
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
            {currentUser ? (
              <ProfileIcon/>
            ) : (
              <HeaderItem to={"/login"} icon={"Login"} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function renderMenuItems(isLoggedIn) {
  return (
    <>
      <HeaderItem to={"/"} icon={"Home"} image={<AiOutlineHome/>} />
      {isLoggedIn &&
        navItems.map((item) => (
          <HeaderItem to={item.to} icon={item.icon} key={item.to} image={item.image}/>
        ))}
    </>
  );
}

export default Header;
