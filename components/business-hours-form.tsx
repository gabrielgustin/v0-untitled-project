"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"

interface BusinessHoursFormProps {
  onBack: () => void
  onSave: (data: any) => void
}

export function BusinessHoursForm({ onBack, onSave }: BusinessHoursFormProps) {
  const [formData, setFormData] = useState({
    enableOrdersDuringClosure: false,
    days: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: false,
      sunday: false,
    },
    hours: {
      from: "09:00",
      to: "18:00",
    },
    additionalHours: {
      enabled: false,
      from: "",
      to: "",
    },
  })

  const handleSwitchChange = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      enableOrdersDuringClosure: checked,
    }))
  }

  const handleDayChange = (day: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      days: {
        ...prev.days,
        [day]: checked,
      },
    }))
  }

  const handleHoursChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      hours: {
        ...prev.hours,
        [field]: value,
      },
    }))
  }

  const handleAdditionalHoursChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      additionalHours: {
        ...prev.additionalHours,
        [field]: value,
      },
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
        <h1 className="text-xl font-bold">Horarios de atención</h1>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div className="p-4 bg-gray-50 rounded-lg border">
          <div className="flex items-center space-x-2">
            <Switch
              id="enableOrdersDuringClosure"
              checked={formData.enableOrdersDuringClosure}
              onCheckedChange={handleSwitchChange}
            />
            <Label htmlFor="enableOrdersDuringClosure" className="font-medium">
              Habilitar pedidos durante cierre
            </Label>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Habilita esta opción si quieres recibir pedidos fuera de tu horario laboral
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="font-medium text-lg">Días de atención</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="monday"
                checked={formData.days.monday}
                onCheckedChange={(checked) => handleDayChange("monday", checked as boolean)}
              />
              <Label htmlFor="monday">Lunes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="tuesday"
                checked={formData.days.tuesday}
                onCheckedChange={(checked) => handleDayChange("tuesday", checked as boolean)}
              />
              <Label htmlFor="tuesday">Martes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="wednesday"
                checked={formData.days.wednesday}
                onCheckedChange={(checked) => handleDayChange("wednesday", checked as boolean)}
              />
              <Label htmlFor="wednesday">Miércoles</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="thursday"
                checked={formData.days.thursday}
                onCheckedChange={(checked) => handleDayChange("thursday", checked as boolean)}
              />
              <Label htmlFor="thursday">Jueves</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="friday"
                checked={formData.days.friday}
                onCheckedChange={(checked) => handleDayChange("friday", checked as boolean)}
              />
              <Label htmlFor="friday">Viernes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="saturday"
                checked={formData.days.saturday}
                onCheckedChange={(checked) => handleDayChange("saturday", checked as boolean)}
              />
              <Label htmlFor="saturday">Sábado</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="sunday"
                checked={formData.days.sunday}
                onCheckedChange={(checked) => handleDayChange("sunday", checked as boolean)}
              />
              <Label htmlFor="sunday">Domingo</Label>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="font-medium text-lg">Horario de atención</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="hoursFrom">Desde</Label>
              <div className="relative">
                <input
                  id="hoursFrom"
                  type="time"
                  value={formData.hours.from}
                  onChange={(e) => handleHoursChange("from", e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2a4287]"
                />
                <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="hoursTo">Hasta</Label>
              <div className="relative">
                <input
                  id="hoursTo"
                  type="time"
                  value={formData.hours.to}
                  onChange={(e) => handleHoursChange("to", e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2a4287]"
                />
                <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="font-medium text-lg">Horario adicional (opcional)</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="additionalHoursFrom">Desde</Label>
              <div className="relative">
                <input
                  id="additionalHoursFrom"
                  type="time"
                  value={formData.additionalHours.from}
                  onChange={(e) => handleAdditionalHoursChange("from", e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2a4287]"
                />
                <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="additionalHoursTo">Hasta</Label>
              <div className="relative">
                <input
                  id="additionalHoursTo"
                  type="time"
                  value={formData.additionalHours.to}
                  onChange={(e) => handleAdditionalHoursChange("to", e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2a4287]"
                />
                <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-500">
            Puedes configurar un horario adicional si tu negocio cierra al mediodía y vuelve a abrir por la tarde.
          </p>
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
