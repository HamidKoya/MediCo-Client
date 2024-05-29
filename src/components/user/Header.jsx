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
  { to: "/doctors", icon: "Doctors", image: <FaUserDoctor /> },
  { to: "/appointments", icon: "Appointments", image: <FaCheckToSlot /> },
];
function Header() {
  const { currentUser } = useSelector((state) => state.user);
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
            {currentUser ? (
              <div className="flex items-center gap-4">
                <div className="hidden sm:flex gap-4">
                  <Link to={"/chatuser"}>
                    <svg
                      width="23"
                      height="23"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.5 3L2.5 3.00002C1.67157 3.00002 1 3.6716 1 4.50002V9.50003C1 10.3285 1.67157 11 2.5 11H7.50003C7.63264 11 7.75982 11.0527 7.85358 11.1465L10 13.2929V11.5C10 11.2239 10.2239 11 10.5 11H12.5C13.3284 11 14 10.3285 14 9.50003V4.5C14 3.67157 13.3284 3 12.5 3ZM2.49999 2.00002L12.5 2C13.8807 2 15 3.11929 15 4.5V9.50003C15 10.8807 13.8807 12 12.5 12H11V14.5C11 14.7022 10.8782 14.8845 10.6913 14.9619C10.5045 15.0393 10.2894 14.9965 10.1464 14.8536L7.29292 12H2.5C1.11929 12 0 10.8807 0 9.50003V4.50002C0 3.11931 1.11928 2.00003 2.49999 2.00002Z"
                        fill="currentColor"
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </Link>
                  <Link to={'/notifications'}>
                    <svg
                      width="23"
                      height="23"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.60124 1.25086C8.60124 1.75459 8.26278 2.17927 7.80087 2.30989C10.1459 2.4647 12 4.41582 12 6.79999V10.25C12 11.0563 12.0329 11.7074 12.7236 12.0528C12.931 12.1565 13.0399 12.3892 12.9866 12.6149C12.9333 12.8406 12.7319 13 12.5 13H8.16144C8.36904 13.1832 8.49997 13.4513 8.49997 13.75C8.49997 14.3023 8.05226 14.75 7.49997 14.75C6.94769 14.75 6.49997 14.3023 6.49997 13.75C6.49997 13.4513 6.63091 13.1832 6.83851 13H2.49999C2.2681 13 2.06664 12.8406 2.01336 12.6149C1.96009 12.3892 2.06897 12.1565 2.27638 12.0528C2.96708 11.7074 2.99999 11.0563 2.99999 10.25V6.79999C2.99999 4.41537 4.85481 2.46396 7.20042 2.3098C6.73867 2.17908 6.40036 1.75448 6.40036 1.25086C6.40036 0.643104 6.89304 0.150421 7.5008 0.150421C8.10855 0.150421 8.60124 0.643104 8.60124 1.25086ZM7.49999 3.29999C5.56699 3.29999 3.99999 4.86699 3.99999 6.79999V10.25L4.00002 10.3009C4.0005 10.7463 4.00121 11.4084 3.69929 12H11.3007C10.9988 11.4084 10.9995 10.7463 11 10.3009L11 10.25V6.79999C11 4.86699 9.43299 3.29999 7.49999 3.29999Z"
                        fill="currentColor"
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </Link>
                </div>

                <ProfileIcon />
              </div>
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
      <HeaderItem to={"/"} icon={"Home"} image={<AiOutlineHome />} />
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
