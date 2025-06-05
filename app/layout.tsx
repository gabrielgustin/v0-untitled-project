import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { Inter, Open_Sans } from "next/font/google"
import { NavigationProvider } from "@/contexts/navigation-context"
import { PageTransition } from "@/components/page-transition"

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
    <html lang="es" className={`${openSans.variable}`}>
      <head>
        {/* Esto permite que el título se actualice dinámicamente */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const savedName = localStorage.getItem('storeName');
                if (savedName) {
                  document.title = savedName;
                }
                
                // Aplicar colores guardados al cargar la página
                const savedColors = localStorage.getItem('app-theme-colors');
                if (savedColors) {
                  try {
                    const colors = JSON.parse(savedColors);
                    const root = document.documentElement;
                    
                    // Aplicar colores a la aplicación principal, no al backoffice
                    root.style.setProperty('--app-color-primary', colors.primary);
                    root.style.setProperty('--app-color-secondary', colors.secondary);
                    root.style.setProperty('--app-color-accent', colors.accent);
                    root.style.setProperty('--app-color-background', colors.background);
                    root.style.setProperty('--app-color-text', colors.text);
                    
                    // Mantener compatibilidad con variables existentes
                    root.style.setProperty('--color-primary', colors.primary);
                    root.style.setProperty('--color-secondary', colors.secondary);
                    root.style.setProperty('--color-accent', colors.accent);
                    root.style.setProperty('--color-background', colors.background);
                    root.style.setProperty('--color-text', colors.text);
                  } catch (e) {
                    console.error('Error applying saved colors:', e);
                  }
                }
                
                // Escuchar cambios en los colores de la aplicación
                document.addEventListener('appThemeChanged', function(e) {
                  const colors = e.detail;
                  const root = document.documentElement;
                  
                  // Aplicar colores a la aplicación principal
                  root.style.setProperty('--app-color-primary', colors.primary);
                  root.style.setProperty('--app-color-secondary', colors.secondary);
                  root.style.setProperty('--app-color-accent', colors.accent);
                  root.style.setProperty('--app-color-background', colors.background);
                  root.style.setProperty('--app-color-text', colors.text);
                  
                  // Mantener compatibilidad con variables existentes
                  root.style.setProperty('--color-primary', colors.primary);
                  root.style.setProperty('--color-secondary', colors.secondary);
                  root.style.setProperty('--color-accent', colors.accent);
                  root.style.setProperty('--color-background', colors.background);
                  root.style.setProperty('--color-text', colors.text);
                });
              } catch (e) {
                console.error('Error setting title or colors:', e);
              }
            `,
          }}
        />
      </head>
      <body className="font-sans min-h-screen">
        <NavigationProvider>
          <PageTransition>{children}</PageTransition>
        </NavigationProvider>
      </body>
    </html>
  )
}
