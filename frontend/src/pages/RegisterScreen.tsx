import F1Logo from "@/components/icons/F1Logo"
import GoogleIcon from "@/components/icons/GoogleIcon"
import { register as registerUser } from "@/services/providers/api/authApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
    username: z.
        string()
        .trim()
        .min(3, "Username most contain at least 3 letters"),

    email: z
        .string()
        .trim()
        .min(1, "Email is required")
        .pipe(z.email("Enter a valid email")),

    password: z
        .string()
        .min(1, "Password is required")
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
            "Password must be at least 8 characters and contain lowercase, uppercase, and number"
        ),

    address: z
        .string()

});

type formFields = z.infer<typeof schema>;

const RegisterScreen = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<formFields>({
        resolver: zodResolver(schema)
    })


    const onSubmit: SubmitHandler<formFields> = async (data) => {
        try {
            const user = await registerUser(data)

            queryClient.setQueryData(["me"], user);

            await navigate({
                to: "/home"
            })

        } catch (error) {
            const message = axios.isAxiosError<{ message?: string }>(error)
                ? error.response?.data.message ?? "Unable to Register" : "Unable to Register";
            setError("root", {
                type: "server",
                message
            })
        }
    }

    return (
        <div className="relative flex min-h-screen flex-col items-center justify-center overflow-y-auto bg-[#060606] px-4 pb-12 pt-5 sm:px-6 sm:pb-16 sm:pt-8 lg:pb-24">
            <Link to="/home" className="absolute left-4 top-5 flex cursor-pointer items-center gap-x-2 font-akshar text-base text-[#F90301] sm:left-8 sm:top-8 sm:text-[18px]">
                <ArrowLeft className="size-5 shrink-0 sm:size-5.5" />
                <span>Return to home</span>
            </Link>

            <F1Logo className="h-auto w-28 sm:w-36 md:w-41" />
            <h1 className="mb-4 text-center font-irish text-3xl leading-tight text-white sm:mb-3 sm:text-4xl md:text-[48px]">
                Welcome To <span className="text-[#F90301]">LULU SHOP</span>
            </h1>

            <form className="w-full max-w-120 rounded-xl bg-[#110D0D] px-7 py-10 font-akshar sm:px-12 sm:py-12 md:px-17.75 lg:px-19.5" onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="flex flex-col gap-y-2.5 mb-4.75">
                    <label htmlFor="username" className="text-white text-[16px]">USERNAME</label>
                    <input
                        {...register("username")}
                        type="text"
                        id="username"
                        className="min-h-10 rounded-sm bg-[#D9D9D9] px-2 py-1"
                    />
                    {errors.username && (
                        <p className="text-sm leading-tight text-red-500">{errors.username.message}</p>
                    )}
                </div>

                <div className="flex flex-col gap-y-2.5 mb-4.75">
                    <label htmlFor="email" className="text-white text-[16px]">EMAIL</label>
                    <input
                        {...register("email")}
                        type="email"
                        id="email"
                        className="min-h-10 rounded-sm bg-[#D9D9D9] px-2 py-1"
                    />
                    {errors.email && (
                        <p className="text-sm leading-tight text-red-500">{errors.email.message}</p>
                    )}
                </div>

                <div className="flex flex-col gap-y-2.5 mb-4.75">
                    <label htmlFor="password" className="text-white text-[16px]">PASSWORD</label>
                    <input
                        {...register("password")}
                        type="password"
                        id="password"
                        className="min-h-10 rounded-sm bg-[#D9D9D9] px-2 py-1"
                    />
                    {errors.password && (
                        <p className="text-sm leading-tight text-red-500">{errors.password.message}</p>
                    )}
                </div>

                <div className="flex flex-col gap-y-2.5 mb-7.75">
                    <label htmlFor="address" className="text-white text-[16px]">ADDRESS</label>
                    <input
                        {...register("address")}
                        type="text"
                        id="address"
                        className="min-h-10 rounded-sm bg-[#D9D9D9] px-2 py-1"
                    />
                    {errors.address && (
                        <p className="text-sm leading-tight text-red-500">{errors.address.message}</p>
                    )}
                </div>

                <button className="mb-7 min-h-10 w-full cursor-pointer rounded-lg bg-[#F90301] py-1.5 text-[16px] text-white transition-all duration-300 hover:bg-[#aa0303]" type="submit" disabled={isSubmitting}>{isSubmitting ? "Loading..." : "REGISTER"}</button>

                <div className="mb-7 text-center text-sm text-white">
                    Already have an account? {" "}
                    <Link
                        to="/login"
                        className="text-[#F90301] hover:underline"
                    >
                        Log in
                    </Link>
                </div>

                {errors.root && (
                    <p className="text-sm leading-tight text-red-500">{errors.root.message}</p>
                )}

                <div className="w-full flex items-center justify-center gap-x-2.5 mb-5">
                    <div className="h-px flex-1 bg-white"></div>
                    <span className="shrink-0 text-sm text-white sm:text-[16px]">OR CONTINUE WITH</span>
                    <div className="h-px flex-1 bg-white"></div>
                </div>

                <button type="button" className="flex min-h-11 w-full cursor-pointer items-center justify-center gap-x-2.5 border border-white pb-3 pt-2.25 transition-all duration-300 hover:bg-[#373737]">
                    <GoogleIcon />
                    <span className="text-white text-[18px]">Google</span>
                </button>
            </form>
        </div>
    )
}

export default RegisterScreen
