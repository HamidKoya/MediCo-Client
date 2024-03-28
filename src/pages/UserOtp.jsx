import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const FormSchema = z.object({
  pin: z.string().min(4, {
    message: "Your one-time password must be 4 characters.",
  }),
});

export default function UserOtp() {
  const location = useLocation();
  const navigate = useNavigate();
  const { userId, otpId } = location.state;

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  const onSubmit = async (data) => {
    const enteredValues = data.pin;
    try {
      const response = await axios.post("http://localhost:3000/otpVerify", {
        enteredValues,
        userId,
        otpId,
      });
      if (response?.data?.status) {
        const Toast = Swal.mixin({
          toast: true,
          position: "top",
          showConfirmButton: false,
          timer: 5000,
        });
        Toast.fire({
          icon: "info",
          title: "Login now",
        });
        navigate("/login", { state: "Email verified" });
      } else {
        const Toast = Swal.mixin({
          toast: true,
          position: "top",
          showConfirmButton: false,
          timer: 5000,
        });
        Toast.fire({
          icon: "error",
          title: "error",
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const resendOtp = async ()=>{
    try {
      const response = await axios.post('http://localhost:3000/resendOtp',{userId})
      if(response?.status===200){
        const Toast = Swal.mixin({
          toast:true,
          position:'top',
          showConfirmButton:false,
          timer:5000,
        })
        Toast.fire({
          icon: 'info',
          title: 'OTP resended',
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <div className="flex justify-center items-center w-screen h-screen bg-slate-200">
      <Form {...form}>
        <form
          className="border-none p-11 sm:p-24 bg-transparent shadow-2xl rounded-3xl bg-slate-300"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="pin"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg ml-14">
                  One-Time Password
                </FormLabel>
                <FormControl>
                  <InputOTP maxLength={4} {...field}>
                    <InputOTPGroup className="text-9xl font-semibold mx-auto">
                      <InputOTPSlot
                        className="w-16 text-2xl h-16 border-gray-400"
                        index={0}
                      />
                      <InputOTPSlot
                        className="w-16 text-2xl h-16 border-gray-400"
                        index={1}
                      />
                      <InputOTPSlot
                        className="w-16 text-2xl h-16 border-gray-400"
                        index={2}
                      />
                      <InputOTPSlot
                        className="w-16 text-2xl h-16 border-gray-400"
                        index={3}
                      />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormDescription className="text-md">
                  Please enter the otp sent to your email.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="ml-24 bg-[#458b97]" type="submit">
            Verify
          </Button>
          <div className="flex flex-row items-center justify-center text-center  space-x-1 text-gray-500 mt-6">
            <p>Didn&apos;t receive code?</p>{" "}
            <a onClick={resendOtp} className="flex flex-row items-center text-blue-600 cursor-pointer">
              Resend
            </a>
          </div>
        </form>
      </Form>
    </div>
  );
}
