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
        <div className="relative bg-[#060606] h-screen flex items-center justify-center flex-col">
            <Link to="/home" className="absolute top-8 left-8 flex items-center gap-x-2 text-[#F90301] font-akshar text-[18px] cursor-pointer">
                <ArrowLeft size={22} />
                <span>Return to home</span>
            </Link>

            <F1Logo className="w-41 h-33.5" />
            <h1 className="text-[48px] font-irish text-white mb-3">
                Welcome To <span className="text-[#F90301]">LULU SHOP</span>
            </h1>

            <form className="bg-[#110D0D] py-12 px-17.75 pl-19.5 mb-25 w-120 font-akshar rounded-xl" onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="flex flex-col gap-y-2.5 mb-4.75">
                    <label htmlFor="username" className="text-white text-[16px]">USERNAME</label>
                    <input
                    {...register("username")}
                        type="text"
                        id="username"
                        className="bg-[#D9D9D9] rounded-sm px-2 py-1"
                    />
                    {errors.username && (
                        <p className="text-red-500">{errors.username.message}</p>
                    )}
                </div>

                <div className="flex flex-col gap-y-2.5 mb-4.75">
                    <label htmlFor="email" className="text-white text-[16px]">EMAIL</label>
                    <input
                    {...register("email")}
                        type="email"
                        id="email"
                        className="bg-[#D9D9D9] rounded-sm px-2 py-1"
                    />
                    {errors.email && (
                        <p className="text-red-500">{errors.email.message}</p>
                    )}
                </div>

                <div className="flex flex-col gap-y-2.5 mb-4.75">
                    <label htmlFor="password" className="text-white text-[16px]">PASSWORD</label>
                    <input
                    {...register("password")}
                        type="password"
                        id="password"
                        className="bg-[#D9D9D9] rounded-sm px-2 py-1"
                    />
                    {errors.password && (
                        <p className="text-red-500">{errors.password.message}</p>
                    )}
                </div>

                <div className="flex flex-col gap-y-2.5 mb-7.75">
                    <label htmlFor="address" className="text-white text-[16px]">ADDRESS</label>
                    <input
                    {...register("address")}
                        type="text"
                        id="address"
                        className="bg-[#D9D9D9] rounded-sm px-2 py-1"
                    />
                    {errors.address && (
                        <p className="text-red-500">{errors.address.message}</p>
                    )}
                </div>

                <button className="w-full bg-[#F90301] text-[16px] rounded-lg py-1.5 text-white mb-7 cursor-pointer hover:bg-[#aa0303] transition-all duration-300" type="submit" disabled={isSubmitting}>{isSubmitting ? "Loading..." : "REGISTER"}</button>

                {errors.root && (
                    <p className="text-red-500">{errors.root.message}</p>
                )}

                <div className="w-full flex items-center justify-center gap-x-2.5 mb-5">
                    <div className="w-[30%] bg-white h-px"></div>
                    <span className="text-[16px] text-white">OR CONTINUE WITH</span>
                    <div className="w-[30%] bg-white h-px"></div>
                </div>

                <button type="button" className="w-full pt-2.25 pb-3 border border-white flex items-center gap-x-2.5 justify-center cursor-pointer hover:bg-[#373737] transition-all duration-300">
                    <GoogleIcon />
                    <span className="text-white text-[18px]">Google</span>
                </button>
            </form>
        </div>
    )
}

export default RegisterScreen
