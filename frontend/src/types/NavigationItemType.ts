export type NavigationAction = "logout" | "scrollTo"

type NavigationItemBase = {
    pageName: string
    imagePath: string
}

export type NavigationItemsType = NavigationItemBase & (
    | {
        routeHref: string
        action?: never
    }
    | {
        routeHref?: never
        action: NavigationAction
    }
)
