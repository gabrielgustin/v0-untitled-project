"use client"

import { useState } from "react"
import { ArrowLeft, AlertTriangle, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert" // Import AlertTitle

interface DiscountCouponsFormProps {
  onBack: () => void
  onSave: (data: any) => void
}

export function DiscountCouponsForm({ onBack, onSave }: DiscountCouponsFormProps) {
  const [coupons, setCoupons] = useState<any[]>([])
  const [couponsEnabled, setCouponsEnabled] = useState(false) // State for coupons enabled status

  const handleCreateCoupon = () => {
    // En una implementación real, aquí se abriría un modal para crear un nuevo cupón
    alert("Aquí se abriría un formulario para crear un nuevo cupón")
  }

  return (
    <div className="bg-white rounded-lg shadow-sm max-w-3xl mx-auto">
      <div className="p-4 border-b flex items-center">
        <Button variant="ghost" size="icon" onClick={onBack} className="mr-2 text-gray-800 hover:bg-gray-200">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold text-gray-800">Cupones de descuento</h1>
      </div>

      <div className="p-6 space-y-6">
        <Alert variant="warning" className="bg-amber-50 border-amber-200 text-amber-900">
          <AlertTriangle className="h-4 w-4 text-amber-600" />
          <AlertTitle className="text-amber-800 font-semibold">Cupones Deshabilitados</AlertTitle>
          <AlertDescription className="text-amber-800">
            Para habilitar el uso de cupones, tienes que{" "}
            <a href="#" className="text-blue-600 underline hover:text-blue-800">
              habilitar el uso de cupones de descuento
            </a>{" "}
            en la configuración general.
          </AlertDescription>
        </Alert>

        {coupons.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 bg-blue-50 rounded-lg border border-blue-100 text-center">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 mb-4">
              <AlertTriangle className="h-5 w-5 text-blue-600" />
            </div>
            <p className="text-blue-800 font-medium">Todavía no configuraste ningún cupón.</p>
            <p className="text-sm text-blue-700 mt-1">Crea tu primer cupón para empezar a ofrecer descuentos.</p>
          </div>
        ) : (
          // Aquí iría la lista de cupones si hubiera alguno
          <div className="grid grid-cols-1 gap-4">
            {/* Example coupon card */}
            <div className="p-4 border rounded-md bg-gray-50">
              <h3 className="font-medium text-lg text-gray-800">CUPON10OFF</h3>
              <p className="text-gray-700 text-sm">10% de descuento en el total de la compra.</p>
              <div className="flex justify-end mt-2">
                <Button variant="outline" size="sm" className="text-gray-700 hover:bg-gray-100 bg-transparent">
                  Editar
                </Button>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-center">
          <Button onClick={handleCreateCoupon} className="bg-[#2a4287] hover:bg-[#1e3370] text-white font-medium">
            <Plus className="h-4 w-4 mr-2" />
            Crear nuevo cupón
          </Button>
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t mt-6">
          <Button variant="outline" type="button" onClick={onBack} className="text-gray-700 font-medium bg-transparent">
            Cancelar
          </Button>
          <Button type="submit" className="bg-[#2a4287] hover:bg-[#1e3370] text-white font-medium">
            Guardar
          </Button>
        </div>
      </div>
    </div>
  )
}
