import {useEffect, useRef, useState} from "react";
import CarIcon from "@/components/common/CarIcon.tsx";
import {useIsFetching} from "@tanstack/react-query";


const Loader = () => {
    const [progress, setProgress] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const isInitialFetching = useIsFetching({
        predicate: (query) => query.state.status === "pending",
    });

    const pRef = useRef(0);
    const lastRef = useRef<number | null>(null);
    const rafRef = useRef<number | null>(null);

    useEffect(() => {
        if (!isInitialFetching) {
            setIsVisible(false);
            return;
        }

        const timeout = window.setTimeout(() => setIsVisible(true), 250);

        return () => window.clearTimeout(timeout);
    }, [isInitialFetching]);

    useEffect(() => {
        if (!isVisible) return;

        const duration = 1.6;

        const tick = (ts: number) => {
            if (!lastRef.current) lastRef.current = ts;

            const dt = Math.min((ts - lastRef.current) / 1000, 0.05);
            lastRef.current = ts;

            pRef.current += dt / duration;

            if (pRef.current >= 1) {
                pRef.current = 0;
            }

            setProgress(pRef.current);
            rafRef.current = requestAnimationFrame(tick);
        };

        rafRef.current = requestAnimationFrame(tick);

        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            rafRef.current = null;
            lastRef.current = null;
        };
    }, [isVisible]);

    if (!isVisible) return null;

    const carSize = 90;

    return (
        <div
            style={{
                position: "fixed",
                inset: 0,
                zIndex: 9999,
                background: "#050505",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "1.5rem",
            }}
        >
            <div
                style={{
                    position: "relative",
                    width: "90%",
                    maxWidth: 520,
                    height: 90,
                }}
            >
                <div
                    style={{
                        position: "absolute",
                        left: 0,
                        right: 0,
                        bottom: 28,
                        height: 6,
                        background: "#2a2a2a",
                        borderRadius: 999,
                    }}
                />

                <div
                    style={{
                        position: "absolute",
                        left: 0,
                        bottom: 28,
                        height: 6,
                        width: `${progress * 100}%`,
                        background: "#f90301",
                        borderRadius: 999,
                    }}
                />

                <div
                    style={{
                        position: "absolute",
                        bottom: 5,
                        left: `calc(${progress * 100}% - ${progress * carSize}px)`,
                        width: carSize,
                        height: carSize,
                        color: "#f90301",
                    }}
                >
                    <CarIcon/>
                </div>
            </div>

            <span
                style={{
                    fontSize: 12,
                    letterSpacing: "0.25em",
                    color: "#ffffff",
                    textTransform: "uppercase",
                    fontFamily: "system-ui, sans-serif",
                }}
            >
        Loading F1 Shop...
      </span>
        </div>
    );
};

export default Loader;
