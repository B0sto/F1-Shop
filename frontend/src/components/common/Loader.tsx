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
        <div className="fixed inset-0 z-9999 flex flex-col items-center justify-center gap-6 bg-[#050505]">
            <div className="relative h-22.5 w-[90%] max-w-130">
                <div className="absolute right-0 bottom-7 left-0 h-1.5 rounded-full bg-[#2a2a2a]" />

                <div
                    className="absolute bottom-7 left-0 h-1.5 rounded-full bg-[#f90301]"
                    style={{
                        width: `${progress * 100}%`,
                    }}
                />

                <div
                    className="absolute bottom-1.25 text-[#f90301]"
                    style={{
                        left: `calc(${progress * 100}% - ${progress * carSize}px)`,
                        width: carSize,
                        height: carSize,
                    }}
                >
                    <CarIcon/>
                </div>
            </div>

            <span className="font-sans text-xs tracking-[0.25em] text-white uppercase">
        Loading F1 Shop...
      </span>
        </div>
    );
};

export default Loader;
