"use client"

import { useState } from "react"
import { ArrowLeft, AlertTriangle, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface DiscountCouponsFormProps {
  onBack: () => void
  onSave: (data: any) => void
}

export function DiscountCouponsForm({ onBack, onSave }: DiscountCouponsFormProps) {
  const [coupons, setCoupons] = useState<any[]>([])
  const [couponsEnabled, setCouponsEnabled] = useState(false)

  const handleCreateCoupon = () => {
    // En una implementación real, aquí se abriría un modal para crear un nuevo cupón
    alert("Aquí se abriría un formulario para crear un nuevo cupón")
  }

  return (
    <div className="bg-white rounded-lg shadow-sm max-w-3xl mx-auto">
      <div className="p-4 border-b flex items-center">
        <Button variant="ghost" size="icon" onClick={onBack} className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold">Cupones de descuento</h1>
      </div>

      <div className="p-6 space-y-6">
        <Alert variant="warning" className="bg-amber-50 border-amber-200">
          <AlertTriangle className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-amber-800">
            Para habilitar el uso de cupones, tienes que{" "}
            <a href="#" className="text-blue-600 underline">
              habilitar el uso de cupones de descuento
            </a>{" "}
            en la configuración general.
          </AlertDescription>
        </Alert>

        <div className="flex flex-col items-center justify-center py-8 bg-blue-50 rounded-lg border border-blue-100">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 mb-4">
            <AlertTriangle className="h-5 w-5 text-blue-600" />
          </div>
          <p className="text-blue-800 font-medium">Todavía no configuraste ningún cupón.</p>
        </div>

        <div className="flex justify-center">
          <Button onClick={handleCreateCoupon} className="bg-[#2a4287] hover:bg-[#1e3370] text-white">
            <Plus className="h-4 w-4 mr-2" />
            Crear nuevo cupón
          </Button>
        </div>
      </div>
    </div>
  )
}
