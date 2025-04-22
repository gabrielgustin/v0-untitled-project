"use client"

import { useState, useEffect } from "react"
import { LocationCard } from "@/components/location-card"
import Image from "next/image"
import { DesktopNavigation } from "@/components/desktop-navigation"
import { getAuthState, type User } from "@/lib/auth"

export default function HomePage() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const authUser = getAuthState()
    if (authUser) {
      setUser(authUser)
    }
  }, [])

  const handleLoginSuccess = () => {
    const authUser = getAuthState()
    setUser(authUser)
  }

  const locations = [
    {
      name: "Güemes",
      address: "Fructuoso Rivera 260",
      image: "/guemes-location.png",
    },
    {
      name: "Gral Paz",
      address: "Jacinto Ríos 126",
      image: "/gral-paz-location.png",
    },
    {
      name: "Villa Allende",
      address: "Río de Janeiro 121",
      image: "/villa-allende-location.png",
    },
    {
      name: "Manantiales",
      address: "San Antonio 4400",
      image: "/manantiales-location.png",
    },
  ]

  return (
    <div className="bg-lacapke-background min-h-screen">
      {/* Desktop Navigation */}
      <DesktopNavigation user={user} onLoginSuccess={handleLoginSuccess} />

      <div className="container-app pt-4 pb-8">
        {/* Header */}
        <header className="pt-4 pb-6 flex flex-col items-center">
          <div className="relative h-24 w-64 mb-3 lg:hidden">
            <Image src="/finall.png" alt="La Capke" fill className="object-contain" priority />
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold text-lacapke-charcoal text-center mb-2">
            Selecciona una sucursal
          </h1>
          <p className="text-lacapke-charcoal/70 text-center mb-6 max-w-xl mx-auto">
            Elige la sucursal más cercana para ver nuestro menú
          </p>
        </header>

        {/* Locations Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 max-w-6xl mx-auto">
          {locations.map((location) => (
            <LocationCard key={location.name} name={location.name} address={location.address} image={location.image} />
          ))}
        </div>
      </div>
    </div>
  )
}
