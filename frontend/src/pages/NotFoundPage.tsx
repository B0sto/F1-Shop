import F1Logo from "@/components/icons/F1Logo";
import { Link } from "@tanstack/react-router";

const NotFoundPage = () => {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-[#060606] px-4 text-center font-akshar text-white">
            <F1Logo className="h-30 w-37 object-contain" />

            <p className="mt-6 font-irish text-[96px] leading-none text-[#F90301]">
                404
            </p>

            <h1 className="mt-4 font-irish text-5xl">
                Page not found
            </h1>

            <Link
                to="/home"
                className="mt-8 rounded-lg bg-[#F90301] px-8 py-2.5 text-[18px] text-white transition-colors duration-300 hover:bg-[#aa0303]"
            >
                Back to home
            </Link>
        </main>
    );
};

export default NotFoundPage;
