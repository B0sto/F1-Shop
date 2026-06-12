import type { DriverType } from "../../../types/DriverType"

type DriverCardProps = {
    driver: DriverType
}

const DriverCard = ({ driver }: DriverCardProps) => {
    return (
        <div className="flex items-center gap-x-2.5">
            <div className="rounded-[30px]">
                <img src={driver.imgSrc} alt={driver.name} className="rounded-[30px] w-full h-full" />
            </div>

            <div className="max-w-42.5 text-[30px]">
                <h4>{driver.name}</h4>
                <p className="text-[#680004]">{driver.desc}</p>
                <p className="text-[#680004]">{driver.team}</p>
            </div>

        </div>
    )
}

export default DriverCard
