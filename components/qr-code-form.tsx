"use client"

import { useState } from "react"
import { ArrowLeft, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface QRCodeFormProps {
  onBack: () => void
}

export function QRCodeForm({ onBack }: QRCodeFormProps) {
  const [activeTab, setActiveTab] = useState("store")
  const storeUrl = "https://tupedido.app/mi-tienda"

  const handleDownload = () => {
    // En una implementación real, aquí se descargaría el código QR
    alert("Descargando código QR...")
  }

  return (
    <div className="bg-white rounded-lg shadow-sm max-w-3xl mx-auto">
      <div className="p-4 border-b flex items-center">
        <Button variant="ghost" size="icon" onClick={onBack} className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold">Código QR</h1>
      </div>

      <div className="p-6 space-y-6">
        <div className="bg-gray-50 p-6 rounded-lg border">
          <h2 className="font-medium text-lg mb-2">Código QR</h2>
          <p className="text-sm text-gray-600 mb-6">
            Este es el código QR de tu Tienda Pedix. Al escanearlo, tus clientes accederán a tu Tienda Pedix. Puedes
            descargarlo y usarlo en donde desees: en las mesas de tu negocio, en el packaging de reparto, en folletos,
            tu vidriera, etc. La cantidad de lugares en donde podés aplicarlo es infinita, ¡Dale rienda suelta a tu
            imaginación!
          </p>

          <Tabs defaultValue="store" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="store">QR Tienda</TabsTrigger>
              <TabsTrigger value="menu">QR Menú Digital</TabsTrigger>
            </TabsList>
            <TabsContent value="store" className="flex flex-col items-center">
              <div className="w-48 h-48 border border-gray-200 rounded-md flex items-center justify-center mb-4">
                <svg viewBox="0 0 200 200" className="w-36 h-36 text-[#2a4287]" fill="currentColor">
                  <rect x="50" y="50" width="30" height="30" />
                  <rect x="120" y="50" width="30" height="30" />
                  <rect x="50" y="120" width="30" height="30" />
                  <rect x="120" y="120" width="30" height="30" />
                  <path d="M90,50 L90,80 L110,80 L110,50" />
                  <path d="M50,90 L80,90 L80,110 L50,110" />
                  <path d="M120,90 L150,90 L150,110 L120,110" />
                  <path d="M90,120 L90,150 L110,150 L110,120" />
                </svg>
              </div>
              <p className="text-sm text-gray-600 mb-4">{storeUrl}</p>
              <Button variant="outline" className="flex items-center gap-2" onClick={handleDownload}>
                <Download className="h-4 w-4" />
                Descargar código QR
              </Button>
            </TabsContent>
            <TabsContent value="menu" className="flex flex-col items-center">
              <div className="w-48 h-48 border border-gray-200 rounded-md flex items-center justify-center mb-4">
                <svg viewBox="0 0 200 200" className="w-36 h-36 text-[#2a4287]" fill="currentColor">
                  <rect x="50" y="50" width="30" height="30" />
                  <rect x="120" y="50" width="30" height="30" />
                  <rect x="50" y="120" width="30" height="30" />
                  <rect x="120" y="120" width="30" height="30" />
                  <path d="M90,50 L90,80 L110,80 L110,50" />
                  <path d="M50,90 L80,90 L80,110 L50,110" />
                  <path d="M120,90 L150,90 L150,110 L120,110" />
                  <path d="M90,120 L90,150 L110,150 L110,120" />
                </svg>
              </div>
              <p className="text-sm text-gray-600 mb-4">{storeUrl}/menu</p>
              <Button variant="outline" className="flex items-center gap-2" onClick={handleDownload}>
                <Download className="h-4 w-4" />
                Descargar código QR
              </Button>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
