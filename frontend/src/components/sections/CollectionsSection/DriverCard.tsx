import type { DriverType } from "../../../types/DriverType"
import { getTeamVariant, teamClasses } from "@/utils/teamStyles"

type DriverCardProps = {
    driver: DriverType
}

const DriverCard = ({ driver }: DriverCardProps) => {
    const teamVariant = getTeamVariant(driver.team);
    const { teamNameStyles, teamDescStyles } = teamClasses[teamVariant];

    return (
        <div className="flex w-full items-center gap-x-4 md:ml-10 lg:ml-0 lg:w-auto lg:shrink-0">
            <div className="overflow-hidden rounded-xl sm:rounded-2xl">
                <img src={driver.imgSrc} alt={driver.name} className="h-full w-full" />
            </div>

            <div className="min-w-0 space-y-1 text-xl leading-none sm:space-y-1.5 sm:text-2xl md:text-[30px] lg:max-w-42.5">
                <h4>{driver.name}</h4>
                <p className={teamDescStyles}>{driver.desc}</p>
                <p className={teamNameStyles}>{driver.team}</p>
            </div>

        </div>
    )
}

export default DriverCard
