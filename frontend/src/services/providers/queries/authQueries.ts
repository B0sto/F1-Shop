import { queryOptions } from '@tanstack/react-query'
import { getMe } from '@/services/providers/api/authApi'

export const meQuery = queryOptions({
  queryKey: ['me'],
  queryFn: getMe,
  retry: false,
})