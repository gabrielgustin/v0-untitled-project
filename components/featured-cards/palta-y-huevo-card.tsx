"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Edit } from "lucide-react"

interface PaltaYHuevoCardProps {
  isAdmin?: boolean
  onEdit?: (id: string) => void
}

export function PaltaYHuevoCard({ isAdmin = false, onEdit }: PaltaYHuevoCardProps) {
  const handleEditClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (onEdit) {
      onEdit("palta-y-huevo")
    }
  }

  return (
    <Link href="/product/palta-y-huevo" className="block w-full">
      <div className="bg-[#f8f5d7] rounded-xl overflow-hidden shadow-sm w-full relative transition-transform hover:shadow-md hover:-translate-y-1">
        {isAdmin && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 z-10 h-7 w-7 sm:h-8 sm:w-8 bg-white/80 hover:bg-white text-lacapke-charcoal rounded-full shadow-sm"
            onClick={handleEditClick}
          >
            <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
        )}

        <div className="flex flex-col lg:flex-row">
          <div className="relative h-28 sm:h-36 lg:h-auto lg:w-1/3 lg:aspect-square">
            <Image src="/palta-y-huevo.png" alt="Palta y Huevo" fill className="object-cover" />
          </div>
          <div className="p-2 py-1.5 sm:p-3 sm:py-2 flex flex-col flex-grow lg:p-5">
            <h3 className="font-bold text-lacapke-charcoal text-xs sm:text-sm lg:text-lg font-open-sans mb-0.5">
              Palta y Huevo
            </h3>

            <p className="text-lacapke-charcoal/80 text-[10px] sm:text-xs lg:text-sm mb-2">
              • Huevos en omelette o revueltos
              <br />• Palta • Dip de queso crema
              <br />• Tostadas de brioche
              <br />
              <span className="text-[9px] sm:text-[10px] lg:text-xs">(podés elegir pan keto o sin TACC)</span>
            </p>

            <div className="space-y-1 sm:space-y-2 mt-auto flex flex-col flex-grow justify-end">
              <div className="flex items-center justify-between text-xs lg:text-sm flex-wrap">
                <span className="text-lacapke-charcoal font-bold text-xs lg:text-sm mr-1 sm:mr-2">
                  Panceta y champiñones
                </span>
                <div className="flex items-center flex-grow min-w-[80px] sm:min-w-[100px]">
                  <div className="border-b border-dotted border-lacapke-charcoal/30 flex-grow mx-1 sm:mx-2"></div>
                  <span className="font-bold text-lacapke-charcoal font-open-sans text-xs lg:text-sm whitespace-nowrap">
                    $ 7900
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs lg:text-sm flex-wrap">
                <span className="text-lacapke-charcoal font-bold text-xs lg:text-sm mr-1 sm:mr-2">
                  Queso danbo y jamón natural
                </span>
                <div className="flex items-center flex-grow min-w-[80px] sm:min-w-[100px]">
                  <div className="border-b border-dotted border-lacapke-charcoal/30 flex-grow mx-1 sm:mx-2"></div>
                  <span className="font-bold text-lacapke-charcoal font-open-sans text-xs lg:text-sm whitespace-nowrap">
                    $ 7900
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs lg:text-sm flex-wrap">
                <span className="text-lacapke-charcoal font-bold text-xs lg:text-sm mr-1 sm:mr-2">Salmón ahumado</span>
                <div className="flex items-center flex-grow min-w-[80px] sm:min-w-[100px]">
                  <div className="border-b border-dotted border-lacapke-charcoal/30 flex-grow mx-1 sm:mx-2"></div>
                  <span className="font-bold text-lacapke-charcoal font-open-sans text-xs lg:text-sm whitespace-nowrap">
                    $ 8900
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
