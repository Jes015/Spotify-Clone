"use client"
import { fitgreeFont } from '@/assets/fonts/fitgree'
import { AuthModal, Header, Navigation, Player, UserLibrary } from '@/components'
import { SupabaseProvider, UserProvider } from '@/utils/providers'
import { Toaster } from 'sonner'
import './globals.css'
import styles from './layout.module.css'

export default function RootLayout({
  children,
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
            <AuthModal />
            <Toaster />
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  )
}
