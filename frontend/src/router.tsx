// src/router.tsx
import { createRouter } from '@tanstack/react-router'
import type { QueryClient } from '@tanstack/react-query'

import { routeTree } from './routeTree.gen'

export type RouterContext = {
  queryClient: QueryClient
}

export const createAppRouter = (queryClient: QueryClient) => {
  return createRouter({
    routeTree,
    context: {
      queryClient,
    },
    defaultPreload: 'intent',
  })
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createAppRouter>
  }
}