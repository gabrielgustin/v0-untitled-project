"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

interface LoadingScreenProps {
  message?: string
  duration?: number
  onLoadingComplete?: () => void
}

export function LoadingScreen({
  message = "Cargando menú...",
  duration = 2000,
  onLoadingComplete,
}: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval)
          if (onLoadingComplete) {
            setTimeout(() => {
              onLoadingComplete()
            }, 300)
          }
          return 100
        }
        return prevProgress + 5
      })
    }, duration / 20)

    return () => clearInterval(interval)
  }, [duration, onLoadingComplete])

  return (
    <div className="fixed inset-0 bg-montebello-navy flex flex-col items-center justify-center z-50">
      <div className="w-full max-w-xs flex flex-col items-center">
        {/* Icon with circular container */}
        <motion.div
          className="mb-12 relative"
          initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
          animate={{
            opacity: 1,
            scale: 1,
            rotate: 0,
            transition: {
              type: "spring",
              stiffness: 260,
              damping: 20,
              duration: 1.2,
            },
          }}
        >
          <div className="w-32 h-32 rounded-full bg-montebello-navy border-2 border-montebello-gold/30 flex items-center justify-center overflow-hidden shadow-lg">
            <Image
              src="/montebello-icon.png"
              alt="Club Montebello"
              width={110}
              height={110}
              className="object-contain"
            />
          </div>

          {/* Circular progress indicator */}
          <svg
            className="absolute -top-3 -left-3 -right-3 -bottom-3 w-[calc(100%+24px)] h-[calc(100%+24px)]"
            viewBox="0 0 100 100"
          >
            <motion.circle cx="50" cy="50" r="45" fill="none" stroke="rgba(212, 180, 90, 0.3)" strokeWidth="2" />
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#d4b45a"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0, rotate: -90 }}
              animate={{
                pathLength: progress / 100,
                transition: { duration: 0.2, ease: "easeOut" },
              }}
              style={{
                transformOrigin: "center",
                transform: "rotate(-90deg)",
              }}
            />
          </svg>
        </motion.div>

        {/* Loading message */}
        <motion.p
          className="text-montebello-light text-lg mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {message}
        </motion.p>

        {/* Progress bar (optional, can be removed if using only circular progress) */}
        <div className="w-full bg-montebello-navy/30 h-2 rounded-full overflow-hidden border border-montebello-gold/20">
          <motion.div
            className="h-full bg-montebello-gold"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          />
        </div>
      </div>
    </div>
  )
}
