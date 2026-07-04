import { useEffect, useState } from "react"

export const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const media = window.matchMedia("(max-width: 1279px)")

        const update = () => setIsMobile(media.matches)

        update()
        media.addEventListener("change", update)

        return () => media.removeEventListener("change", update)
    }, [])

    return isMobile
}