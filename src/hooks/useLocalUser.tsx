"use client"
import { DefaultUserContext, Subscription, UserDetails } from "@/models"
import { useSessionContext, useUser as useSupaUser } from "@supabase/auth-helpers-react"
import { useEffect, useState } from "react"

export const useLocalUser = (): DefaultUserContext => {
    const {
        session,
        isLoading: isLoadingUser,
        supabaseClient: supabase
    } = useSessionContext()
    const user = useSupaUser()
    const accessToken = session?.access_token
    const [isLoadingData, setIsLoadingData] = useState(false)
    const [userDetails, setUserDetails] = useState<UserDetails | null>(null)
    const [subscription, setSubscription] = useState<Subscription | null>(null)

    const getDetails = () => supabase.from('users').select('*').single()
    const getSubscription = () => supabase
        .from('subscriptions')
        .select('*, prices(*, products(*))')
        .in('status', ['trialing', 'active'])
        .single()

    useEffect(() => {
        if (user && !isLoadingData && !userDetails && !subscription) {
            setIsLoadingData(true)

            Promise.allSettled([getDetails(), getSubscription()])
                .then(
                    (results) => {
                        const userDetailsPromise = results[0]
                        const subscriptionPromise = results[1]


                        if (userDetailsPromise.status === 'fulfilled') {
                            setUserDetails(userDetailsPromise.value.data as UserDetails)
                        }
                        if (subscriptionPromise.status === 'fulfilled') {
                            setSubscription(subscriptionPromise.value.data as Subscription)
                        }

                        setIsLoadingData(false)
                    }
                )
        } else if (!user && !isLoadingUser && !isLoadingData) {
            setUserDetails(null)
            setSubscription(null)
        }
    }, [user, isLoadingUser])

    return { accessToken, user, isLoading: isLoadingUser, subscription, userDetails }
}