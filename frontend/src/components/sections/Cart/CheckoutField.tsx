
type CheckoutFieldProps = {
    label: string;
    placeholder: string;
    icon: React.ComponentType<{ className?: string }>;
    type?: string;
    maxLength?: number;
};

const CheckoutField = ({ label, placeholder, icon: Icon, type = "text", maxLength, ...props }: CheckoutFieldProps) => (
    <label>
        <span className={"mb-2 block text-[13px] tracking-wide text-white/70"}>{label}</span>
        <span className="relative block">
            <Icon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-white/45" />
            <input
                {...props}
                type={type}
                maxLength={maxLength}
                placeholder={placeholder}
                className={`h-11 w-full rounded-sm border border-white/15 bg-[#120f0f] px-3 text-[15px] text-white outline-none transition-colors placeholder:text-white/25 focus:border-[#F90301] pl-10`}
            />
        </span>
    </label>
);

export default CheckoutField