import F1Logo from "@/components/icons/F1Logo";
import GoogleIcon from "@/components/icons/GoogleIcon";
import {login} from "@/services/providers/api/authApi";
import {useQueryClient} from "@tanstack/react-query";
import {Link, useNavigate} from "@tanstack/react-router";
import axios from "axios";
import {ArrowLeft, Eye, EyeOff} from "lucide-react";
import {useForm, type SubmitHandler} from "react-hook-form";
import {useState} from "react";

type FormFields = {
    email: string;
    password: string;
};

const LoginScreen = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        setError,
        formState: {errors, isSubmitting},
    } = useForm<FormFields>();

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        try {
            const user = await login(data);

            queryClient.setQueryData(["me"], user);

            await navigate({
                to: "/home",
            });
        } catch (error) {
            const message =
                axios.isAxiosError<{ message?: string }>(error)
                    ? error.response?.data.message ?? "Invalid credentials"
                    : "Invalid credentials";

            setError("root", {
                type: "server",
                message,
            });
        }
    };

    return (
        <div
            className="relative flex min-h-screen flex-col items-center justify-center overflow-y-auto bg-[#060606] px-4 pb-12 pt-5 sm:px-6 sm:pb-16 sm:pt-8 lg:pb-24">
            <Link
                className="absolute left-4 top-5 flex items-center gap-x-2 font-akshar text-base text-[#F90301] sm:left-8 sm:top-8 sm:text-[18px]"
                to="/home"
            >
                <ArrowLeft className="size-5 shrink-0 sm:size-5.5"/>
                <span>Return to home</span>
            </Link>

            <F1Logo className="h-auto w-28 sm:w-36 md:w-41"/>

            <h1 className="mb-4 text-center font-irish text-3xl leading-tight text-white sm:mb-3 sm:text-4xl md:text-[48px]">
                Welcome To <span className="text-[#F90301]">LULU SHOP</span>
            </h1>

            <form
                className="w-full max-w-120 rounded-xl bg-[#110D0D] px-7 py-10 font-akshar sm:px-12 sm:py-12 md:px-17.75 md:py-14 lg:px-19.5 lg:py-18.5"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="mb-4.75 flex flex-col gap-y-2.5">
                    <label htmlFor="email" className="text-[16px] text-white">
                        EMAIL
                    </label>

                    <input
                        {...register("email")}
                        id="email"
                        type="email"
                        className="min-h-10 rounded-sm bg-[#D9D9D9] px-2 py-1"
                    />
                </div>

                <div className="mb-7.75 flex flex-col gap-y-2.5 relative">
                    <label htmlFor="password" className="text-[16px] text-white">
                        PASSWORD
                    </label>

                    <input
                        {...register("password")}
                        id="password"
                        type={showPassword ? "text" : "password"}
                        className="min-h-10 rounded-sm bg-[#D9D9D9] px-2 py-1 pr-11"
                    />

                    <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-3 top-11.5 text-gray-600"
                    >
                        {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
                    </button>
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mb-3 min-h-10 w-full rounded-lg bg-[#F90301] py-1.5 text-[16px] text-white transition-all duration-300 hover:bg-[#aa0303] disabled:opacity-60"
                >
                    {isSubmitting ? "Loading..." : "LOG IN"}
                </button>

                {errors.root && (
                    <p className="mb-5 text-center text-red-500">
                        {errors.root.message}
                    </p>
                )}

                <div className="mb-7 text-center text-sm text-white">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-[#F90301] hover:underline">
                        Register
                    </Link>
                </div>

                <div className="mb-5 flex w-full items-center justify-center gap-x-2.5">
                    <div className="h-px flex-1 bg-white"></div>
                    <span className="shrink-0 text-sm text-white sm:text-[16px]">
            OR CONTINUE WITH
          </span>
                    <div className="h-px flex-1 bg-white"></div>
                </div>

                <button
                    type="button"
                    className="flex min-h-11 w-full items-center justify-center gap-x-2.5 border border-white pb-3 pt-2.25 transition-all duration-300 hover:bg-[#373737]"
                >
                    <GoogleIcon/>
                    <span className="text-[18px] text-white">Google</span>
                </button>
            </form>
        </div>
    );
};

export default LoginScreen;