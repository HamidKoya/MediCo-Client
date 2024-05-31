import React from "react";
import { LogOut } from "lucide-react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import api from "@/utils/api";
import { signOut } from "@/redux/slices/adminSlice";
import { useDispatch } from "react-redux";

function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleLogout = async () => {
    try {
      const res = await api.get(`/admin/logout`);
      if (res.status === 200) {
        const Toast = Swal.mixin({
          toast: true,
          position: "top",
          showConfirmButton: false,
          timer: 3000,
        });
        Toast.fire({
          icon: "success",
          title: "Logged out successfully",
        });
        dispatch(signOut());
        navigate("/admin/login");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="w-full  bg-cyan-900 border-b-[1px] border-white">
      <div className="flex items-center justify-between p-1">
        <div className="flex items-center text-white sm:ml-10">
          <button className="flex items-center  hover:hover:bg-black/5 rounded-lg active:scale-95 p-2">
            <img src="/logo.png" alt="" className="sm:w-9 w-6 sm:h-9 h-6" />
            <h1 className="text-xl font-semibold ml-2">MediCo</h1>
          </button>
        </div>
        <div>
          <h1 className="text-white font-bold text-2xl">ADMIN</h1>
        </div>
        <div className="sm:mr-10">
          <button
            onClick={handleLogout}
            className="flex gap-2 text-white font-semibold  hover:hover:bg-black/5 rounded-lg active:scale-95 p-3"
          >
            Logout <LogOut />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
