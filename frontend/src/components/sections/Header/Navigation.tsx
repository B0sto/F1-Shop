import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { meQuery } from "@/services/providers/queries/authQueries";
import { logout } from "@/services/providers/api/authApi";
import LogoutConfirmationModal from "@/components/common/LogoutConfirmationModal";
import type {
    NavigationAction,
    NavigationItemsType
} from "../../../types/NavigationItemType";
import BurgerMenu from "./BurgerMenu";
import NavItem from "./NavItem";

const navigationItems: NavigationItemsType[] = [
    {
        pageName: "Home",
        imagePath: "/homeWheel.svg",
        routeHref: "/home"
    },
    {
        pageName: "Shop",
        imagePath: "/shopWheel.svg",
        action: "scrollTo"
    },
    {
        pageName: "Cart",
        imagePath: "/cartWheel.svg",
        routeHref: "/cart"
    },
    {
        pageName: "Profile",
        imagePath: "/userProfileWheel.svg",
        routeHref: "/profile"
    },
    {
        pageName: "Logout",
        imagePath: "/loginWheel.svg",
        action: "logout"
    },
    {
        pageName: "Login",
        imagePath: "/loginWheel.svg",
        routeHref: "/login"
    },
    {
        pageName: "Register",
        imagePath: "/registerWheel.svg",
        routeHref: "/register"
    }
]

const commonItems = navigationItems.filter((item) =>
    ["Home", "Shop"].includes(item.pageName)
);

const cartItem = navigationItems.find(
    (item) => item.pageName === "Cart"
);

const profileItem = navigationItems.find(
    (item) => item.pageName === "Profile"
);

const logoutItem = navigationItems.find(
    (item) => item.pageName === "Logout"
);

const guestItems = navigationItems.filter((item) =>
    ["Login", "Register"].includes(item.pageName)
);

const Navigation = () => {
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    const { data: user } = useQuery(meQuery);
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const logoutMutation = useMutation({
        mutationKey: ["logout"],
        mutationFn: async () => {
            const minimumAnimation = new Promise<void>((resolve) => {
                window.setTimeout(resolve, 500);
            });

            await Promise.all([logout(), minimumAnimation]);
        },
        onSuccess: async () => {
            queryClient.setQueryData(["me"], null);
            await navigate({ to: "/home" });
        },
        onError: () => {
            setIsLogoutModalOpen(true);
        }
    });

    const handleAction = (action: NavigationAction) => {
        if (action === "logout") {
            setIsLogoutModalOpen(true);
        }

        if (action === "scrollTo") {
            return;
        }
    };

    const mainItems = user && cartItem
        ? [...commonItems, cartItem]
        : commonItems;

    const authenticatedRightItems = [profileItem, logoutItem].filter(
        (item): item is NavigationItemsType => Boolean(item)
    );

    const rightItems = user
        ? authenticatedRightItems
        : guestItems;

    const mobileItems = [...mainItems, ...rightItems];

    const confirmLogout = () => {
        setIsLogoutModalOpen(false);
        logoutMutation.mutate();
    };

    return (
        <>
            <div className="hidden md:flex flex-1 items-center justify-center">
                <div className="flex items-center gap-x-5 lg:gap-x-10 xl:gap-x-14">
                    {mainItems.map((navItem) => (
                        <NavItem
                            key={navItem.pageName}
                            navItem={navItem}
                            onClick={
                                navItem.action
                                    ? () => handleAction(navItem.action)
                                    : undefined
                            }
                        />
                    ))}
                </div>
            </div>

            <BurgerMenu
                navigationItems={mobileItems}
                onAction={handleAction}
            />

            <div className=" hidden md:flex items-center gap-x-7">
                {rightItems.map((navItem) => (
                    <NavItem
                        key={navItem.pageName}
                        navItem={navItem}
                        onClick={
                            navItem.action
                                ? () => handleAction(navItem.action)
                                : undefined
                        }
                    />
                ))}
            </div>

            <LogoutConfirmationModal
                isOpen={isLogoutModalOpen}
                onCancel={() => setIsLogoutModalOpen(false)}
                onConfirm={confirmLogout}
            />
        </>
    );
};

export default Navigation;
