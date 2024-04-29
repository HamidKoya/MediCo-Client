import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaEdit } from "react-icons/fa";
import { drEditSchema } from "@/validations/doctor/editValidation";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { ScaleLoader } from "react-spinners";
import axios from "axios";
import { signInSuccess } from "@/redux/slices/doctorSlice";
import Swal from "sweetalert2";
function EditProfile() {
  const { currentDoctor } = useSelector((state) => state.doctor);
  const dispatch = useDispatch();
  const doctorId = currentDoctor.doctorData._id;
  const [loading, setLoading] = useState(false);
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/doctor/editProfile",
        { ...values, doctorId }
      );
      dispatch(signInSuccess(response.data));
      setLoading(false);
      const Toast = Swal.mixin({
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 3000,
        didOpen: (toast) => {},
      });
      Toast.fire({
        icon: "success",
        title: response?.data?.message,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        name: currentDoctor?.doctorData?.name,
        mobile: currentDoctor?.doctorData?.mobile,
        experience: currentDoctor?.doctorData?.experience,
        bio: currentDoctor?.doctorData?.bio,
      },
      validationSchema: drEditSchema,
      onSubmit,
      enableReinitialize: true,
    });
  return (
    <div>
      {loading ? (
        <ScaleLoader color="#3C99DC" height={20} width={5} />
      ) : (
        <Dialog>
          <DialogTrigger asChild>
            <button className="p-2 bg-blue-500 text-sm rounded-md font-semibold text-white flex justify-center items-center active:scale-90">
              EDIT{" "}
              <span className="ml-2">
                <FaEdit />
              </span>
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Profile</DialogTitle>
            </DialogHeader>
            <form onSubmit={onSubmit}>
              <div className="flex items-center space-x-2">
                <div className="grid flex-1 gap-2">
                  <Label>Name</Label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <div>
                    {errors.name && touched.name && (
                      <p className="text-red-600">{errors.name}</p>
                    )}
                  </div>
                  <Label>Mobile</Label>
                  <Input
                    type="text"
                    id="mobile"
                    name="mobile"
                    value={values.mobile}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <div>
                    {errors.mobile && touched.mobile && (
                      <p className="text-red-600">{errors.mobile}</p>
                    )}
                  </div>
                  <Label>Experience</Label>
                  <Input
                    type="text"
                    id="experience"
                    name="experience"
                    value={values.experience}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <div>
                    {errors.experience && touched.experience && (
                      <p className="text-red-600">{errors.experience}</p>
                    )}
                  </div>
                  <Label>Bio</Label>
                  <textarea
                    id="bio"
                    name="bio"
                    rows="3"
                    value={values.bio}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  ></textarea>
                  <div>
                    {errors.bio && touched.bio && (
                      <p className="text-red-600">{errors.bio}</p>
                    )}
                  </div>
                </div>
              </div>
              <DialogFooter className="sm:justify-start mt-3">
                <DialogClose asChild>
                  <Button type="submit" variant="secondary">
                    Save Changes
                  </Button>
                </DialogClose>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

export default EditProfile;
