import { Subscription, UserDetails } from "@/models"
import { User } from "@supabase/auth-helpers-nextjs"

export interface DefaultUserContext {
    accessToken: string | undefined;
    user: User | null;
    userDetails: UserDetails | null;
    isLoading: boolean
    subscription: Subscription | null
}

export type UserContext = DefaultUserContext | null
