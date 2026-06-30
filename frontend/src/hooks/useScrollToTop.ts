import { useLocation } from "@tanstack/react-router";
import { useEffect, type RefObject } from "react";

export const useScrollToTop = (ref: RefObject<HTMLElement | null>) => {
    const { pathname } = useLocation();

    useEffect(() => {
        ref.current?.scrollTo({
            top: 0,
            left: 0,
            behavior: "auto"
        })
    }, [pathname, ref])
}