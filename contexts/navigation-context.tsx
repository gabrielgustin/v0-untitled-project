"use client"

import { createContext, useContext, useState, type ReactNode, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"

interface NavigationContextType {
  isNavigating: boolean
  navigateTo: (path: string) => void
  previousPath: string | null
}

const NavigationContext = createContext<NavigationContextType>({
  isNavigating: false,
  navigateTo: () => {},
  previousPath: null,
})

export const useNavigation = () => useContext(NavigationContext)

interface NavigationProviderProps {
  children: ReactNode
}

export function NavigationProvider({ children }: NavigationProviderProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [isNavigating, setIsNavigating] = useState(false)
  const [previousPath, setPreviousPath] = useState<string | null>(null)

  // Actualizar la ruta anterior cuando cambia la ruta actual
  useEffect(() => {
    if (pathname) {
      setPreviousPath((prev) => {
        if (prev !== pathname) {
          return prev
        }
        return null
      })
    }
  }, [pathname])

  const navigateTo = (path: string) => {
    if (path === pathname) return

    setIsNavigating(true)
    setPreviousPath(pathname)

    // Pequeño retraso para permitir que la animación de salida se complete
    setTimeout(() => {
      router.push(path)
      // Resetear el estado después de la navegación
      setTimeout(() => {
        setIsNavigating(false)
      }, 500)
    }, 300)
  }

  return (
    <NavigationContext.Provider value={{ isNavigating, navigateTo, previousPath }}>
      {children}
    </NavigationContext.Provider>
  )
}
