import { useSelector } from 'react-redux';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu"
import {LogOut,User} from 'lucide-react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { signOut } from '@/redux/slices/doctorSlice';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import api from '@/utils/api';

function ProfileIcon() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { currentDoctor } = useSelector((state) => state.doctor)
  const handleLogout = async () =>{
    try {
      const res = await api.get('/doctor/logout');
      if(res.status===200){
        const Toast = Swal.mixin({
          toast: true,
          position: 'top',
          showConfirmButton: false,
          timer: 3000,
        });
        Toast.fire({
          icon: 'info',
          title: 'Logged out successfully'
        });
        dispatch(signOut())
        navigate("/doctor")
      }

    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <div className="relative">
      <DropdownMenu>
        <DropdownMenuTrigger>
        <img
        className="w-12 h-12 rounded-full cursor-pointer border-2 ring-2 ring-black"
        src={currentDoctor.doctorData.photo}
        alt="User dropdown"
      />
        </DropdownMenuTrigger>
        < DropdownMenuContent>
        <p>{currentDoctor.doctorData.name}</p>
              <DropdownMenuSeparator/>
          <DropdownMenuItem>
            <DropdownMenuLabel>
              
             <Link to={"/doctor/profile"}><p className='flex'><User className="mr-2 h-4 w-4"/>Profile</p></Link>
              
                
            </DropdownMenuLabel>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <DropdownMenuLabel>
            <p onClick={handleLogout} className='flex'><LogOut className="mr-2 h-4 w-4"/>Log out</p>
            </DropdownMenuLabel>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
    </div>
  );
}

export default ProfileIcon;
