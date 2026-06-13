type F1LogoProps = {
    className?: string;
}

const F1Logo = ({ className }: F1LogoProps) => {
    return (
        <img src="/f1Logo.svg" alt="F1 Logo" className={className} />
    )
}

export default F1Logo
