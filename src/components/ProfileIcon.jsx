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

function ProfileIcon() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="relative">
      <DropdownMenu>
        <DropdownMenuTrigger>
        <img
        className="w-12 h-12 rounded-full cursor-pointer border-2"
        src={currentUser.userData.photo}
        alt="User dropdown"
      />
        </DropdownMenuTrigger>
        < DropdownMenuContent>
        <p>{currentUser.userData.name}</p>
              <DropdownMenuSeparator/>
          <DropdownMenuItem>
            <DropdownMenuLabel>
              
              <p className='flex'><User className="mr-2 h-4 w-4"/>Profile</p>
                
            </DropdownMenuLabel>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <DropdownMenuLabel>
            <p className='flex'><LogOut className="mr-2 h-4 w-4"/>Log out</p>
            </DropdownMenuLabel>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
    </div>
  );
}

export default ProfileIcon;
