"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ShoppingBag, User, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { logout, type User as UserType } from "@/lib/auth"
import { LoginForm } from "@/components/login-form"
import { LogoContainer } from "@/components/logo-container"

interface DesktopNavigationProps {
  user: UserType | null
  onLoginSuccess: () => void
  cartItemCount?: number
  cartAnimation?: boolean
}

export function DesktopNavigation({
  user,
  onLoginSuccess,
  cartItemCount = 0,
  cartAnimation = false,
}: DesktopNavigationProps) {
  const [showLoginForm, setShowLoginForm] = useState(false)
  const [showCartBadge, setShowCartBadge] = useState(false)
  const [animateCart, setAnimateCart] = useState(false)

  // Efecto para mostrar el badge del carrito si hay items
  useEffect(() => {
    setShowCartBadge(cartItemCount > 0)
  }, [cartItemCount])

  // Efecto para la animación cuando se agrega un producto
  useEffect(() => {
    if (cartAnimation) {
      setAnimateCart(true)
      const timer = setTimeout(() => {
        setAnimateCart(false)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [cartAnimation])

  const handleLogout = () => {
    logout()
    window.location.reload()
  }

  const isAdmin = user?.username === "Admin1"

  const handleLoginSuccess = () => {
    setShowLoginForm(false) // Asegurarse de que el modal se cierre
  }

  return (
    <div className="hidden lg:block w-full border-b border-montebello-gold/30 bg-montebello-navy sticky top-0 z-30">
      <div className="container mx-auto py-3">
        <div className="flex items-center justify-between">
          {/* Logo y navegación principal */}
          <div className="flex items-center gap-8 w-1/3">
            <nav className="flex items-center space-x-8">
              <Link href="/" className="text-montebello-light hover:text-montebello-gold font-medium">
                Inicio
              </Link>
              <Link href="/menu" className="text-montebello-light hover:text-montebello-gold font-medium">
                Menú
              </Link>
            </nav>
          </div>

          {/* Logo centrado */}
          <div className="w-1/3 flex justify-center">
            <LogoContainer size="medium" className="justify-center" />
          </div>

          {/* Carrito y perfil de usuario */}
          <div className="flex items-center space-x-4 justify-end w-1/3">
            <Link
              href="/cart"
              className="text-montebello-light hover:text-montebello-gold font-medium flex items-center px-4 py-2 rounded-full border border-transparent hover:border-montebello-gold/20"
            >
              <div className={`relative ${animateCart ? "animate-bounce" : ""}`}>
                <ShoppingBag className="h-5 w-5 mr-2" />
                {showCartBadge && (
                  <span
                    className={`absolute -top-2 -right-1 bg-montebello-gold text-montebello-navy text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center ${animateCart ? "scale-125" : ""} transition-transform`}
                  >
                    {cartItemCount > 9 ? "9+" : cartItemCount}
                  </span>
                )}
              </div>
              Mi Pedido
            </Link>

            {user ? (
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8 border border-montebello-gold">
                  <AvatarImage src="/la-capke-logo.png" alt={user.username} />
                  <AvatarFallback className="bg-montebello-gold text-montebello-navy">
                    {user.username.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="text-sm font-medium text-montebello-light">{user.username}</div>
                <Button variant="ghost" size="icon" className="text-red-500 hover:bg-red-900/20" onClick={handleLogout}>
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button
                variant="ghost"
                className="rounded-full border border-montebello-gold/20 text-montebello-light/80 hover:bg-montebello-navy/60 hover:text-montebello-light transition-colors"
                onClick={() => setShowLoginForm(true)}
              >
                <User className="h-4 w-4 mr-2 text-montebello-gold/70" />
                Iniciar Sesión
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Modal de inicio de sesión */}
      {showLoginForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-md">
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-2 h-8 w-8 text-montebello-charcoal z-20 bg-white rounded-full"
              onClick={() => setShowLoginForm(false)}
            >
              <span className="sr-only">Cerrar</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M18 6 6 18"></path>
                <path d="m6 6 12 12"></path>
              </svg>
            </Button>
            <LoginForm onLoginSuccess={handleLoginSuccess} />
          </div>
        </div>
      )}
    </div>
  )
}
