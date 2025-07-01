"use client"

import type React from "react"
import { useState } from "react"
import { ArrowLeft, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"

interface QrCodeFormProps {
  onBack: () => void
  onSave: (data: any) => void
}

export function QRCodeForm({ onBack, onSave }: QrCodeFormProps) {
  const [formData, setFormData] = useState({
    tableNumber: "",
    qrSize: "256",
    qrColor: "#2a4287",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  // Placeholder for QR code generation URL
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${formData.qrSize}x${formData.qrSize}&data=${encodeURIComponent(formData.tableNumber || "Mesa 1")}&color=${formData.qrColor.substring(1)}`

  return (
    <div className="bg-white rounded-lg shadow-sm max-w-3xl mx-auto">
      <div className="p-4 border-b flex items-center">
        <Button variant="ghost" size="icon" onClick={onBack} className="mr-2 text-gray-800 hover:bg-gray-200">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold text-gray-800">Código QR</h1>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div className="space-y-2">
          <Label htmlFor="tableNumber" className="text-gray-800 font-medium">
            Número o nombre de la mesa
          </Label>
          <Input
            id="tableNumber"
            name="tableNumber"
            value={formData.tableNumber}
            onChange={handleInputChange}
            placeholder="Ej: Mesa 1, Barra, Terraza"
            className="bg-transparent border border-gray-200"
          />
          <p className="text-sm text-gray-700">
            Este texto se incrustará en el código QR y puede ser el número de mesa o una ubicación.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="qrSize" className="text-gray-800 font-medium">
            Tamaño del QR
          </Label>
          <Select value={formData.qrSize} onValueChange={(value) => handleSelectChange("qrSize", value)}>
            <SelectTrigger className="text-gray-800 bg-transparent border border-gray-200">
              <SelectValue placeholder="Selecciona un tamaño" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="128">Pequeño (128x128)</SelectItem>
              <SelectItem value="256">Mediano (256x256)</SelectItem>
              <SelectItem value="512">Grande (512x512)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="qrColor" className="text-gray-800 font-medium">
            Color del QR
          </Label>
          <div className="flex items-center gap-2">
            <input
              id="qrColor"
              name="qrColor"
              type="color"
              value={formData.qrColor}
              onChange={handleInputChange}
              className="w-12 h-12 rounded-md border border-gray-200 cursor-pointer"
            />
            <Input
              type="text"
              value={formData.qrColor}
              onChange={handleInputChange}
              className="flex-1 bg-transparent border border-gray-200"
            />
          </div>
          <p className="text-sm text-gray-700">Elige el color principal de tu código QR.</p>
        </div>

        <div className="space-y-4">
          <h2 className="font-medium text-lg text-gray-800">Vista previa del QR</h2>
          <Card className="flex items-center justify-center p-4 bg-gray-50 border border-gray-200">
            <CardContent className="p-0">
              <img src={qrCodeUrl || "/placeholder.svg"} alt="QR Code Preview" className="max-w-full h-auto" />
            </CardContent>
          </Card>
          <div className="flex justify-center">
            <Button
              type="button"
              className="bg-[#2a4287] hover:bg-[#1e3370] text-white font-medium"
              onClick={() => window.open(qrCodeUrl, "_blank")}
            >
              <Download className="h-4 w-4 mr-2" />
              Descargar QR
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
