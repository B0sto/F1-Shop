import { useState } from "react"

import F1Logo from "../../svgs/F1Logo"

export type TeamInfo = {
    title: string
    description: string
    lineup: string[]
}

type Car = {
    src: string
    alt: string
    teamInfo?: TeamInfo
}

type CarsCircleProps = {
    onTeamSelect: (teamInfo: TeamInfo | null) => void
}

const cars = [
    {
        src: "/ferrari.png",
        alt: "Ferrari F1 car",
        teamInfo: {
            title: "Scuderia Ferrari",
            description:
                "The most iconic team in Formula 1 history, combining passion, legacy, and a constant fight for championships.",
            lineup: ["Charles Leclerc", "Lewis Hamilton"],
        },
    },
    {
        src: "/redBull.png",
        alt: "Red Bull F1 car",
        teamInfo: {
            title: "Red Bull Racing",
            description:
                "A dominant force in modern Formula 1, known for elite aerodynamics and consistent race-winning performance.",
            lineup: ["Max Verstappen", "Isack Hadjar"],
        },
    },
    { src: "/williams.png", alt: "Williams F1 car" },
    { src: "/haas.png", alt: "Haas F1 car" },
    { src: "/racingBulls.png", alt: "Racing Bulls F1 car" },
    { src: "/astonMartin.png", alt: "Aston Martin F1 car" },
    { src: "/mclaren.png", alt: "McLaren F1 car" },
    { src: "/audi.png", alt: "Audi F1 car" },
    { src: "/alpin.png", alt: "Alpine F1 car" },
    {
        src: "/mercedes.png",
        alt: "Mercedes F1 car",
        teamInfo: {
            title: "Mercedes AMG Petronas F1 Team",
            description:
                "A technological powerhouse aiming to return to its championship-winning dominance.",
            lineup: ["George Russell", "Kimi Antonelli"],
        },
    },
] satisfies Car[]

const carStep = 360 / cars.length
const targetCarAngle = 180

const getShortestRotation = (from: number, to: number) => {
    const difference = ((to - from + 540) % 360) - 180

    return from + difference
}

const CarsCircle = ({ onTeamSelect }: CarsCircleProps) => {
    const [ringRotation, setRingRotation] = useState(0)
    const [selectedCarIndex, setSelectedCarIndex] = useState<number | null>(null)

    const handleCarClick = (index: number) => {
        const carAngle = index * carStep - 90
        const nextRotation = targetCarAngle - carAngle

        setSelectedCarIndex(index)
        onTeamSelect(cars[index].teamInfo ?? null)
        setRingRotation((currentRotation) => getShortestRotation(currentRotation, nextRotation))
    }

    const handleLogoClick = () => {
        setSelectedCarIndex(null)
        onTeamSelect(null)
        setRingRotation((currentRotation) => getShortestRotation(currentRotation, 0))
    }

    return (
        <div className="relative aspect-square w-[min(76vw,30rem)] max-w-full flex items-center justify-center sm:w-[min(88vw,36.25rem)]">
            <div className="size-[86%] bg-[#F90301] rounded-full flex items-center justify-center">
                <div className="size-[80%] bg-white rounded-full flex items-center justify-center">
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
                            key={car.src}
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
                                className={`transition-transform duration-300 ease-out hover:scale-125 sm:hover:scale-145 ${
                                    selectedCarIndex === index ? "scale-135 sm:scale-150" : "scale-100"
                                }`}
                            >
                                <img
                                    src={car.src}
                                    alt={car.alt}
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
