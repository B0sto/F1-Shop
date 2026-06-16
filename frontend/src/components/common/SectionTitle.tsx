type SectionTitleProps = {
    title: string;
    className?: string;
}

const SectionTitle = ({ title, className }: SectionTitleProps) => {
    return (
        <h3 className={`text-4xl leading-none sm:text-5xl lg:text-[64px] ${className}`}>{title}</h3>
    )
}

export default SectionTitle