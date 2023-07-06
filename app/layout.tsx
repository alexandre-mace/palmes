import './globals.css'
import { Inter } from 'next/font/google'
import Head from "next/head";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Palmes',
  description: "Regarder toutes les palmes d'or",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <Head>
          <link rel="icon" href="https://em-content.zobj.net/thumbs/240/apple/354/popcorn_1f37f.png" sizes="any" />
      </Head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
