import { useState } from "react"

import CarsCircle, { type TeamInfo } from "./CarsCircle"
import F1StartLights from "./F1StartLights"

const HeroSection = () => {
    const [selectedTeam, setSelectedTeam] = useState<TeamInfo | null>(null)

    return (
        <section className="mt-8 sm:mt-12 xl:mt-20 px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-36 pb-12 sm:pb-16 text-white">
            <div className="flex flex-col items-center justify-between gap-10 xl:flex-row xl:items-start xl:gap-16">
                <div className="w-full max-w-136 text-center xl:max-w-md 2xl:max-w-136 xl:text-left">
                    <F1StartLights className="mb-6 justify-center xl:justify-start" />
                    {selectedTeam ? (
                        <>
                            <h3 className="font-akshar text-4xl leading-none sm:text-5xl lg:text-[56px]">{selectedTeam.title}</h3>
                            <p className="mt-5 font-akshar text-lg leading-7 sm:text-2xl sm:leading-9 lg:text-[28px] lg:leading-10">{selectedTeam.description}</p>
                            <p className="mt-7 font-akshar text-xl leading-8 sm:text-[30px] sm:leading-10">2026 Lineup:</p>
                            <div className="mt-2 font-akshar text-lg leading-7 sm:text-2xl sm:leading-9 lg:text-[28px] lg:leading-10">
                                {selectedTeam.lineup.map((driver) => (
                                    <p key={driver}>{driver}</p>
                                ))}
                            </div>
                        </>
                    ) : (
                        <>
                            <h3 className="font-akshar text-4xl leading-none sm:text-5xl lg:text-[64px]">
                                Lights Out <br />
                                and Away We Go
                            </h3>
                            <p className="mt-5 font-akshar text-lg leading-7 sm:text-2xl sm:leading-8 lg:text-[28px]">
                                Formula One is the highest class of worldwide racing for open-wheel,
                                single-seater formula racing cars run by Formula One Group and sanctioned
                                by the Federation Internationale de l'Automobile.
                            </p>
                        </>
                    )}
                </div>

                <CarsCircle onTeamSelect={setSelectedTeam} />
            </div>
        </section>
    )
}

export default HeroSection
