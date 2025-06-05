"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"

interface DeliveryMethodsFormProps {
  onBack: () => void
  onSave: (data: any) => void
}

export function DeliveryMethodsForm({ onBack, onSave }: DeliveryMethodsFormProps) {
  const [formData, setFormData] = useState({
    methods: {
      inStore: true,
      pickup: true,
      delivery: true,
    },
    deliveryCost: "0.00",
  })

  const handleMethodChange = (method: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      methods: {
        ...prev.methods,
        [method]: checked,
      },
    }))
  }

  const handleDeliveryCostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      deliveryCost: e.target.value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <div className="bg-white rounded-lg shadow-sm max-w-3xl mx-auto">
      <div className="p-4 border-b flex items-center">
        <Button variant="ghost" size="icon" onClick={onBack} className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold">Formas de entrega</h1>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div className="bg-gray-50 p-6 rounded-lg border">
          <h2 className="font-medium text-lg mb-4">Formas de entrega</h2>
          <p className="text-sm text-gray-600 mb-6">
            A continuación, se listarán todas las formas de entrega disponibles (puedes desactivar las que no utilices).
          </p>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="inStore"
                checked={formData.methods.inStore}
                onCheckedChange={(checked) => handleMethodChange("inStore", checked as boolean)}
              />
              <Label htmlFor="inStore">Consumo en el local</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="pickup"
                checked={formData.methods.pickup}
                onCheckedChange={(checked) => handleMethodChange("pickup", checked as boolean)}
              />
              <Label htmlFor="pickup">Retiro personalmente</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="delivery"
                checked={formData.methods.delivery}
                onCheckedChange={(checked) => handleMethodChange("delivery", checked as boolean)}
              />
              <Label htmlFor="delivery">Delivery</Label>
            </div>
          </div>
        </div>

        {formData.methods.delivery && (
          <div className="space-y-4">
            <h2 className="font-medium text-lg">Costo del delivery</h2>
            <div className="space-y-2">
              <Label htmlFor="deliveryCost">Costo fijo del delivery</Label>
              <Input
                id="deliveryCost"
                type="number"
                step="0.01"
                min="0"
                value={formData.deliveryCost}
                onChange={handleDeliveryCostChange}
                className="max-w-xs"
              />
              <p className="text-sm text-gray-500">Deja en blanco o en cero si el delivery no tiene costo adicional.</p>
            </div>
          </div>
        )}

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
