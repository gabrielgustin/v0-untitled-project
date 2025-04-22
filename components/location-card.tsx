import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"

interface LocationCardProps {
  name: string
  address: string
  image: string
}

export function LocationCard({ name, address, image }: LocationCardProps) {
  return (
    <Link href="/menu" className="block">
      <Card className="border border-lacapke-charcoal/10 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
        <div className="relative aspect-square w-full bg-white p-2 sm:p-4">
          <Image src={image || "/placeholder.svg"} alt={name} fill className="object-contain p-2 sm:p-4" />
        </div>
        <CardContent className="p-2 sm:p-3">
          <h3 className="text-base sm:text-xl font-bold text-lacapke-charcoal">{name}</h3>
          <p className="text-xs sm:text-sm text-lacapke-charcoal/70">{address}</p>
        </CardContent>
      </Card>
    </Link>
  )
}
