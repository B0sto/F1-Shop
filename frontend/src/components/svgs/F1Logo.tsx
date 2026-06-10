type F1LogoProps = {
    className?: string;
}

const F1Logo = ({ className }: F1LogoProps) => {
    return (
        <div className="w-full h-full">
            <img src="/f1Logo.svg" alt="F1 Logo" className={`${className}`}/>
        </div>
    )
}

export default F1Logo