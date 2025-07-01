"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, Eye, Plus, GripVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label" // Import Label for better accessibility

interface PaymentMethod {
  id: string
  name: string
  enabled: boolean
}

interface PaymentMethodsFormProps {
  onBack: () => void
  onSave: (data: any) => void
}

export function PaymentMethodsForm({ onBack, onSave }: PaymentMethodsFormProps) {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    { id: "cash", name: "Efectivo", enabled: true },
    { id: "card", name: "Tarjeta débito/crédito", enabled: true },
  ])

  const handleToggleMethod = (id: string, enabled: boolean) => {
    setPaymentMethods((methods) => methods.map((method) => (method.id === id ? { ...method, enabled } : method)))
  }

  const handleAddMethod = () => {
    // En una implementación real, aquí se abriría un modal para agregar un nuevo método
    const newId = `custom-${Date.now()}`
    setPaymentMethods([...paymentMethods, { id: newId, name: "Nuevo método de pago", enabled: true }])
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({ paymentMethods })
  }

  return (
    <div className="bg-white rounded-lg shadow-sm max-w-3xl mx-auto">
      <div className="p-4 border-b flex items-center">
        <Button variant="ghost" size="icon" onClick={onBack} className="mr-2 text-gray-800 hover:bg-gray-200">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold text-gray-800">Métodos de pago</h1>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div>
          <h2 className="font-medium text-lg mb-2 text-gray-800">Medios de pago</h2>
          <p className="text-sm text-gray-700 mb-4">
            A continuación, se listarán todos los medios de pagos disponibles. Podrás activarlos o desactivarlos,
            configurar recargos (se calcularán sobre el monto total del pedido), o agregar otros medios de pago
            personalizados.
          </p>

          <div className="space-y-3">
            {paymentMethods.map((method) => (
              <div key={method.id} className="flex items-center justify-between p-4 border rounded-md bg-gray-50">
                <div className="flex items-center">
                  <Eye className="h-5 w-5 text-[#2a4287] mr-3" />
                  <span className="text-gray-800 font-medium">{method.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    id={`switch-${method.id}`} // Add ID for accessibility
                    checked={method.enabled}
                    onCheckedChange={(checked) => handleToggleMethod(method.id, checked)}
                  />
                  <Label htmlFor={`switch-${method.id}`} className="sr-only">
                    {method.enabled ? "Desactivar" : "Activar"} {method.name}
                  </Label>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-600 hover:bg-gray-100">
                    <GripVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <Button
              type="button"
              variant="outline"
              className="border-[#2a4287] text-[#2a4287] hover:bg-[#2a4287] hover:text-white bg-transparent"
              onClick={handleAddMethod}
            >
              <Plus className="h-4 w-4 mr-2" />
              Agregar medio de pago
            </Button>
            <Button type="button" variant="outline" className="text-gray-700 hover:bg-gray-100 bg-transparent">
              <GripVertical className="h-4 w-4 mr-2" />
              Reordenar
            </Button>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t mt-6">
          <Button variant="outline" type="button" onClick={onBack} className="text-gray-700 font-medium bg-transparent">
            Cancelar
          </Button>
          <Button type="submit" className="bg-[#2a4287] hover:bg-[#1e3370] text-white font-medium">
            Guardar
          </Button>
        </div>
      </form>
    </div>
  )
}
