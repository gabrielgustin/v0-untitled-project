"use client"

import { useNavigation } from "@/contexts/navigation-context"
import { useCallback } from "react"

export function useSmoothNavigation() {
  const { navigateTo, isNavigating, previousPath } = useNavigation()

  const navigate = useCallback(
    (path: string) => {
      if (isNavigating) return
      navigateTo(path)
    },
    [navigateTo, isNavigating],
  )

  return {
    navigate,
    isNavigating,
    previousPath,
  }
}
