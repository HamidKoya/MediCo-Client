import { useSelector } from 'react-redux';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


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
          <DropdownMenuItem>
            <DropdownMenuLabel>
                Dashboardghvdfuvgbyusdehgiuyhsr iguhhuis
            </DropdownMenuLabel>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <DropdownMenuLabel>
                Dashboard
            </DropdownMenuLabel>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
    </div>
  );
}

export default ProfileIcon;
