import { type Subscription, type UserDetails } from '@/models'
import { type User } from '@supabase/auth-helpers-nextjs'

export interface DefaultUserContext {
  accessToken: string | undefined
  user: User | null
  userDetails: UserDetails | null
  isLoading: boolean
  subscription: Subscription | null
  signOut: () => void
}

export type UserContext = DefaultUserContext | null
