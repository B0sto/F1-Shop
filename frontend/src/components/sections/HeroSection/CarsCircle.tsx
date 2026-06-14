import { useState } from "react"

import F1Logo from "../../icons/F1Logo"
import { useQuery } from "@tanstack/react-query"
import { getTeams } from "@/services/providers/api/teamApi"

export type TeamInfo = {
    title: string
    description: string
    lineup: string[]
}

type CarsCircleProps = {
    onTeamSelect: (teamInfo: TeamInfo | null) => void
}

const targetCarAngle = 180

const getShortestRotation = (from: number, to: number) => {
    const difference = ((to - from + 540) % 360) - 180

    return from + difference
}

const CarsCircle = ({ onTeamSelect }: CarsCircleProps) => {
    const [ringRotation, setRingRotation] = useState(0)
    const [selectedCarIndex, setSelectedCarIndex] = useState<number | null>(null)

    const { data: response } = useQuery({
        queryKey: ["Teams"],
        queryFn: getTeams,
    })

    const cars = response?.data ?? [];
    const carStep = cars.length > 0 ? 360 / cars.length : 0

    const handleCarClick = (index: number) => {
        const carAngle = index * carStep - 90
        const nextRotation = targetCarAngle - carAngle
        const selectedCar = cars[index]

        setSelectedCarIndex(index)
        onTeamSelect({
            title: selectedCar.name,
            description: selectedCar.description,
            lineup: selectedCar.drivers,
        })
        setRingRotation((currentRotation) => getShortestRotation(currentRotation, nextRotation))
    }

    const handleLogoClick = () => {
        setSelectedCarIndex(null)
        onTeamSelect(null)
        setRingRotation((currentRotation) => getShortestRotation(currentRotation, 0))
    }

    return (
        <div className="relative aspect-square w-[min(76vw,30rem)] max-w-full flex items-center justify-center sm:w-[min(88vw,36.25rem)]">
            <div className="size-[80%] bg-[#F90301] rounded-full flex items-center justify-center">
                <div className="size-[77%] bg-white rounded-full flex items-center justify-center">
                    <button
                        type="button"
                        className="size-[78%] flex items-center justify-center focus:outline-none"
                        aria-label="Reset selected team"
                        onClick={handleLogoClick}
                    >
                        <F1Logo className="size-full object-contain" />
                    </button>
                </div>
            </div>
            <div
                className="pointer-events-none absolute inset-0 transition-transform duration-700 ease-in-out"
                style={{ transform: `rotate(${ringRotation}deg)` }}
            >
                {cars.map((car, index) => {
                    const angle = index * carStep - 90
                    const x = 50 + Math.cos((angle * Math.PI) / 180) * 43
                    const y = 50 + Math.sin((angle * Math.PI) / 180) * 43

                    return (
                        <button
                            key={car._id}
                            type="button"
                            className="pointer-events-auto absolute origin-center focus:outline-none"
                            onClick={() => handleCarClick(index)}
                            style={{
                                left: `${x}%`,
                                top: `${y}%`,
                                transform: `translate(-50%, -50%) rotate(${angle + 90}deg)`,
                            }}
                        >
                            <div
                                className={`transition-transform duration-300 ease-out hover:scale-125 sm:hover:scale-145 ${selectedCarIndex === index ? "scale-135 sm:scale-150" : "scale-100"
                                    }`}
                            >
                                <img
                                    src={car.carImage}
                                    alt={`${car.name} F1 car`}
                                    className="h-24 max-w-none object-contain max-[380px]:h-20 sm:h-24 md:h-32 xl:h-38"
                                />
                            </div>
                        </button>
                    )
                })}
            </div>
        </div>
    )
}

export default CarsCircle
