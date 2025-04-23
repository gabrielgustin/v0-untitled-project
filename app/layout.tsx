import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { Inter, Open_Sans } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })
const openSans = Open_Sans({ subsets: ["latin"], variable: "--font-open-sans" })

export const metadata: Metadata = {
  title: "Club Montebello",
  description: "Menú digital de Club Montebello",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${openSans.variable}`}>
      <body className="font-sans bg-montebello-navy min-h-screen">{children}</body>
    </html>
  )
}
