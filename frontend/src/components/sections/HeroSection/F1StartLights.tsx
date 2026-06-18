const F1StartLights = ({ className }: { className?: string }) => {
    return (
        <div className={`flex items-center gap-x-2 sm:gap-x-3 ${className}`}>
            {[0, 1, 2, 3, 4].map((_, index) => {
                return (
                    <div
                        key={index}
                        className="w-5 h-14 sm:w-6.75 sm:h-19.25 bg-black flex flex-col items-center justify-center gap-y-0.75"
                    >
                        {[0, 1].map((light) => (
                            <div
                                key={light}
                                className={`f1-start-light f1-start-light-${index} size-4 rounded-full sm:size-5.5`}
                            />
                        ))}
                    </div>
                );
            })}
        </div>
    );
};

export default F1StartLights;
