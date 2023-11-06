import { fitgreeFont } from '@/assets/fonts/fitgree'
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
      <body className={[fitgreeFont.className].join(' ')}>
        <div
          className={styles.layout}
        >
          <nav style={{ gridArea: 'navigation' }}>sdf</nav>
          <aside style={{ gridArea: 'aside' }}>aside</aside>
          <main style={{ gridArea: 'main' }}>
            {children}
          </main>
          <footer style={{ gridArea: 'footer' }}>card</footer>
        </div>
      </body>
    </html>
  )
}
