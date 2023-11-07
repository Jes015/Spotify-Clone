import { fitgreeFont } from '@/assets/fonts/fitgree'
import { Navigation, Player, UserLibrary } from '@/components'
import type { Metadata } from 'next'
import './globals.css'
import styles from './layout.module.css'

export const metadata: Metadata = {
  title: 'Spotify Clone',
  description: 'Listen to your favorite songs <3',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={fitgreeFont.className}>
        <div
          className={styles.layout}
        >
          <Navigation />
          <UserLibrary />
          <main style={{ gridArea: 'main' }}>
            {children}
          </main>
          <footer style={{ gridArea: 'player'}}>
            <Player />
          </footer>
        </div>
      </body>
    </html>
  )
}
