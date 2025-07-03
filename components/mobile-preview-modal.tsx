"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface MobilePreviewModalProps {
  isOpen: boolean
  onClose: () => void
}

export function MobilePreviewModal({ isOpen, onClose }: MobilePreviewModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm p-0 overflow-hidden rounded-lg shadow-2xl border-4 border-gray-800 bg-gray-900">
        <DialogHeader className="p-4 bg-gray-800 flex flex-row items-center justify-between">
          <DialogTitle className="text-white text-lg">Vista Previa Móvil</DialogTitle>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="h-5 w-5" />
            <span className="sr-only">Cerrar</span>
          </Button>
        </DialogHeader>
        <div className="relative w-full h-full max-h-[80vh] bg-white flex items-center justify-center">
          <iframe
            src="/menu" // Asumimos que /menu es la página principal de la app
            className="w-full h-full border-none rounded-b-md"
            title="Mobile App Preview"
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms" // Permite que la app de Next.js funcione dentro del iframe
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
