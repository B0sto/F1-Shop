import { useEffect, useState } from "react";

type LogoutConfirmationModalProps = {
    isOpen: boolean;
    onCancel: () => void;
    onConfirm: () => void;
};

const animationDuration = 200;

const LogoutConfirmationModal = ({
    isOpen,
    onCancel,
    onConfirm
}: LogoutConfirmationModalProps) => {
    const [shouldRender, setShouldRender] = useState(isOpen);
    const [isClosing, setIsClosing] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setShouldRender(true);
            setIsClosing(false);
            return;
        }

        setIsClosing(true);
        const timeout = window.setTimeout(() => {
            setShouldRender(false);
        }, animationDuration);

        return () => {
            window.clearTimeout(timeout);
        };
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onCancel();
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, onCancel]);

    if (!shouldRender) return null;

    return (
        <div
            className={`fixed inset-0 z-9998 flex items-center justify-center bg-black/70 px-4 ${
                isClosing ? "logout-modal-overlay-out pointer-events-none" : "logout-modal-overlay-in"
            }`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="logout-modal-title"
        >
            <button
                type="button"
                className="absolute inset-0 cursor-default"
                aria-label="Close logout confirmation"
                onClick={onCancel}
            />

            <div className={`relative w-full max-w-105 rounded-xl border border-[#F90301]/40 bg-[#110D0D] p-6 text-center shadow-2xl ${
                isClosing ? "logout-modal-content-out" : "logout-modal-content-in"
            }`}>
                <h2
                    id="logout-modal-title"
                    className="font-irish text-3xl text-[#F90301]"
                >
                    Log out?
                </h2>

                <p className="mt-3 font-akshar text-lg text-white">
                    Are you sure you want to log out of your account?
                </p>

                <div className="mt-7 flex items-center justify-center gap-4">
                    <button
                        type="button"
                        className="cursor-pointer rounded-lg border border-white px-6 py-2 font-akshar text-white transition-colors duration-300 hover:bg-white hover:text-black"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        className="cursor-pointer rounded-lg bg-[#F90301] px-6 py-2 font-akshar text-white transition-colors duration-300 hover:bg-[#aa0303]"
                        onClick={onConfirm}
                    >
                        Log out
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LogoutConfirmationModal;
