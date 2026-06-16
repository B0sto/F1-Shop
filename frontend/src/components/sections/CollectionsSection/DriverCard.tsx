import type { DriverType } from "../../../types/DriverType"
import { getTeamVariant, teamTextColorClasses } from "@/utils/teamStyles"

type DriverCardProps = {
    driver: DriverType
}

const DriverCard = ({ driver }: DriverCardProps) => {
    const teamVariant = getTeamVariant(driver.team);
    const textColorClass = teamTextColorClasses[teamVariant];

    return (
        <div className="flex w-full items-center gap-x-4 md:ml-10 lg:ml-0 lg:w-auto lg:shrink-0">
            <div className="h-40 w-40 shrink-0 overflow-hidden rounded-xl sm:h-44 sm:w-44 sm:rounded-2xl lg:h-40 lg:w-40">
                <img src={driver.imgSrc} alt={driver.name} className="h-full w-full object-cover object-[center_25%]" />
            </div>

            <div className="min-w-0 space-y-1 text-xl leading-none sm:space-y-1.5 sm:text-2xl md:text-[30px] lg:max-w-42.5">
                <h4>{driver.name}</h4>
                <p className={textColorClass}>{driver.desc}</p>
                <p className={textColorClass}>{driver.team}</p>
            </div>

        </div>
    )
}

export default DriverCard
