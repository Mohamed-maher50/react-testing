import { zodResolver } from "@hookform/resolvers/zod";
import * as Form from "@radix-ui/react-form";
import { useForm } from "react-hook-form";
import { z } from "zod";
const schema = z.object({
  email: z
    .string()
    .min(1, "Please enter your email")
    .email("Please provide a valid email"),
  password: z.string().min(1, "Please enter a password"),
});
type FormData = z.infer<typeof schema>;
const LoginForm = ({ onSubmit }: { onSubmit: (data: FormData) => void }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  // Handle form submission
  const onSubmitHandler = (data: FormData) => {
    onSubmit(data);
    console.log(data);
  };
  return (
    <div className="h-screen bg-purple-600 w-full">
      <Form.Root
        className="w-[260px] text-black"
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        {/* Email field */}
        <Form.Field className="grid mb-[10px]" name="email">
          <div className="flex items-baseline justify-between">
            <Form.Label className="text-[15px] font-medium leading-[35px] text-white">
              Email
            </Form.Label>
            {errors.email && (
              <Form.Message className="text-[13px] text-white opacity-[0.8]">
                {errors.email.message}
              </Form.Message>
            )}
          </div>
          <Form.Control asChild>
            <input
              className="box-border w-full bg-blackA2 shadow-blackA6 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-white shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA6"
              type="email"
              {...register("email")}
            />
          </Form.Control>
        </Form.Field>

        {/* password field */}
        <Form.Field className="grid mb-[10px]" name="password">
          <div className="flex items-baseline justify-between">
            <Form.Label className="text-[15px] font-medium leading-[35px] text-white">
              password
            </Form.Label>
            {errors.password && (
              <Form.Message className="text-[13px] text-white opacity-[0.8]">
                {errors.password.message}
              </Form.Message>
            )}
          </div>
          <Form.Control asChild>
            <input
              type="password"
              className="box-border w-full bg-blackA2 shadow-blackA6 inline-flex appearance-none items-center justify-center rounded-[4px] p-[10px] text-[15px] leading-none text-white shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA6 resize-none"
              {...register("password")}
            />
          </Form.Control>
        </Form.Field>

        {/* Submit button */}
        <Form.Submit asChild>
          <button className="box-border w-full text-violet11 shadow-blackA4 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none mt-[10px]">
            Submit
          </button>
        </Form.Submit>
      </Form.Root>
    </div>
  );
};

export default LoginForm;
