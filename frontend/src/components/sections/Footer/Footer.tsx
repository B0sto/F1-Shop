import { useState, type SyntheticEvent } from "react";
import { toast } from "sonner";

const shopLinks = ["Collections", "Special Discounts", "Vintage F1 Collection"];
const supportLinks = ["Shipping & Returns", "Contact Us", "FAQ"];

const Footer = () => {
    const [email, setEmail] = useState("");

    const isValidEmail = (value: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    };

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();

        if (!email.trim()) {
            toast.error("Email is required")
            return;
        }

        if (!isValidEmail(email)) {
            toast.error("Invalid email format");
            return;
        }

        toast.success("Successfully Sent");
        setEmail("");

    }

    return (
        <footer className="bg-black border-t border-white/30 px-4 pt-3 pb-8 font-akshar text-white sm:px-8 sm:pt-16 sm:pb-14 lg:px-12 lg:pt-20 lg:pb-16 xl:px-16 2xl:px-36">
            <div className="w-full">
                <div className="grid gap-5 text-center md:grid-cols-2 md:text-left lg:gap-16 xl:grid-cols-[1.15fr_0.9fr_0.9fr_1.35fr]">
                    <section>
                        <h2 className="text-[18px] leading-none font-bold sm:text-[26px]">F1 PRECISION</h2>
                        <p className="mx-auto mt-3 max-w-56 text-[14px] leading-6 font-medium text-[#747474] sm:max-w-76 sm:text-[19px] md:mx-0">
                            The pinnacle of motorsport merchandise. Engineered for speed,
                            designed for style. Join the grid.
                        </p>
                    </section>

                    <nav aria-label="Shop">
                        <h2 className="text-[18px] leading-none font-bold sm:text-[26px]">SHOP</h2>
                        <ul className="mt-3 space-y-3 text-[14px] leading-none font-medium text-[#747474] sm:mt-5 sm:space-y-3.5 sm:text-[19px]">
                            {shopLinks.map((link) => (
                                <li key={link}>
                                    <a href="#" className="transition-colors hover:text-white">
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <nav aria-label="Support">
                        <h2 className="text-[18px] leading-none font-bold sm:text-[26px]">SUPPORT</h2>
                        <ul className="mt-3 space-y-3 text-[14px] leading-none font-medium text-[#747474] sm:mt-5 sm:space-y-3.5 sm:text-[19px]">
                            {supportLinks.map((link) => (
                                <li key={link}>
                                    <a href="#" className="transition-colors hover:text-white">
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <section>
                        <h2 className="text-[18px] leading-none font-bold sm:text-[26px]">NEWSLETTER</h2>
                        <p className="mt-4 text-[14px] leading-none font-medium text-[#747474] sm:mt-5 sm:text-[19px]">
                            Get race alerts and drop notifications
                        </p>

                        <form className="mx-auto mt-4 flex w-full max-w-60 flex-col gap-2 sm:mt-6 sm:max-w-100.25 sm:flex-row sm:gap-0 md:mx-0" onSubmit={handleSubmit}>
                            <input
                                type="email"
                                aria-label="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="EMAIL"
                                className="h-9 min-w-0 flex-1 rounded-md bg-black/45 px-3 text-[12px] font-bold text-white outline-none placeholder:text-[#747474] sm:h-11 sm:rounded-r-none sm:px-4 sm:text-[17px]"
                            />
                            <button
                                type="submit"
                                className="h-9 cursor-pointer rounded-md bg-[#f20e0e] text-[12px] font-bold text-black transition-colors hover:bg-[#ff2525] sm:h-11 sm:w-21 sm:rounded-l-none sm:text-[17px]"
                            >
                                JOIN
                            </button>
                        </form>
                    </section>
                </div>

                <div className="mt-3 h-px w-full bg-white/70 sm:mt-16" />

                <div className="flex flex-col items-center gap-6 bg-[#110D0D] pt-5 text-center text-[13px] leading-none font-medium text-[#747474] sm:items-start sm:gap-5 sm:bg-transparent sm:pt-9 sm:text-[18px] md:flex-row md:items-center md:justify-between md:text-left">
                    <p>&copy; 2026 F1 LULU SHOP. ALL RIGHTS RESERVED.</p>

                    <nav aria-label="Legal" className="flex flex-wrap gap-7 md:gap-10">
                        <a href="#" className="transition-colors hover:text-white">
                            Privacy Policy
                        </a>
                        <a href="#" className="transition-colors hover:text-white">
                            Terms of Service
                        </a>
                    </nav>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
