"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, Eye, Plus, GripVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"

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
        <Button variant="ghost" size="icon" onClick={onBack} className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold">Métodos de pago</h1>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div>
          <h2 className="font-medium text-lg mb-2">Medios de pago</h2>
          <p className="text-sm text-gray-500 mb-4">
            A continuación, se listarán todos los medios de pagos disponibles. Podrás activarlos o desactivarlos,
            configurar recargos (se calcularán sobre el monto total del pedido), o agregar otros medios de pago
            personalizados.
          </p>

          <div className="space-y-3">
            {paymentMethods.map((method) => (
              <div key={method.id} className="flex items-center justify-between p-4 border rounded-md">
                <div className="flex items-center">
                  <Eye className="h-5 w-5 text-[#2a4287] mr-3" />
                  <span>{method.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={method.enabled}
                    onCheckedChange={(checked) => handleToggleMethod(method.id, checked)}
                  />
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <GripVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4">
            <Button
              type="button"
              variant="outline"
              className="border-[#2a4287] text-[#2a4287]"
              onClick={handleAddMethod}
            >
              <Plus className="h-4 w-4 mr-2" />
              Agregar medio de pago
            </Button>
            <Button type="button" variant="outline" className="ml-2">
              <GripVertical className="h-4 w-4 mr-2" />
              Reordenar
            </Button>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t mt-6">
          <Button variant="outline" type="button" onClick={onBack}>
            Cancelar
          </Button>
          <Button type="submit" className="bg-[#2a4287] hover:bg-[#1e3370] text-white">
            Guardar
          </Button>
        </div>
      </form>
    </div>
  )
}
