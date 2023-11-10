'use client'
import { fitgreeFont } from '@/assets/fonts/fitgree'
import { Header, Navigation, Player, RootComponents, UserLibrary } from '@/components'
import { SupabaseProvider, UserProvider } from '@/utils/providers'
import './globals.css'
import styles from './layout.module.css'

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={fitgreeFont.className}>
        <SupabaseProvider>
          <UserProvider>
            <div
              className={styles.layout}
            >
              <Navigation />
              <UserLibrary />
              <main style={{ gridArea: 'main' }}>
                <Header />
                {children}
              </main>
              <footer style={{ gridArea: 'player' }}>
                <Player />
              </footer>
            </div>
            <RootComponents />
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  )
}
