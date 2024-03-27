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

const FormSchema = z.object({
  pin: z.string().min(4, {
    message: "Your one-time password must be 4 characters.",
  }),
});

export default function Otp() {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  const onSubmit = async  (data) =>  {
    
    const enteredValues = data.pin

    
    
  }
  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="pin"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-lg ml-14' >One-Time Password</FormLabel>
                <FormControl>
                  <InputOTP maxLength={4} {...field}>
                    <InputOTPGroup className="text-9xl font-semibold mx-auto">
                      <InputOTPSlot className="w-16 text-2xl h-16"  index={0} />
                      <InputOTPSlot className="w-16 text-2xl h-16" index={1} />
                      <InputOTPSlot className="w-16 text-2xl h-16" index={2} />
                      <InputOTPSlot className="w-16 text-2xl h-16" index={3} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormDescription className='text-md'>
                  Please enter the otp sent to your email.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className='ml-24' type="submit">Verify</Button>
        </form>
      </Form>
    </div>
  );
}
