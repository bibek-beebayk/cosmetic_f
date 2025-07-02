// hooks/useNavMenu.ts
import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { apiCall } from '@/lib/axios'

type Submenu = {
    title: string
    link: string
}

export type NavItem = {
  title: string
  link: string
  submenu?: Submenu[] | []
}

export const useNavMenu = () =>
  useQuery<NavItem[], Error>({
    queryKey: ['nav-menu'],
    queryFn: () => apiCall<NavItem[]>('get', '/navitems/'),
    staleTime: 1000 * 60 * 60, // ✅ 1 hour
    gcTime: 1000 * 60 * 60 * 6, // ✅ 6 hours (was cacheTime in v4)
  })
