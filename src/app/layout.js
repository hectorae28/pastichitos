import './globals.css'

export const metadata = {
  title: 'Pastichitogyg',
  description: 'en Construccion',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        {children}
      </body>
    </html>
  )
}
