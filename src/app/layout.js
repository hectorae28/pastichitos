import './globals.css'
import Script from 'next/script'
import { Inter } from 'next/font/google'
import Head from 'next/head'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Pastichitogyg',
  description: 'en Construccion',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <Head>
            <link href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.8.1/flowbite.min.css" rel="stylesheet" />
        </Head>
      <body className={inter.className}>
        {children}
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.8.1/flowbite.min.js"></Script>
      </body>
    </html>
  )
}
