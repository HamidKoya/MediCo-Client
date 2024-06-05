import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Toaster, toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useDispatch } from "react-redux";
import { signInSuccess } from "@/redux/slices/userSlice";

function EditProfile() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState({
    ...currentUser.userData,
    gender: currentUser.userData.gender || "", // Set gender field to an empty string if it doesn't exist
  });
  const [errors, setErrors] = useState({});

  const handleChanges = async () => {
    if (validateForm()) {
      setOpen(false);
      try {
        const res = await axios.post('http://localhost:3000/editProfile', editData);
        if (res.status === 200) {
          toast.success('Successfully updated profile');
          dispatch(signInSuccess(res.data));
        }
      } catch (error) {
        console.log(error.message);
      }
    } else {
      toast.error('Please fix the errors before submitting');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData({
      ...editData,
      [name]: value,
    });
    validateField(name, value);
  };

  const handleGenderChange = (value) => {
    setEditData({
      ...editData,
      gender: value,
    });
  };

  const validateField = (name, value) => {
    let error = '';
    if (name === 'name') {
      if (!value) {
        error = 'Name is required';
      } else if (value.length < 4) {
        error = 'Name must be at least 4 characters long';
      }
    } else if (name === 'mobile') {
      const mobileRegex = /^[1-9]\d{9}$/;
      if (!value) {
        error = 'Mobile number is required';
      } else if (!mobileRegex.test(value)) {
        error = 'Mobile number must be 10 digits and not start with 0';
      }
    } else if (name === 'age') {
      const ageValue = parseInt(value, 10);
      if (!value) {
        error = 'Age is required';
      } else if (isNaN(ageValue) || ageValue < 1 || ageValue > 100) {
        error = 'Age must be between 1 and 100';
      }
    }
    setErrors({
      ...errors,
      [name]: error,
    });
  };

  const validateForm = () => {
    const formErrors = {};
    Object.keys(editData).forEach((key) => {
      validateField(key, editData[key]);
      if (errors[key]) {
        formErrors[key] = errors[key];
      }
    });
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  return (
    <div>
      <Toaster position="top-right" richColors />
      <div className="flex justify-center">
        <Dialog open={open} onOpenChange={(e) => setOpen(e)}>
          <DialogTrigger asChild>
            <Button variant="outline">Edit Profile</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  onChange={handleChange}
                  defaultValue={editData.name}
                  className="col-span-3"
                />
                {errors.name && <span className="col-span-4 text-red-500">{errors.name}</span>}
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="age" className="text-right">
                  Age
                </Label>
                <Input
                  id="age"
                  name="age"
                  onChange={handleChange}
                  defaultValue={editData.age}
                  className="col-span-3"
                />
                {errors.age && <span className="col-span-4 text-red-500">{errors.age}</span>}
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="mobile" className="text-right">
                  Mobile
                </Label>
                <Input
                  id="mobile"
                  name="mobile"
                  onChange={handleChange}
                  defaultValue={editData.mobile}
                  className="col-span-3"
                />
                {errors.mobile && <span className="col-span-4 text-red-500">{errors.mobile}</span>}
              </div>
              <div className="grid grid-cols-4 items-center gap-4 ">
                <Label htmlFor="gender" className="text-right">
                  Gender
                </Label>
                <RadioGroup
                  defaultValue={editData.gender}
                  onValueChange={handleGenderChange}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="r1" name="gender" />
                    <Label htmlFor="r1">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="r2" name="gender" />
                    <Label htmlFor="r2">Female</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="r3" name="gender" />
                    <Label htmlFor="r3">Other</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleChanges} type="button">
                Save changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default EditProfile;
