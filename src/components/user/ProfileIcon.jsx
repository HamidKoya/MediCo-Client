import { useSelector } from "react-redux";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { LogOut, User, Bell, MessageSquare } from "lucide-react";
import { useDispatch } from "react-redux";
import { signOut } from "@/redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import api from "@/utils/api";

function ProfileIcon() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const handleLogout = async () => {
    try {
      const res = await api.get("/logout");
      if (res.status === 200) {
        const Toast = Swal.mixin({
          toast: true,
          position: "top",
          showConfirmButton: false,
          timer: 3000,
        });
        Toast.fire({
          icon: "info",
          title: "Logged out successfully",
        });
        dispatch(signOut());
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="relative">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <img
            className="w-12 h-12 rounded-full cursor-pointer border-2 ring-2 ring-black object-cover"
            src={currentUser?.userData?.photo}
            alt="User dropdown"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <p>{currentUser?.userData?.name}</p>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <DropdownMenuLabel asChild>
              <Link to={"/profile"}>
                <p className="flex">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </p>
              </Link>
            </DropdownMenuLabel>
          </DropdownMenuItem>
          <Link to={"/chatuser"}>
            <DropdownMenuItem className={"sm:hidden"}>
              <DropdownMenuLabel>
                <p className="flex">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Messages
                </p>
              </DropdownMenuLabel>
            </DropdownMenuItem>
          </Link>
          <Link to={'/notifications'}>
            <DropdownMenuItem className={"sm:hidden"}>
              <DropdownMenuLabel>
                <p className="flex">
                  <Bell className="mr-2 h-4 w-4" />
                  Notifications
                </p>
              </DropdownMenuLabel>
            </DropdownMenuItem>
          </Link>

          <DropdownMenuItem onSelect={handleLogout}>
            <DropdownMenuLabel>
              <p className="flex">
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </p>
            </DropdownMenuLabel>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default ProfileIcon;
