import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import type { NavigationItemsType } from "../../../types/NavigationItemType";

type BurgerMenuProps = {
    navigationItems: NavigationItemsType[];
}

const BurgerMenu = ({ navigationItems }: BurgerMenuProps) => {
    const [toggle, setToggle] = useState(false);

    useEffect(() => {
        if (toggle) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        }
    }, [toggle])

    return (
        <div className="relative">
            <button
                type="button"
                className="md:hidden flex size-10 items-center justify-center text-[#F90301]"
                aria-label="Open navigation menu"
                onClick={() => setToggle(prev => !prev)}
            >
                <Menu className="size-7" />
            </button>

            {toggle && (
                <div className="fixed inset-0 z-40">
                    <button
                        type="button"
                        className="absolute inset-0 bg-black/50"
                        aria-label="Close navigation menu"
                        onClick={() => setToggle(false)}
                    />
                    <div className="absolute right-0 top-0 h-dvh w-[min(82vw,18rem)] bg-black text-red-500 p-4 pr-6 pt-6">
                        <button
                            type="button"
                            className="ml-auto flex size-10 items-center justify-center"
                            aria-label="Close navigation menu"
                            onClick={() => setToggle(false)}
                        >
                            <X className="size-7" />
                        </button>
                        <ul className="space-y-4 pt-10">
                            {navigationItems.map((navItem: NavigationItemsType) => (
                                <li key={navItem.pageName} className="flex items-center gap-x-3 font-irish text-lg">
                                    <img src={navItem.imagePath} alt={`${navItem.pageName} Wheel`} className="size-11 shrink-0"/>
                                    <span>{navItem.pageName}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

            )}
        </div>
    );
};

export default BurgerMenu;
