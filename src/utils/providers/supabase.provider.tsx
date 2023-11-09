'use client'

import { type Database } from '@/models'
import { useState } from 'react'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'

interface SupabaseProviderProps {
  children: React.ReactNode
}

export const SupabaseProvider: React.FC<SupabaseProviderProps> = ({ children }) => {
  const [supabaseClient] = useState(
    () => createClientComponentClient<Database>()
  )

  return (
        <SessionContextProvider {...{ supabaseClient }}>
            {children}
        </SessionContextProvider>
  )
}