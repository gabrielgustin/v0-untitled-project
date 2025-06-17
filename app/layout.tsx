import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider as NextThemesProvider } from "@/components/theme-provider"
import { NavigationProvider } from "@/contexts/navigation-context"
import { ThemeProvider as AppThemeProvider } from "@/contexts/theme-context"
import { Toaster } from "@/components/ui/toaster" // Mover Toaster aquí
import type React from "react"
import type { Metadata } from "next"
import { Open_Sans } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })
const openSans = Open_Sans({ subsets: ["latin"], variable: "--font-open-sans" })

export const metadata: Metadata = {
  title: {
    default: "Club Montebello",
    template: "%s | Club Montebello",
  },
  description: "Menú digital de Club Montebello",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <NextThemesProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AppThemeProvider>
            <NavigationProvider>{children}</NavigationProvider>
          </AppThemeProvider>
        </NextThemesProvider>
        <Toaster /> {/* Renderizar Toaster aquí */}
      </body>
    </html>
  )
}
