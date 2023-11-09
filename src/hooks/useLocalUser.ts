'use client'
import { type DefaultUserContext, type Subscription, type UserDetails } from '@/models'
import { useSessionContext, useUser as useSupaUser } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

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

  console.log(user)

  useEffect(() => {
    if (user != null && !isLoadingData && userDetails == null && subscription == null) {
      setIsLoadingData(true)

      void Promise.allSettled([getDetails(), getSubscription()])
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
    } else if (user == null && !isLoadingUser && !isLoadingData) {
      setUserDetails(null)
      setSubscription(null)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isLoadingUser])

  const signOut = () => {
    supabase.auth.signOut()
      .then(() => {
        toast('Logged out')
      })
      .catch((error) => {
        toast(error.message)
      })
  }

  return { accessToken, user, isLoading: isLoadingUser, subscription, userDetails, signOut }
}