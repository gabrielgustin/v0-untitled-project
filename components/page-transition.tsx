"use client"

import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"
import { type ReactNode, useEffect, useState } from "react"

interface PageTransitionProps {
  children: ReactNode
}

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()
  const [isFirstRender, setIsFirstRender] = useState(true)

  // Evitar la animación en la primera carga
  useEffect(() => {
    setIsFirstRender(false)
  }, [])

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={isFirstRender ? { opacity: 1 } : { opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="page-transition-container"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
