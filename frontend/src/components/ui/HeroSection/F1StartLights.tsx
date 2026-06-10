import { useEffect, useState } from "react";

const F1StartLights = ({ className }: { className?: string }) => {
    const [activeCount, setActiveCount] = useState(0);

    useEffect(() => {
        const runSequence = () => {
            setActiveCount(0);

            for (let i = 1; i <= 5; i++) {
                setTimeout(() => {
                    setActiveCount(i);
                }, i * 700);
            }

            // All lights out
            setTimeout(() => {
                setActiveCount(0);
            }, 4300);
        };

        runSequence();

        const interval = setInterval(() => {
            runSequence();
        }, 5500); // restart after sequence finishes

        return () => clearInterval(interval);
    }, []);

    return (
        <div className={`flex items-center gap-x-3 ${className}`}>
            {[0, 1, 2, 3, 4].map((_, index) => {
                const isActive = index < activeCount;

                return (
                    <div
                        key={index}
                        className="w-6.75 h-19.25 bg-black flex flex-col items-center justify-center gap-y-0.75"
                    >
                        {[0, 1].map((light) => (
                            <div
                                key={light}
                                className={`size-5.5 rounded-full transition-all duration-200 ${isActive
                                        ? "bg-red-600 shadow-[0_0_15px_rgba(255,0,0,0.8)]"
                                        : "bg-[#8F8A8A]"
                                    }`}
                            />
                        ))}
                    </div>
                );
            })}
        </div>
    );
};

export default F1StartLights;